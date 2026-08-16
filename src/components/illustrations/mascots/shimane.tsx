import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Izumo soba in a round red-lacquer "warigo" bowl — strengthened with bold
// chopsticks (the clearest universal "bowl of noodles" cue), thicker dark
// noodle strands, and a bigger nori strip so it can't be mistaken for a
// plain colored ball.
export default function ShimaneMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* lacquer bowl body */}
      <Circle cx={60} cy={62} r={40} fill="#8B2E1F" />
      <Circle cx={60} cy={62} r={40} fill="#00000012" />
      {/* bowl rim */}
      <Ellipse cx={60} cy={38} rx={34} ry={8} fill="#6E2418" opacity={0.6} />
      {/* glossy lacquer highlight */}
      <Ellipse cx={46} cy={46} rx={12} ry={8} fill="#B24A38" opacity={0.8} />
      {/* soba noodle bed */}
      <Ellipse cx={60} cy={70} rx={31} ry={21} fill="#E4C79A" />
      {/* bold soba strands */}
      <Path d="M34 64 Q48 56 60 64 Q72 56 86 64" stroke="#7A5423" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Path d="M36 74 Q50 66 62 74 Q74 66 84 74" stroke="#7A5423" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Path d="M40 84 Q52 78 62 84 Q72 78 80 84" stroke="#7A5423" strokeWidth={2.6} fill="none" strokeLinecap="round" />
      {/* bold nori strip */}
      <Path d="M46 58 L54 58 L52 68 L44 68 Z" fill="#1F2B1F" />
      {/* green onion pieces */}
      <Circle cx={68} cy={60} r={2.2} fill="#4E8C3E" />
      <Circle cx={74} cy={68} r={2.2} fill="#4E8C3E" />
      <Circle cx={64} cy={52} r={2.2} fill="#4E8C3E" />
      {/* chopsticks resting on the bowl */}
      <Path d="M20 34 L54 22" stroke="#C9A66B" strokeWidth={2.6} strokeLinecap="round" />
      <Path d="M24 40 L58 28" stroke="#C9A66B" strokeWidth={2.6} strokeLinecap="round" />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#2B1410" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#2B1410" />
      <Circle cx={42} cy={62} r={4} fill="#F0A98F" opacity={0.6} />
      <Circle cx={78} cy={62} r={4} fill="#F0A98F" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 66 Q60 78 72 66" stroke="#2B1410" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 64 Q60 72 72 64" stroke="#2B1410" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M20 82 l6 6 M20 88 l6 -6" stroke="#D4AF37" strokeWidth={3} strokeLinecap="round" />
          <Path d="M100 82 l-6 6 M100 88 l-6 -6" stroke="#D4AF37" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
