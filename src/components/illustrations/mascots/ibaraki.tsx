import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Melon - Ibaraki is Japan's #1 melon-producing prefecture; the bold
// crosshatch netting is the single most recognizable feature of the fruit.
export default function IbarakiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* melon body */}
      <Circle cx={60} cy={64} r={40} fill="#B5D14F" />
      <Circle cx={60} cy={64} r={40} fill="#00000010" />
      {/* stem */}
      <Path d="M56 24 Q54 14 60 8 Q58 16 62 24 Z" fill="#6B4226" />
      {/* bold net pattern (defining feature) */}
      <Path
        d="M24 50 Q60 40 96 50 M22 66 Q60 56 98 66 M26 82 Q60 74 94 82 M40 28 Q34 64 44 98 M60 24 Q56 64 60 102 M80 28 Q86 64 76 98"
        stroke="#7A9B2E"
        strokeWidth={3.5}
        fill="none"
        strokeLinecap="round"
        opacity={0.9}
      />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={44} rx={11} ry={7} fill="#D6E896" opacity={0.85} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.6} fill="#3A2412" />
      <Circle cx={72} cy={eyeY} r={3.6} fill="#3A2412" />
      <Circle cx={42} cy={64} r={4} fill="#F0B36B" opacity={0.6} />
      <Circle cx={78} cy={64} r={4} fill="#F0B36B" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 68 Q60 80 72 68" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 66 Q60 74 72 66" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 40 l6 6 M18 46 l6 -6" stroke="#FFD700" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 40 l-6 6 M102 46 l-6 -6" stroke="#FFD700" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
