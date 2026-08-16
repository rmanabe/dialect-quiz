// One-off script: render each prefecture's mascot SVG (exported from the
// browser via app/dev-icons.tsx) into the PNG assets Expo needs, under
// assets/prefectures/<id>/. Not part of the app build itself.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgs = JSON.parse(fs.readFileSync('C:/Users/r_man/Downloads/mascot-svgs.json', 'utf8'));
const prefDir = path.resolve(__dirname, '..', 'src', 'prefectures');
const outBase = path.resolve(__dirname, '..', 'assets', 'prefectures');

async function run() {
  for (const [id, svgRaw] of Object.entries(svgs)) {
    const cfg = require(path.join(prefDir, id, 'config.js'));
    const bg = cfg.theme.background;
    const outDir = path.join(outBase, id);
    fs.mkdirSync(outDir, { recursive: true });

    const svg = svgRaw
      .replace(/width="[^"]*"/, 'width="1024"')
      .replace(/height="[^"]*"/, 'height="1024"')
      .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');

    // adaptive icon foreground: mascot at 62% centered on a transparent 1024 canvas
    const fgMascot = await sharp(Buffer.from(svg)).resize(640, 640).toBuffer();
    const foreground = await sharp({
      create: { width: 1024, height: 1024, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([{ input: fgMascot, left: 192, top: 192 }])
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(outDir, 'android-icon-foreground.png'), foreground);

    // main icon: mascot at 74% centered on solid theme background
    const iconMascot = await sharp(Buffer.from(svg)).resize(760, 760).toBuffer();
    const icon = await sharp({
      create: { width: 1024, height: 1024, channels: 4, background: bg },
    })
      .composite([{ input: iconMascot, left: 132, top: 132 }])
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(outDir, 'icon.png'), icon);

    // adaptive icon background: solid theme color
    const background = await sharp({
      create: { width: 1024, height: 1024, channels: 4, background: bg },
    })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(outDir, 'android-icon-background.png'), background);

    // adaptive icon monochrome: white silhouette derived from the foreground's alpha
    const { data, info } = await sharp(foreground).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
    const mono = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(outDir, 'android-icon-monochrome.png'), mono);

    // splash screen icon: transparent mascot, no background
    const splashMascot = await sharp(Buffer.from(svg)).resize(440, 440).png().toBuffer();
    fs.writeFileSync(path.join(outDir, 'splash-icon.png'), splashMascot);

    // web favicon
    const favicon = await sharp(icon).resize(196, 196).png().toBuffer();
    fs.writeFileSync(path.join(outDir, 'favicon.png'), favicon);

    console.log('done', id);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
