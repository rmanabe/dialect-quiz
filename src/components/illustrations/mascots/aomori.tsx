import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function AomoriMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* stem */}
      <Path d="M60 24 Q58 14 62 6" stroke="#6B4226" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      {/* leaf */}
      <Path d="M62 12 Q78 8 82 18 Q70 22 62 14 Z" fill="#5B8C3E" />
      {/* apple body */}
      <Circle cx={60} cy={64} r={40} fill="#D6402E" />
      <Circle cx={60} cy={64} r={40} fill="#00000012" />
      {/* top dimple */}
      <Path d="M48 26 Q60 20 72 26" stroke="#A62A1C" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={48} rx={13} ry={9} fill="#F08668" opacity={0.75} />
      {/* face */}
      <Circle cx={48} cy={eyeY + 2} r={3.4} fill="#3A0F08" />
      <Circle cx={72} cy={eyeY + 2} r={3.4} fill="#3A0F08" />
      <Circle cx={42} cy={64} r={4} fill="#FFC9B8" opacity={0.8} />
      <Circle cx={78} cy={64} r={4} fill="#FFC9B8" opacity={0.8} />
      {mood === 'excited' ? (
        <Path d="M48 68 Q60 80 72 68" stroke="#3A0F08" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 66 Q60 74 72 66" stroke="#3A0F08" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 42 l6 6 M18 48 l6 -6" stroke="#FFD54F" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 42 l-6 6 M102 48 l-6 -6" stroke="#FFD54F" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
