import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Soka senbei - Saitama's iconic rice cracker; the bold dark grill-char
// marks and glossy soy glaze are the defining, unmistakable features.
export default function SaitamaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 56 : 58;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* cracker disc body (slightly irregular edge, not a perfect circle) */}
      <Path
        d="M60 22 Q84 24 94 46 Q102 60 94 80 Q86 100 60 102 Q36 100 26 80 Q18 60 26 44 Q36 22 60 22 Z"
        fill="#D9A648"
      />
      <Path
        d="M60 22 Q84 24 94 46 Q102 60 94 80 Q86 100 60 102 Q36 100 26 80 Q18 60 26 44 Q36 22 60 22 Z"
        fill="#00000012"
      />
      {/* bold grill char marks (defining feature) */}
      <Path
        d="M32 40 L88 40 M28 56 L92 56 M28 72 L92 72 M34 88 L86 88"
        stroke="#5C2E0E"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.85}
      />
      {/* glossy soy glaze sheen */}
      <Ellipse cx={44} cy={40} rx={11} ry={7} fill="#F0C878" opacity={0.8} />
      {/* face */}
      <Circle cx={46} cy={eyeY} r={3.6} fill="#3A1E08" />
      <Circle cx={74} cy={eyeY} r={3.6} fill="#3A1E08" />
      <Circle cx={40} cy={68} r={4} fill="#E8946A" opacity={0.65} />
      <Circle cx={80} cy={68} r={4} fill="#E8946A" opacity={0.65} />
      {mood === 'excited' ? (
        <Path d="M46 76 Q60 88 74 76" stroke="#3A1E08" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M46 74 Q60 82 74 74" stroke="#3A1E08" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 44 l6 6 M14 50 l6 -6" stroke="#4C9A3B" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 44 l-6 6 M106 50 l-6 -6" stroke="#4C9A3B" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
