import Svg, { Rect, Path, Polygon, Circle } from 'react-native-svg';

interface Props {
  size?: number;
}

export default function OsakaCastle({ size = 100 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* stone base */}
      <Polygon points="20,88 80,88 72,74 28,74" fill="#8C8C8C" />
      <Rect x={28} y={60} width={44} height={16} fill="#A6A6A6" />
      {/* main tower */}
      <Rect x={34} y={36} width={32} height={26} fill="#EDEDED" />
      <Path d="M30 36 L50 24 L70 36 Z" fill="#2E7D32" />
      {/* mid roof */}
      <Rect x={38} y={22} width={24} height={14} fill="#EDEDED" />
      <Path d="M35 22 L50 12 L65 22 Z" fill="#2E7D32" />
      {/* top roof */}
      <Path d="M40 12 L50 2 L60 12 Z" fill="#1B5E20" />
      {/* golden shachihoko ornaments */}
      <Circle cx={41} cy={11} r={1.8} fill="#FFC93C" />
      <Circle cx={59} cy={11} r={1.8} fill="#FFC93C" />
      {/* windows */}
      <Rect x={44} y={44} width={5} height={7} fill="#2E7D32" />
      <Rect x={51} y={44} width={5} height={7} fill="#2E7D32" />
      <Rect x={44} y={26} width={4} height={6} fill="#2E7D32" />
      <Rect x={52} y={26} width={4} height={6} fill="#2E7D32" />
    </Svg>
  );
}
