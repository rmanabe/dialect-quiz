import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Momotaro's peach — given a real two-tone gradient (pale near the stem,
// deep rosy-red on the sun side) and a bolder center crease, since a plain
// pink circle alone reads as "generic ball," not specifically "peach."
export default function OkayamaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* stem */}
      <Path d="M60 24 Q59 16 62 9" stroke="#6B4226" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* leaf */}
      <Path d="M62 14 Q77 10 80 20 Q68 23 62 16 Z" fill="#5B8C3E" />
      {/* peach body */}
      <Circle cx={60} cy={64} r={40} fill="#FCE3C8" />
      <Circle cx={60} cy={64} r={40} fill="#00000008" />
      {/* deep rosy sun-blush covering most of the body */}
      <Path d="M60 24 A40 40 0 0 1 60 104 A40 40 0 0 1 32 90 A34 34 0 0 0 60 24 Z" fill="#E8607E" opacity={0.75} />
      {/* peach center crease (bold) */}
      <Path d="M60 25 Q55 50 60 74 Q65 90 58 101" stroke="#B23A54" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.8} />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={46} rx={13} ry={9} fill="#FFF3E0" opacity={0.9} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#7A2F3C" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#7A2F3C" />
      <Circle cx={42} cy={64} r={4} fill="#E8607E" opacity={0.55} />
      <Circle cx={78} cy={64} r={4} fill="#E8607E" opacity={0.55} />
      {mood === 'excited' ? (
        <Path d="M48 68 Q60 80 72 68" stroke="#7A2F3C" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 66 Q60 74 72 66" stroke="#7A2F3C" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 42 l6 6 M18 48 l6 -6" stroke="#3F51B5" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 42 l-6 6 M102 48 l-6 -6" stroke="#3F51B5" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
