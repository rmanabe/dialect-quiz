import Svg, { Circle, Rect, Path } from 'react-native-svg';

interface Props {
  size?: number;
}

const COLORS = ['#E8572B', '#FFC93C', '#2E7D32', '#4A90D9', '#D9459B'];

export default function ConfettiBurst({ size = 200 }: Props) {
  const pieces = [
    { x: 20, y: 30, r: 5, shape: 'circle' },
    { x: 170, y: 40, r: 4, shape: 'circle' },
    { x: 40, y: 150, r: 4, shape: 'circle' },
    { x: 160, y: 140, r: 5, shape: 'circle' },
    { x: 100, y: 15, r: 4, shape: 'circle' },
    { x: 20, y: 90, r: 3.5, shape: 'square' },
    { x: 180, y: 90, r: 3.5, shape: 'square' },
    { x: 60, y: 175, r: 3.5, shape: 'square' },
    { x: 140, y: 175, r: 3.5, shape: 'square' },
    { x: 100, y: 185, r: 4, shape: 'circle' },
  ] as const;

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      {pieces.map((p, i) => {
        const color = COLORS[i % COLORS.length];
        if (p.shape === 'square') {
          return <Rect key={i} x={p.x - p.r} y={p.y - p.r} width={p.r * 2} height={p.r * 2} fill={color} rx={1} transform={`rotate(${(i * 37) % 360} ${p.x} ${p.y})`} />;
        }
        return <Circle key={i} cx={p.x} cy={p.y} r={p.r} fill={color} />;
      })}
      {/* sparkle stars near the center */}
      <Path d="M100 60 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" fill="#FFC93C" />
      <Path d="M60 110 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z" fill="#E8572B" />
      <Path d="M140 110 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z" fill="#2E7D32" />
    </Svg>
  );
}
