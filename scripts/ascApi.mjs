// Minimal App Store Connect client shared by the scripts in this directory.
//
// No npm dependencies: the ES256 JWT is signed with node:crypto, and requests
// go through node:https rather than fetch because undici cannot reach Apple
// from behind the TLS-inspecting proxy on the dev machine and simply times out.
//
// Credentials come from the environment (see C:\Users\r_man\secrets\README.md):
//   ASC_KEY_ID     the key's ID, e.g. A7Y6XZZPBD
//   ASC_ISSUER_ID  the issuer UUID shown above the key list
//   ASC_KEY_PATH   path to the downloaded AuthKey_<ID>.p8
import crypto from 'node:crypto';
import fs from 'node:fs';
import https from 'node:https';

/** The Osaka app. Override with ASC_APP_ID for any other app. */
export const APP_ID = process.env.ASC_APP_ID ?? '6799330163';

function credentials() {
  const { ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_PATH } = process.env;
  const missing = Object.entries({ ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_PATH })
    .filter(([, value]) => !value)
    .map(([name]) => name);
  if (missing.length > 0) {
    throw new Error(
      `Missing ${missing.join(', ')}. See the header of scripts/ascApi.mjs for what each variable is.`,
    );
  }
  return { ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_PATH };
}

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function token() {
  const { ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_PATH } = credentials();
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: 'ES256', kid: ASC_KEY_ID, typ: 'JWT' }));
  const body = b64url(
    JSON.stringify({ iss: ASC_ISSUER_ID, iat: now, exp: now + 600, aud: 'appstoreconnect-v1' }),
  );
  const signature = crypto.sign('sha256', Buffer.from(`${head}.${body}`), {
    key: fs.readFileSync(ASC_KEY_PATH, 'utf8'),
    dsaEncoding: 'ieee-p1363', // JWS wants raw r||s, not DER
  });
  return `${head}.${body}.${b64url(signature)}`;
}

/** Raw request. Returns the status code alongside the body; never throws on 4xx. */
export function call(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        host: 'api.appstoreconnect.apple.com',
        path,
        method,
        headers: {
          Authorization: `Bearer ${token()}`,
          ...(payload
            ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
            : {}),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (d) => (raw += d));
        res.on('end', () => resolve({ code: res.statusCode, body: raw ? JSON.parse(raw) : null }));
      },
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

/**
 * GET that insists on a 200, for reads where anything else is a bug.
 *
 * Retries 5xx: App Store Connect returns a bare UNEXPECTED_ERROR now and then
 * (seen on inAppPurchasesV2), and a status command that dies on Apple having a
 * bad second reads as "something is wrong with the app" when nothing is. 4xx is
 * never retried — that one really is the caller's fault.
 */
export async function get(path, attempts = 3) {
  let last;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const res = await call('GET', path);
    if (res.code === 200) return res.body;
    last = res;
    if (res.code < 500) break;
    if (attempt < attempts) await new Promise((r) => setTimeout(r, 1000 * attempt));
  }
  throw new Error(`${last.code} ${path}\n${JSON.stringify(last.body).slice(0, 400)}`);
}

/** Throws unless the write succeeded, quoting Apple's own error text. */
export function ok(res, what) {
  if (res.code >= 300) {
    const detail = res.body?.errors?.[0]?.detail ?? JSON.stringify(res.body).slice(0, 300);
    throw new Error(`${what} failed: HTTP ${res.code} ${detail}`);
  }
  return res.body;
}
