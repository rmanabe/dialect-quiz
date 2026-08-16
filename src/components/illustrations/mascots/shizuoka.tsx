import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Mikan (mandarin orange) mascot — Shizuoka is one of Japan's top mikan
// producing prefectures, alongside its famous green tea.
export default function ShizuokaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 56 : 58;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* body */}
      <Circle cx={60} cy={64} r={38} fill="#F28C28" />
      <Circle cx={60} cy={64} r={38} fill="#00000010" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={48} rx={11} ry={8} fill="#FBB35F" opacity={0.8} />
      {/* peel texture dots */}
      <Circle cx={72} cy={40} r={1.4} fill="#D9740E" opacity={0.5} />
      <Circle cx={82} cy={54} r={1.4} fill="#D9740E" opacity={0.5} />
      <Circle cx={40} cy={80} r={1.4} fill="#D9740E" opacity={0.5} />
      <Circle cx={30} cy={62} r={1.4} fill="#D9740E" opacity={0.5} />
      {/* stem + leaf */}
      <Path d="M60 26 L60 18" stroke="#6B4226" strokeWidth={3} strokeLinecap="round" />
      <Path d="M60 20 Q72 12 78 22 Q66 26 60 20 Z" fill="#4E8A3E" />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#5A2A08" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#5A2A08" />
      <Circle cx={42} cy={64} r={4} fill="#FFD9A0" opacity={0.7} />
      <Circle cx={78} cy={64} r={4} fill="#FFD9A0" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 68 Q60 80 72 68" stroke="#5A2A08" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 66 Q60 74 72 66" stroke="#5A2A08" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 40 l6 6 M18 46 l6 -6" stroke="#2E7D5E" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 40 l-6 6 M102 46 l-6 -6" stroke="#2E7D5E" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
