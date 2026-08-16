import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Kobe beef (Tajima-gyu) as a cow - strengthened after feedback that the first
// pass read as a generic mammal: bold curved horns, sideways ears, a big flat
// muzzle, and a nose ring are the clearest "this is bovine" signals.
export default function HyogoMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 52 : 54;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* bold curved horns */}
      <Path d="M42 26 Q30 8 14 12 Q26 20 34 32 Z" fill="#EDE0C8" />
      <Path d="M78 26 Q90 8 106 12 Q94 20 86 32 Z" fill="#EDE0C8" />
      {/* forelock tuft */}
      <Path d="M52 22 Q60 12 68 22 Q60 20 52 22 Z" fill="#3E2815" />
      {/* ears sticking out sideways */}
      <Ellipse cx={18} cy={54} rx={13} ry={9} fill="#5A3A22" transform="rotate(-15 18 54)" />
      <Ellipse cx={102} cy={54} rx={13} ry={9} fill="#5A3A22" transform="rotate(15 102 54)" />
      <Ellipse cx={20} cy={54} rx={7} ry={5} fill="#8A6244" transform="rotate(-15 20 54)" />
      <Ellipse cx={100} cy={54} rx={7} ry={5} fill="#8A6244" transform="rotate(15 100 54)" />
      {/* head/body */}
      <Circle cx={60} cy={64} r={38} fill="#5A3A22" />
      <Circle cx={60} cy={64} r={38} fill="#00000012" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={48} rx={11} ry={7} fill="#78543A" opacity={0.8} />
      {/* marbling squiggles */}
      <Path d="M34 56 Q42 50 50 58 Q56 64 64 58" stroke="#E8D9C0" strokeWidth={2} fill="none" opacity={0.4} strokeLinecap="round" />
      <Path d="M70 46 Q78 42 86 48" stroke="#E8D9C0" strokeWidth={2} fill="none" opacity={0.4} strokeLinecap="round" />
      {/* big flat muzzle */}
      <Ellipse cx={60} cy={86} rx={22} ry={15} fill="#E4CBA8" />
      {/* nostrils */}
      <Ellipse cx={52} cy={86} rx={2.6} ry={3.4} fill="#3A2412" />
      <Ellipse cx={68} cy={86} rx={2.6} ry={3.4} fill="#3A2412" />
      {/* nose ring - the clearest "livestock cow" signal */}
      <Path d="M60 92 Q60 100 68 98" stroke="#D9CBB4" strokeWidth={2.6} fill="none" strokeLinecap="round" />
      {/* face */}
      <Circle cx={46} cy={eyeY} r={4.2} fill="#FFF6E5" />
      <Circle cx={46} cy={eyeY} r={2.3} fill="#241408" />
      <Circle cx={74} cy={eyeY} r={4.2} fill="#FFF6E5" />
      <Circle cx={74} cy={eyeY} r={2.3} fill="#241408" />
      {mood === 'excited' ? (
        <Path d="M48 72 Q60 78 72 72" stroke="#241408" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 71 Q60 75 72 71" stroke="#241408" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 38 l6 6 M14 44 l6 -6" stroke="#FFD97D" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 38 l-6 6 M106 44 l-6 -6" stroke="#FFD97D" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
