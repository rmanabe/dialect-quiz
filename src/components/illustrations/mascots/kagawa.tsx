import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// A bowl of Sanuki udon — Kagawa's most iconic food. Strengthened with a
// visible bowl rim, chopsticks + steam wisps (so it reads unmistakably as
// "hot noodles in a bowl," not just a plain pale ball like the fugu), and
// thicker white noodles + bigger garnish for contrast against the broth.
export default function KagawaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* bowl body */}
      <Circle cx={60} cy={62} r={40} fill="#EADFC4" />
      <Circle cx={60} cy={62} r={40} fill="#00000010" />
      {/* bowl rim */}
      <Ellipse cx={60} cy={38} rx={34} ry={8} fill="none" stroke="#B89B5E" strokeWidth={2} opacity={0.6} />
      {/* steam wisps */}
      <Path d="M46 16 Q42 8 46 2" stroke="#D8D0BE" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.7} />
      <Path d="M60 12 Q56 4 60 -2" stroke="#D8D0BE" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.7} />
      <Path d="M74 16 Q70 8 74 2" stroke="#D8D0BE" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.7} />
      {/* glossy ceramic highlight */}
      <Ellipse cx={46} cy={46} rx={12} ry={8} fill="#F7F0DC" opacity={0.85} />
      {/* broth pool */}
      <Ellipse cx={60} cy={72} rx={30} ry={19} fill="#EFCE8C" opacity={0.85} />
      {/* thick udon noodle strands */}
      <Path d="M34 66 Q48 58 60 66 Q72 58 86 66" stroke="#FFFCF4" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Path d="M37 77 Q50 69 62 77 Q75 69 83 77" stroke="#FFFCF4" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* green onion flecks */}
      <Circle cx={44} cy={72} r={2} fill="#6B8E4E" />
      <Circle cx={70} cy={64} r={2} fill="#6B8E4E" />
      <Circle cx={58} cy={82} r={2} fill="#6B8E4E" />
      {/* chopsticks resting on the bowl */}
      <Path d="M100 34 L66 22" stroke="#C9A66B" strokeWidth={2.6} strokeLinecap="round" />
      <Path d="M96 40 L62 28" stroke="#C9A66B" strokeWidth={2.6} strokeLinecap="round" />
      {/* tenkasu crumbs */}
      <Path d="M76 74 l3 -2 l3 2 l-1 3 l-4 0 Z" fill="#E0A83C" />
      <Path d="M50 78 l2.5 -1.5 l2.5 1.5 l-1 2.5 l-3 0 Z" fill="#E0A83C" />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#4A3B1E" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#4A3B1E" />
      <Circle cx={42} cy={62} r={4} fill="#F0A25F" opacity={0.55} />
      <Circle cx={78} cy={62} r={4} fill="#F0A25F" opacity={0.55} />
      {mood === 'excited' ? (
        <Path d="M48 66 Q60 78 72 66" stroke="#4A3B1E" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 64 Q60 72 72 64" stroke="#4A3B1E" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 90 l6 6 M14 96 l6 -6" stroke="#3B7FB5" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 90 l-6 6 M106 96 l-6 -6" stroke="#3B7FB5" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
