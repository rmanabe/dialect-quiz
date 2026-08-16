import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Karashi renkon (fried mustard lotus root) - drawn with the lotus root's
// unmistakable tell: one central hole ringed by six more in the classic
// flower pattern, each outlined and filled with a bright mustard-yellow
// center so it reads as lotus root, not just "sprinkles on a cookie."
export default function KumamotoMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  const holes: [number, number][] = [
    [60, 36],
    [73, 36],
    [67, 24],
    [53, 24],
    [47, 36],
    [53, 48],
    [67, 48],
  ];
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* fried mustard-batter body */}
      <Circle cx={60} cy={62} r={40} fill="#D9A94F" />
      <Circle cx={60} cy={62} r={40} fill="#00000012" />
      {/* classic lotus-root flower-hole pattern, bold and outlined, sat above the face */}
      {holes.map(([hx, hy]) => (
        <G key={`${hx}-${hy}`}>
          <Circle cx={hx} cy={hy} r={6} fill="#F4E7C1" stroke="#8A5A1E" strokeWidth={1.2} />
          <Circle cx={hx} cy={hy} r={2.8} fill="#F0B23C" />
        </G>
      ))}
      {/* glossy highlight */}
      <Ellipse cx={30} cy={70} rx={9} ry={12} fill="#F2CB7D" opacity={0.7} />
      {/* face */}
      <Circle cx={48} cy={eyeY + 20} r={3.4} fill="#5A4212" />
      <Circle cx={72} cy={eyeY + 20} r={3.4} fill="#5A4212" />
      <Circle cx={42} cy={82} r={4} fill="#E89A5C" opacity={0.6} />
      <Circle cx={78} cy={82} r={4} fill="#E89A5C" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 86 Q60 98 72 86" stroke="#5A4212" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 84 Q60 92 72 84" stroke="#5A4212" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 60 l6 6 M14 66 l6 -6" stroke="#2E7D46" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 60 l-6 6 M106 66 l-6 -6" stroke="#2E7D46" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
