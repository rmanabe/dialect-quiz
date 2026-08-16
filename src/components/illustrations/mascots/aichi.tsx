import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Kinshachi (golden shachihoko) mascot — the mythical tiger-headed golden
// fish ornaments atop Nagoya Castle, arguably the single most recognized
// symbol of Aichi/Nagoya. Swapped from an earlier misokatsu design that
// risked reading as a generic glazed cookie; the fish silhouette + solid
// gold color + spiky fin/tail read unambiguously.
export default function AichiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* upright tail fin fanning up behind */}
      <Path d="M60 24 L44 4 L56 22 L60 8 L64 22 L76 4 Z" fill="#E3B23C" />
      <Path d="M60 24 L44 4 L56 22 L60 8 L64 22 L76 4 Z" fill="#00000010" />
      {/* dorsal spikes along the back */}
      <Path d="M30 40 L24 30 L34 38 Z" fill="#C89328" />
      <Path d="M90 40 L96 30 L86 38 Z" fill="#C89328" />
      {/* rounded fish body */}
      <Ellipse cx={60} cy={62} rx={34} ry={38} fill="#E3B23C" />
      <Ellipse cx={60} cy={62} rx={34} ry={38} fill="#00000010" />
      {/* bold scale arcs */}
      <Path d="M40 60 Q46 66 40 72" stroke="#C89328" strokeWidth={2.5} fill="none" opacity={0.7} />
      <Path d="M52 64 Q58 70 52 76" stroke="#C89328" strokeWidth={2.5} fill="none" opacity={0.7} />
      <Path d="M64 64 Q70 70 64 76" stroke="#C89328" strokeWidth={2.5} fill="none" opacity={0.7} />
      <Path d="M76 60 Q82 66 76 72" stroke="#C89328" strokeWidth={2.5} fill="none" opacity={0.7} />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={44} rx={11} ry={8} fill="#F5D889" opacity={0.85} />
      {/* lower fin */}
      <Path d="M48 96 Q60 110 72 96 Q60 100 48 96 Z" fill="#C89328" />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.6} fill="#3A2412" />
      <Circle cx={72} cy={eyeY} r={3.6} fill="#3A2412" />
      <Circle cx={42} cy={64} r={4} fill="#FFF3CC" opacity={0.6} />
      <Circle cx={78} cy={64} r={4} fill="#FFF3CC" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 68 Q60 80 72 68" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 66 Q60 74 72 66" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 50 l6 6 M14 56 l6 -6" stroke="#B8342E" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 50 l-6 6 M106 56 l-6 -6" stroke="#B8342E" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
