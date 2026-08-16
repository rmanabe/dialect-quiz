// Plain CommonJS on purpose — see osaka/config.js for why.

const aichi = require('./aichi/config');
const akita = require('./akita/config');
const aomori = require('./aomori/config');
const chiba = require('./chiba/config');
const ehime = require('./ehime/config');
const fukui = require('./fukui/config');
const fukuoka = require('./fukuoka/config');
const fukushima = require('./fukushima/config');
const gifu = require('./gifu/config');
const gunma = require('./gunma/config');
const hiroshima = require('./hiroshima/config');
const hokkaido = require('./hokkaido/config');
const hyogo = require('./hyogo/config');
const ibaraki = require('./ibaraki/config');
const ishikawa = require('./ishikawa/config');
const iwate = require('./iwate/config');
const kagawa = require('./kagawa/config');
const kagoshima = require('./kagoshima/config');
const kanagawa = require('./kanagawa/config');
const kochi = require('./kochi/config');
const kumamoto = require('./kumamoto/config');
const kyoto = require('./kyoto/config');
const mie = require('./mie/config');
const miyagi = require('./miyagi/config');
const miyazaki = require('./miyazaki/config');
const nagano = require('./nagano/config');
const nagasaki = require('./nagasaki/config');
const nara = require('./nara/config');
const niigata = require('./niigata/config');
const oita = require('./oita/config');
const okayama = require('./okayama/config');
const okinawa = require('./okinawa/config');
const osaka = require('./osaka/config');
const saga = require('./saga/config');
const saitama = require('./saitama/config');
const shiga = require('./shiga/config');
const shimane = require('./shimane/config');
const shizuoka = require('./shizuoka/config');
const tochigi = require('./tochigi/config');
const tokushima = require('./tokushima/config');
const tokyo = require('./tokyo/config');
const tottori = require('./tottori/config');
const toyama = require('./toyama/config');
const wakayama = require('./wakayama/config');
const yamagata = require('./yamagata/config');
const yamaguchi = require('./yamaguchi/config');
const yamanashi = require('./yamanashi/config');

const registry = {
  aichi,
  akita,
  aomori,
  chiba,
  ehime,
  fukui,
  fukuoka,
  fukushima,
  gifu,
  gunma,
  hiroshima,
  hokkaido,
  hyogo,
  ibaraki,
  ishikawa,
  iwate,
  kagawa,
  kagoshima,
  kanagawa,
  kochi,
  kumamoto,
  kyoto,
  mie,
  miyagi,
  miyazaki,
  nagano,
  nagasaki,
  nara,
  niigata,
  oita,
  okayama,
  okinawa,
  osaka,
  saga,
  saitama,
  shiga,
  shimane,
  shizuoka,
  tochigi,
  tokushima,
  tokyo,
  tottori,
  toyama,
  wakayama,
  yamagata,
  yamaguchi,
  yamanashi,
};

function getActivePrefectureId() {
  return process.env.EXPO_PUBLIC_PREFECTURE || 'osaka';
}

function getPrefectureConfig(id) {
  const key = id || getActivePrefectureId();
  const config = registry[key];
  if (!config) {
    throw new Error(
      `Unknown prefecture id "${key}". Add src/prefectures/${key}/config.js and register it in src/prefectures/index.js.`
    );
  }
  return config;
}

module.exports = { getActivePrefectureId, getPrefectureConfig, registry };
