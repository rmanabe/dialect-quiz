import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function TakoyakiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* ball body */}
      <Circle cx={60} cy={62} r={40} fill="#D9924A" />
      <Circle cx={60} cy={62} r={40} fill="#00000012" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={46} rx={12} ry={8} fill="#F0B36B" opacity={0.8} />
      {/* sauce swirl */}
      <Path
        d="M35 78 Q60 92 85 78 Q78 86 60 88 Q42 86 35 78 Z"
        fill="#7A3410"
        opacity={0.85}
      />
      {/* mayo drizzle */}
      <Path
        d="M40 74 Q50 68 58 74 Q66 68 74 74"
        stroke="#FFF6E5"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
      {/* aonori flakes */}
      <Circle cx={44} cy={70} r={1.6} fill="#2E7D32" />
      <Circle cx={68} cy={72} r={1.6} fill="#2E7D32" />
      <Circle cx={56} cy={80} r={1.6} fill="#2E7D32" />
      {/* katsuobushi flake */}
      <Path d="M78 62 q6 -2 4 6 q-6 2 -4 -6 Z" fill="#F2C879" />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#3A2412" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#3A2412" />
      <Circle cx={42} cy={62} r={4} fill="#F08A5D" opacity={0.7} />
      <Circle cx={78} cy={62} r={4} fill="#F08A5D" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 66 Q60 78 72 66" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 64 Q60 72 72 64" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M20 40 l6 6 M20 46 l6 -6" stroke="#FFC93C" strokeWidth={3} strokeLinecap="round" />
          <Path d="M100 40 l-6 6 M100 46 l-6 -6" stroke="#FFC93C" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
