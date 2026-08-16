import Svg, { Rect, Circle, Path } from 'react-native-svg';

interface Props {
  size?: number;
}

export default function Kushikatsu({ size = 90 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90">
      {/* skewer stick */}
      <Rect x={42} y={10} width={6} height={72} rx={3} fill="#D8B074" />
      {/* fried coating blobs */}
      <Circle cx={45} cy={30} r={16} fill="#E7A44C" />
      <Circle cx={45} cy={54} r={16} fill="#E7A44C" />
      {/* crispy texture dots */}
      <Circle cx={39} cy={25} r={1.4} fill="#B67A2A" />
      <Circle cx={51} cy={22} r={1.4} fill="#B67A2A" />
      <Circle cx={45} cy={35} r={1.4} fill="#B67A2A" />
      <Circle cx={38} cy={50} r={1.4} fill="#B67A2A" />
      <Circle cx={52} cy={48} r={1.4} fill="#B67A2A" />
      <Circle cx={45} cy={60} r={1.4} fill="#B67A2A" />
      {/* dipping sauce puddle */}
      <Path d="M20 82 Q45 92 70 82 Q60 86 45 86 Q30 86 20 82 Z" fill="#4A2A1A" />
    </Svg>
  );
}
