import type { RawQuestion } from './types';
import aichiQuestions from '../prefectures/aichi/questions.json';
import akitaQuestions from '../prefectures/akita/questions.json';
import aomoriQuestions from '../prefectures/aomori/questions.json';
import chibaQuestions from '../prefectures/chiba/questions.json';
import ehimeQuestions from '../prefectures/ehime/questions.json';
import fukuiQuestions from '../prefectures/fukui/questions.json';
import fukuokaQuestions from '../prefectures/fukuoka/questions.json';
import fukushimaQuestions from '../prefectures/fukushima/questions.json';
import gifuQuestions from '../prefectures/gifu/questions.json';
import gunmaQuestions from '../prefectures/gunma/questions.json';
import hiroshimaQuestions from '../prefectures/hiroshima/questions.json';
import hokkaidoQuestions from '../prefectures/hokkaido/questions.json';
import hyogoQuestions from '../prefectures/hyogo/questions.json';
import ibarakiQuestions from '../prefectures/ibaraki/questions.json';
import ishikawaQuestions from '../prefectures/ishikawa/questions.json';
import iwateQuestions from '../prefectures/iwate/questions.json';
import kagawaQuestions from '../prefectures/kagawa/questions.json';
import kagoshimaQuestions from '../prefectures/kagoshima/questions.json';
import kanagawaQuestions from '../prefectures/kanagawa/questions.json';
import kochiQuestions from '../prefectures/kochi/questions.json';
import kumamotoQuestions from '../prefectures/kumamoto/questions.json';
import kyotoQuestions from '../prefectures/kyoto/questions.json';
import mieQuestions from '../prefectures/mie/questions.json';
import miyagiQuestions from '../prefectures/miyagi/questions.json';
import miyazakiQuestions from '../prefectures/miyazaki/questions.json';
import naganoQuestions from '../prefectures/nagano/questions.json';
import nagasakiQuestions from '../prefectures/nagasaki/questions.json';
import naraQuestions from '../prefectures/nara/questions.json';
import niigataQuestions from '../prefectures/niigata/questions.json';
import oitaQuestions from '../prefectures/oita/questions.json';
import okayamaQuestions from '../prefectures/okayama/questions.json';
import okinawaQuestions from '../prefectures/okinawa/questions.json';
import osakaQuestions from '../prefectures/osaka/questions.json';
import sagaQuestions from '../prefectures/saga/questions.json';
import saitamaQuestions from '../prefectures/saitama/questions.json';
import shigaQuestions from '../prefectures/shiga/questions.json';
import shimaneQuestions from '../prefectures/shimane/questions.json';
import shizuokaQuestions from '../prefectures/shizuoka/questions.json';
import tochigiQuestions from '../prefectures/tochigi/questions.json';
import tokushimaQuestions from '../prefectures/tokushima/questions.json';
import tokyoQuestions from '../prefectures/tokyo/questions.json';
import tottoriQuestions from '../prefectures/tottori/questions.json';
import toyamaQuestions from '../prefectures/toyama/questions.json';
import wakayamaQuestions from '../prefectures/wakayama/questions.json';
import yamagataQuestions from '../prefectures/yamagata/questions.json';
import yamaguchiQuestions from '../prefectures/yamaguchi/questions.json';
import yamanashiQuestions from '../prefectures/yamanashi/questions.json';

const BANKS: Record<string, RawQuestion[]> = {
  aichi: aichiQuestions as RawQuestion[],
  akita: akitaQuestions as RawQuestion[],
  aomori: aomoriQuestions as RawQuestion[],
  chiba: chibaQuestions as RawQuestion[],
  ehime: ehimeQuestions as RawQuestion[],
  fukui: fukuiQuestions as RawQuestion[],
  fukuoka: fukuokaQuestions as RawQuestion[],
  fukushima: fukushimaQuestions as RawQuestion[],
  gifu: gifuQuestions as RawQuestion[],
  gunma: gunmaQuestions as RawQuestion[],
  hiroshima: hiroshimaQuestions as RawQuestion[],
  hokkaido: hokkaidoQuestions as RawQuestion[],
  hyogo: hyogoQuestions as RawQuestion[],
  ibaraki: ibarakiQuestions as RawQuestion[],
  ishikawa: ishikawaQuestions as RawQuestion[],
  iwate: iwateQuestions as RawQuestion[],
  kagawa: kagawaQuestions as RawQuestion[],
  kagoshima: kagoshimaQuestions as RawQuestion[],
  kanagawa: kanagawaQuestions as RawQuestion[],
  kochi: kochiQuestions as RawQuestion[],
  kumamoto: kumamotoQuestions as RawQuestion[],
  kyoto: kyotoQuestions as RawQuestion[],
  mie: mieQuestions as RawQuestion[],
  miyagi: miyagiQuestions as RawQuestion[],
  miyazaki: miyazakiQuestions as RawQuestion[],
  nagano: naganoQuestions as RawQuestion[],
  nagasaki: nagasakiQuestions as RawQuestion[],
  nara: naraQuestions as RawQuestion[],
  niigata: niigataQuestions as RawQuestion[],
  oita: oitaQuestions as RawQuestion[],
  okayama: okayamaQuestions as RawQuestion[],
  okinawa: okinawaQuestions as RawQuestion[],
  osaka: osakaQuestions as RawQuestion[],
  saga: sagaQuestions as RawQuestion[],
  saitama: saitamaQuestions as RawQuestion[],
  shiga: shigaQuestions as RawQuestion[],
  shimane: shimaneQuestions as RawQuestion[],
  shizuoka: shizuokaQuestions as RawQuestion[],
  tochigi: tochigiQuestions as RawQuestion[],
  tokushima: tokushimaQuestions as RawQuestion[],
  tokyo: tokyoQuestions as RawQuestion[],
  tottori: tottoriQuestions as RawQuestion[],
  toyama: toyamaQuestions as RawQuestion[],
  wakayama: wakayamaQuestions as RawQuestion[],
  yamagata: yamagataQuestions as RawQuestion[],
  yamaguchi: yamaguchiQuestions as RawQuestion[],
  yamanashi: yamanashiQuestions as RawQuestion[],
};

export function getQuestionBank(prefectureId: string): RawQuestion[] {
  const bank = BANKS[prefectureId];
  if (!bank) {
    throw new Error(`No question bank for prefecture "${prefectureId}"`);
  }
  return bank;
}
