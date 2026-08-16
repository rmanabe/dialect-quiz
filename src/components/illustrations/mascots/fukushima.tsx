import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function FukushimaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* stem */}
      <Path d="M60 20 Q57 8 62 0" stroke="#6B4226" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* leaf */}
      <Path d="M63 8 Q82 0 88 12 Q72 18 63 10 Z" fill="#4C7A3D" />
      {/* peach body */}
      <Circle cx={60} cy={64} r={40} fill="#F5B8C4" />
      <Circle cx={60} cy={64} r={40} fill="#00000012" />
      {/* bold peach cleft crease - the peach's single most defining feature */}
      <Path d="M60 24 Q52 46 60 68 Q68 90 56 106" stroke="#D9607E" strokeWidth={4.5} fill="none" strokeLinecap="round" opacity={0.9} />
      {/* blush */}
      <Ellipse cx={38} cy={72} rx={11} ry={8} fill="#E8607E" opacity={0.55} />
      <Ellipse cx={86} cy={74} rx={11} ry={8} fill="#E8607E" opacity={0.55} />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={46} rx={12} ry={8} fill="#FFE1E8" opacity={0.85} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#5C1C2A" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#5C1C2A" />
      {mood === 'excited' ? (
        <Path d="M48 66 Q60 78 72 66" stroke="#5C1C2A" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 64 Q60 72 72 64" stroke="#5C1C2A" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 40 l6 6 M18 46 l6 -6" stroke="#3A5FA0" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 40 l-6 6 M102 46 l-6 -6" stroke="#3A5FA0" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
