import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function NaraMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* bold branching antlers - filled shapes, not thin strokes, so they read clearly at small size */}
      <Path d="M42 32 Q38 12 22 10 Q34 20 38 34 Q30 22 16 22 Q28 28 40 38 Z" fill="#8A6644" />
      <Path d="M78 32 Q82 12 98 10 Q86 20 82 34 Q90 22 104 22 Q92 28 80 38 Z" fill="#8A6644" />
      {/* ears */}
      <Ellipse cx={33} cy={38} rx={9} ry={13} fill="#B98457" transform="rotate(-25 33 38)" />
      <Ellipse cx={87} cy={38} rx={9} ry={13} fill="#B98457" transform="rotate(25 87 38)" />
      <Ellipse cx={34} cy={40} rx={4.5} ry={7} fill="#E8C9A0" transform="rotate(-25 34 40)" />
      <Ellipse cx={86} cy={40} rx={4.5} ry={7} fill="#E8C9A0" transform="rotate(25 86 40)" />
      {/* head/body */}
      <Circle cx={60} cy={65} r={38} fill="#B98457" />
      <Circle cx={60} cy={65} r={38} fill="#00000012" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={49} rx={12} ry={8} fill="#D3A574" opacity={0.8} />
      {/* sika fawn spots - enlarged for clarity */}
      <Circle cx={32} cy={60} r={3.4} fill="#F7EFE0" opacity={0.9} />
      <Circle cx={27} cy={76} r={3} fill="#F7EFE0" opacity={0.9} />
      <Circle cx={88} cy={60} r={3.4} fill="#F7EFE0" opacity={0.9} />
      <Circle cx={93} cy={76} r={3} fill="#F7EFE0" opacity={0.9} />
      <Circle cx={38} cy={90} r={2.8} fill="#F7EFE0" opacity={0.9} />
      <Circle cx={82} cy={90} r={2.8} fill="#F7EFE0" opacity={0.9} />
      {/* muzzle patch */}
      <Ellipse cx={60} cy={86} rx={17} ry={13} fill="#F3E4CF" />
      {/* nose */}
      <Ellipse cx={60} cy={80} rx={5} ry={3.4} fill="#3A2412" />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#3A2412" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#3A2412" />
      <Circle cx={42} cy={64} r={4} fill="#F4A7A1" opacity={0.6} />
      <Circle cx={78} cy={64} r={4} fill="#F4A7A1" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M50 70 Q60 78 70 70" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M50 68 Q60 74 70 68" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 42 l6 6 M18 48 l6 -6" stroke="#FFD97D" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 42 l-6 6 M102 48 l-6 -6" stroke="#FFD97D" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
