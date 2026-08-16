import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Sudachi — Tokushima's small round green citrus.
export default function TokushimaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* stem */}
      <Path d="M60 24 Q59 15 63 8" stroke="#5A4326" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* leaf */}
      <Path d="M63 13 Q78 8 81 19 Q69 23 63 15 Z" fill="#6E8F35" />
      {/* sudachi body */}
      <Circle cx={60} cy={64} r={40} fill="#8FAE3C" />
      <Circle cx={60} cy={64} r={40} fill="#00000012" />
      {/* blossom-end mark */}
      <Circle cx={60} cy={102} r={3} fill="#5F7A2A" opacity={0.6} />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={48} rx={13} ry={9} fill="#C4D98C" opacity={0.85} />
      {/* peel texture flecks */}
      <Circle cx={52} cy={38} r={1.2} fill="#5F7A2A" opacity={0.5} />
      <Circle cx={78} cy={56} r={1.2} fill="#5F7A2A" opacity={0.5} />
      <Circle cx={68} cy={86} r={1.2} fill="#5F7A2A" opacity={0.5} />
      <Circle cx={38} cy={76} r={1.2} fill="#5F7A2A" opacity={0.5} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#2E3B14" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#2E3B14" />
      <Circle cx={42} cy={64} r={4} fill="#E8A33C" opacity={0.5} />
      <Circle cx={78} cy={64} r={4} fill="#E8A33C" opacity={0.5} />
      {mood === 'excited' ? (
        <Path d="M48 68 Q60 80 72 68" stroke="#2E3B14" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 66 Q60 74 72 66" stroke="#2E3B14" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 42 l6 6 M18 48 l6 -6" stroke="#E8843C" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 42 l-6 6 M102 48 l-6 -6" stroke="#E8843C" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
