import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Satsuma-imo (sweet potato) - drawn with a big, unmistakable sliced-open
// top revealing the golden flesh against the purple-red skin, since a
// small sliver of pale color barely read as anything in particular.
export default function KagoshimaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 58 : 60;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* tuber-shaped body, slightly taller than wide */}
      <Ellipse cx={60} cy={66} rx={36} ry={40} fill="#9C4A6B" />
      <Ellipse cx={60} cy={66} rx={36} ry={40} fill="#00000012" />
      {/* large sliced-open top revealing golden flesh */}
      <Path d="M26 34 Q60 12 94 34 Q90 52 60 54 Q30 52 26 34 Z" fill="#F5E1A4" />
      {/* bold rind line marking the skin/flesh boundary */}
      <Path d="M26 34 Q60 12 94 34" stroke="#7A3552" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* cut-surface texture lines */}
      <Path d="M44 30 Q46 40 44 48" stroke="#E8CE85" strokeWidth={1.6} fill="none" opacity={0.7} />
      <Path d="M76 30 Q74 40 76 48" stroke="#E8CE85" strokeWidth={1.6} fill="none" opacity={0.7} />
      {/* skin marks, bigger and higher-contrast */}
      <Ellipse cx={28} cy={58} rx={3} ry={2} fill="#6B2E48" opacity={0.8} />
      <Ellipse cx={92} cy={54} rx={2.8} ry={1.8} fill="#6B2E48" opacity={0.8} />
      <Ellipse cx={86} cy={92} rx={3} ry={2} fill="#6B2E48" opacity={0.8} />
      <Ellipse cx={32} cy={96} rx={2.6} ry={1.8} fill="#6B2E48" opacity={0.8} />
      <Ellipse cx={60} cy={102} rx={2.8} ry={1.8} fill="#6B2E48" opacity={0.8} />
      {/* glossy highlight */}
      <Ellipse cx={38} cy={62} rx={11} ry={9} fill="#C97D96" opacity={0.7} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#3E1626" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#3E1626" />
      <Circle cx={42} cy={eyeY + 6} r={4} fill="#F2A6BE" opacity={0.6} />
      <Circle cx={78} cy={eyeY + 6} r={4} fill="#F2A6BE" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 70 Q60 82 72 70" stroke="#3E1626" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 68 Q60 76 72 68" stroke="#3E1626" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 50 l6 6 M14 56 l6 -6" stroke="#E8A23D" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 50 l-6 6 M106 56 l-6 -6" stroke="#E8A23D" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
