import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function OitaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* kabosu citrus body */}
      <Circle cx={60} cy={62} r={40} fill="#8BAA3C" />
      <Circle cx={60} cy={62} r={40} fill="#00000012" />
      {/* stem and leaf */}
      <Path d="M58 22 Q60 16 62 22" stroke="#5E7A28" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <Path d="M62 20 Q74 16 76 24 Q66 26 62 20 Z" fill="#5E9E3E" />
      {/* citrus peel dimple texture */}
      <Circle cx={38} cy={40} r={1.3} fill="#6F8E2E" opacity={0.6} />
      <Circle cx={46} cy={32} r={1.2} fill="#6F8E2E" opacity={0.6} />
      <Circle cx={80} cy={44} r={1.3} fill="#6F8E2E" opacity={0.6} />
      <Circle cx={88} cy={64} r={1.2} fill="#6F8E2E" opacity={0.6} />
      <Circle cx={34} cy={78} r={1.3} fill="#6F8E2E" opacity={0.6} />
      <Circle cx={70} cy={92} r={1.2} fill="#6F8E2E" opacity={0.6} />
      <Circle cx={50} cy={90} r={1.3} fill="#6F8E2E" opacity={0.6} />
      <Circle cx={90} cy={84} r={1.2} fill="#6F8E2E" opacity={0.6} />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={46} rx={12} ry={8} fill="#B8D46A" opacity={0.8} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#3A4A16" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#3A4A16" />
      <Circle cx={42} cy={62} r={4} fill="#D9E89C" opacity={0.6} />
      <Circle cx={78} cy={62} r={4} fill="#D9E89C" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 66 Q60 78 72 66" stroke="#3A4A16" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 64 Q60 72 72 64" stroke="#3A4A16" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M20 40 l6 6 M20 46 l6 -6" stroke="#E0A63E" strokeWidth={3} strokeLinecap="round" />
          <Path d="M100 40 l-6 6 M100 46 l-6 -6" stroke="#E0A63E" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
