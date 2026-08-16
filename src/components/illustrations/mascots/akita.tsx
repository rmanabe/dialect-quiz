import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function AkitaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 56 : 58;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* shaggy straw hair fringe */}
      <G fill="#EDE6D6">
        <Path d="M22 46 Q18 24 30 14 Q28 30 34 40 Z" />
        <Path d="M36 32 Q36 12 48 6 Q42 22 44 34 Z" />
        <Path d="M60 28 Q60 8 60 2 Q60 18 60 30 Z" />
        <Path d="M84 32 Q84 12 72 6 Q78 22 76 34 Z" />
        <Path d="M98 46 Q102 24 90 14 Q92 30 86 40 Z" />
      </G>
      {/* namahage mask face */}
      <Circle cx={60} cy={64} r={40} fill="#C0392B" />
      <Circle cx={60} cy={64} r={40} fill="#00000012" />
      {/* bushy eyebrows */}
      <Path d="M36 52 Q46 42 56 50" stroke="#F5F0E6" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Path d="M84 52 Q74 42 64 50" stroke="#F5F0E6" strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={48} rx={11} ry={7} fill="#E06A57" opacity={0.7} />
      {/* face */}
      <Circle cx={46} cy={eyeY} r={4.2} fill="#1F0A06" />
      <Circle cx={74} cy={eyeY} r={4.2} fill="#1F0A06" />
      <Circle cx={40} cy={66} r={4} fill="#7A1D12" opacity={0.6} />
      <Circle cx={80} cy={66} r={4} fill="#7A1D12" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M44 72 Q60 88 76 72" stroke="#1F0A06" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M44 70 Q60 80 76 70" stroke="#1F0A06" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {/* fangs */}
      <Path d="M50 74 L48 82 L54 76 Z" fill="#F5F0E6" />
      <Path d="M70 74 L72 82 L66 76 Z" fill="#F5F0E6" />
      {mood === 'excited' && (
        <G>
          <Path d="M16 40 l6 6 M16 46 l6 -6" stroke="#F2C230" strokeWidth={3} strokeLinecap="round" />
          <Path d="M104 40 l-6 6 M104 46 l-6 -6" stroke="#F2C230" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
