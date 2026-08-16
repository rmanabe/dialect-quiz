import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Puffed-up fugu (pufferfish) — Yamaguchi/Shimonoseki's signature dish.
// Strengthened with a crisp body outline and short radiating spike-tick
// marks (the puffer's defining trait) instead of faint dots, so the pale
// round body can't be mistaken for a generic blob.
export default function YamaguchiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 53 : 55;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* tail fin */}
      <Path d="M96 60 Q108 50 110 62 Q108 74 96 66 Z" fill="#D8CFC0" stroke="#9C8A6E" strokeWidth={1.5} />
      {/* side fins */}
      <Ellipse cx={30} cy={80} rx={8} ry={5} fill="#E7C7B8" opacity={0.9} stroke="#9C8A6E" strokeWidth={1} />
      <Ellipse cx={90} cy={82} rx={8} ry={5} fill="#E7C7B8" opacity={0.9} stroke="#9C8A6E" strokeWidth={1} />
      {/* puffed body */}
      <Circle cx={58} cy={60} r={41} fill="#EDE3D3" stroke="#B8A986" strokeWidth={2} />
      <Circle cx={58} cy={60} r={41} fill="#00000010" />
      {/* belly */}
      <Ellipse cx={58} cy={82} rx={26} ry={16} fill="#F7F1E5" opacity={0.9} />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={44} rx={13} ry={9} fill="#FBF6EC" opacity={0.85} />
      {/* spike ticks — the puffer's defining trait */}
      <Path d="M38 28 l-3 -6 M52 20 l-1 -7 M66 20 l1 -7 M80 28 l3 -6 M92 40 l6 -4 M96 56 l7 -1 M24 40 l-6 -4 M20 56 l-7 -1" stroke="#8C7B5C" strokeWidth={2} strokeLinecap="round" />
      {/* face */}
      <Circle cx={46} cy={eyeY} r={3.8} fill="#2B2318" />
      <Circle cx={70} cy={eyeY} r={3.8} fill="#2B2318" />
      <Circle cx={38} cy={62} r={4} fill="#F2A97C" opacity={0.55} />
      <Circle cx={78} cy={62} r={4} fill="#F2A97C" opacity={0.55} />
      {mood === 'excited' ? (
        <Ellipse cx={58} cy={72} rx={5} ry={6} fill="#2B2318" />
      ) : (
        <Path d="M52 70 Q58 74 64 70" stroke="#2B2318" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 40 l6 6 M14 46 l6 -6" stroke="#E74C3C" strokeWidth={3} strokeLinecap="round" />
          <Path d="M100 36 l-6 6 M100 42 l-6 -6" stroke="#E74C3C" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
