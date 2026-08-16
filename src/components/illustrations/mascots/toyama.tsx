import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Masuzushi mascot — Toyama's iconic pressed trout sushi, wrapped in a
// dark bamboo leaf band. Swapped from an earlier firefly-squid design that
// tested as too ambiguous at small mascot size; the bold two-tone
// green/pink disc reads clearly as food from the icon alone.
export default function ToyamaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 60 : 62;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* bamboo leaf wrap - bold dark green outer ring */}
      <Circle cx={60} cy={64} r={42} fill="#2E5A34" />
      {/* pink salmon/trout top */}
      <Circle cx={60} cy={64} r={34} fill="#EF8FA0" />
      <Circle cx={60} cy={64} r={34} fill="#00000010" />
      {/* bold sliced-fish segment lines */}
      <Path d="M60 30 L60 98" stroke="#D9647C" strokeWidth={3} opacity={0.6} />
      <Path d="M30 64 L90 64" stroke="#D9647C" strokeWidth={3} opacity={0.6} />
      <Path d="M39 43 L81 85" stroke="#D9647C" strokeWidth={3} opacity={0.6} />
      <Path d="M81 43 L39 85" stroke="#D9647C" strokeWidth={3} opacity={0.6} />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={48} rx={11} ry={8} fill="#F7B8C4" opacity={0.8} />
      {/* white rice edge peeking out at bottom */}
      <Path d="M26 90 Q60 106 94 90 Q88 100 60 102 Q32 100 26 90 Z" fill="#FDFBF3" />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.6} fill="#5A1220" />
      <Circle cx={72} cy={eyeY} r={3.6} fill="#5A1220" />
      <Circle cx={42} cy={68} r={4} fill="#FFFFFF" opacity={0.5} />
      <Circle cx={78} cy={68} r={4} fill="#FFFFFF" opacity={0.5} />
      {mood === 'excited' ? (
        <Path d="M48 72 Q60 84 72 72" stroke="#5A1220" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 70 Q60 78 72 70" stroke="#5A1220" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M16 36 l6 6 M16 42 l6 -6" stroke="#F2C94C" strokeWidth={3} strokeLinecap="round" />
          <Path d="M104 36 l-6 6 M104 42 l-6 -6" stroke="#F2C94C" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
