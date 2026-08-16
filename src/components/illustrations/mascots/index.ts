import AichiMascot from './aichi';
import AkitaMascot from './akita';
import AomoriMascot from './aomori';
import ChibaMascot from './chiba';
import EhimeMascot from './ehime';
import FukuiMascot from './fukui';
import FukuokaMascot from './fukuoka';
import FukushimaMascot from './fukushima';
import GifuMascot from './gifu';
import GunmaMascot from './gunma';
import HiroshimaMascot from './hiroshima';
import HokkaidoMascot from './hokkaido';
import HyogoMascot from './hyogo';
import IbarakiMascot from './ibaraki';
import IshikawaMascot from './ishikawa';
import IwateMascot from './iwate';
import KagawaMascot from './kagawa';
import KagoshimaMascot from './kagoshima';
import KanagawaMascot from './kanagawa';
import KochiMascot from './kochi';
import KumamotoMascot from './kumamoto';
import KyotoMascot from './kyoto';
import MieMascot from './mie';
import MiyagiMascot from './miyagi';
import MiyazakiMascot from './miyazaki';
import NaganoMascot from './nagano';
import NagasakiMascot from './nagasaki';
import NaraMascot from './nara';
import NiigataMascot from './niigata';
import OitaMascot from './oita';
import OkayamaMascot from './okayama';
import OkinawaMascot from './okinawa';
import SagaMascot from './saga';
import SaitamaMascot from './saitama';
import ShigaMascot from './shiga';
import ShimaneMascot from './shimane';
import ShizuokaMascot from './shizuoka';
import TochigiMascot from './tochigi';
import TokushimaMascot from './tokushima';
import TokyoMascot from './tokyo';
import TottoriMascot from './tottori';
import ToyamaMascot from './toyama';
import WakayamaMascot from './wakayama';
import YamagataMascot from './yamagata';
import YamaguchiMascot from './yamaguchi';
import YamanashiMascot from './yamanashi';

import type { ComponentType } from 'react';

interface MascotProps {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export const mascots: Record<string, ComponentType<MascotProps>> = {
  aichi: AichiMascot,
  akita: AkitaMascot,
  aomori: AomoriMascot,
  chiba: ChibaMascot,
  ehime: EhimeMascot,
  fukui: FukuiMascot,
  fukuoka: FukuokaMascot,
  fukushima: FukushimaMascot,
  gifu: GifuMascot,
  gunma: GunmaMascot,
  hiroshima: HiroshimaMascot,
  hokkaido: HokkaidoMascot,
  hyogo: HyogoMascot,
  ibaraki: IbarakiMascot,
  ishikawa: IshikawaMascot,
  iwate: IwateMascot,
  kagawa: KagawaMascot,
  kagoshima: KagoshimaMascot,
  kanagawa: KanagawaMascot,
  kochi: KochiMascot,
  kumamoto: KumamotoMascot,
  kyoto: KyotoMascot,
  mie: MieMascot,
  miyagi: MiyagiMascot,
  miyazaki: MiyazakiMascot,
  nagano: NaganoMascot,
  nagasaki: NagasakiMascot,
  nara: NaraMascot,
  niigata: NiigataMascot,
  oita: OitaMascot,
  okayama: OkayamaMascot,
  okinawa: OkinawaMascot,
  saga: SagaMascot,
  saitama: SaitamaMascot,
  shiga: ShigaMascot,
  shimane: ShimaneMascot,
  shizuoka: ShizuokaMascot,
  tochigi: TochigiMascot,
  tokushima: TokushimaMascot,
  tokyo: TokyoMascot,
  tottori: TottoriMascot,
  toyama: ToyamaMascot,
  wakayama: WakayamaMascot,
  yamagata: YamagataMascot,
  yamaguchi: YamaguchiMascot,
  yamanashi: YamanashiMascot,
};
