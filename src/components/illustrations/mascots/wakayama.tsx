import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function WakayamaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 56 : 58;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* stem */}
      <Path d="M59 27 L61 16" stroke="#6B4226" strokeWidth={3} strokeLinecap="round" />
      {/* leaf */}
      <Path d="M60 24 Q46 12 54 4 Q68 6 66 20 Q64 24 60 24 Z" fill="#4C8C4A" />
      <Path d="M56 20 Q60 14 64 8" stroke="#3A6B38" strokeWidth={1.2} fill="none" strokeLinecap="round" />
      {/* body */}
      <Circle cx={60} cy={66} r={38} fill="#F4941F" />
      <Circle cx={60} cy={66} r={38} fill="#00000012" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={50} rx={12} ry={8} fill="#FBB151" opacity={0.85} />
      {/* peel navel mark */}
      <Circle cx={60} cy={30} r={3} fill="#D97A12" opacity={0.6} />
      {/* peel texture dots */}
      <Circle cx={40} cy={58} r={1.3} fill="#D97A12" opacity={0.5} />
      <Circle cx={50} cy={44} r={1.1} fill="#D97A12" opacity={0.5} />
      <Circle cx={78} cy={54} r={1.3} fill="#D97A12" opacity={0.5} />
      <Circle cx={70} cy={38} r={1} fill="#D97A12" opacity={0.5} />
      <Circle cx={82} cy={72} r={1.2} fill="#D97A12" opacity={0.5} />
      <Circle cx={38} cy={80} r={1.2} fill="#D97A12" opacity={0.5} />
      <Circle cx={60} cy={90} r={1.2} fill="#D97A12" opacity={0.5} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#7A3410" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#7A3410" />
      <Circle cx={42} cy={66} r={4} fill="#F08A5D" opacity={0.7} />
      <Circle cx={78} cy={66} r={4} fill="#F08A5D" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 70 Q60 82 72 70" stroke="#7A3410" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 68 Q60 76 72 68" stroke="#7A3410" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 44 l6 6 M18 50 l6 -6" stroke="#FFE29A" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 44 l-6 6 M102 50 l-6 -6" stroke="#FFE29A" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
