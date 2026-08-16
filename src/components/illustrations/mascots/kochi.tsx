import Svg, { Ellipse, Path, Circle, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Katsuo tataki — seared bonito, Kochi's signature dish, kept as a soft
// rounded fish-blob (per the illustration style) with a dorsal fin for a
// clear fish silhouette, bold diagonal grill-sear char marks (not a vague
// dark patch), and bold dark belly stripes (skipjack's defining trait).
export default function KochiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 52 : 54;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* tail */}
      <Path d="M96 62 Q112 48 112 64 Q112 80 96 66 Z" fill="#3B5166" />
      {/* dorsal fin */}
      <Path d="M52 30 L58 12 L66 30 Z" fill="#3B5166" />
      {/* body */}
      <Ellipse cx={58} cy={64} rx={44} ry={36} fill="#4A6B85" />
      <Ellipse cx={58} cy={64} rx={44} ry={36} fill="#00000010" />
      {/* belly */}
      <Ellipse cx={54} cy={82} rx={34} ry={18} fill="#E8E8E0" />
      {/* seared crust zone along the top */}
      <Path d="M16 54 Q30 28 58 26 Q86 28 100 52 Q80 36 58 36 Q36 36 16 54 Z" fill="#5C3A24" opacity={0.6} />
      {/* bold diagonal grill-sear char marks */}
      <Path
        d="M26 40 L38 30 M40 36 L52 26 M54 34 L66 24 M68 36 L80 30 M82 40 L92 32"
        stroke="#2B1810"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      {/* bold belly stripes (skipjack's defining trait) */}
      <Path d="M26 74 Q46 80 66 74" stroke="#3B5166" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.75} />
      <Path d="M28 84 Q48 90 68 84" stroke="#3B5166" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.75} />
      <Path d="M30 94 Q48 99 66 94" stroke="#3B5166" strokeWidth={2.6} fill="none" strokeLinecap="round" opacity={0.7} />
      {/* glossy highlight */}
      <Ellipse cx={42} cy={46} rx={13} ry={8} fill="#7391A6" opacity={0.6} />
      {/* garnish sliver (ginger) */}
      <Path d="M86 70 q5 -3 5 3 q-5 3 -5 -3 Z" fill="#F2C879" />
      {/* face */}
      <Circle cx={44} cy={eyeY} r={3.6} fill="#1E2A30" />
      <Circle cx={68} cy={eyeY} r={3.6} fill="#1E2A30" />
      <Circle cx={38} cy={62} r={4} fill="#E8A56B" opacity={0.5} />
      <Circle cx={74} cy={62} r={4} fill="#E8A56B" opacity={0.5} />
      {mood === 'excited' ? (
        <Path d="M44 66 Q56 78 68 66" stroke="#1E2A30" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M44 64 Q56 71 68 64" stroke="#1E2A30" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M10 92 l6 6 M10 98 l6 -6" stroke="#F2C230" strokeWidth={3} strokeLinecap="round" />
          <Path d="M104 92 l-6 6 M104 98 l-6 -6" stroke="#F2C230" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
