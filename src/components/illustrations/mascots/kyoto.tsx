import Svg, { Circle, Ellipse, Path, Rect, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Fushimi Inari torii gate - the single most iconic image of Kyoto worldwide,
// far more instantly recognizable at small size than a folded sweet.
export default function KyotoMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 84 : 86;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* pillars */}
      <Rect x={26} y={38} width={13} height={62} rx={5} fill="#B7282E" />
      <Rect x={81} y={38} width={13} height={62} rx={5} fill="#B7282E" />
      {/* top curved beam (kasagi) with black cap stripe */}
      <Path d="M12 40 Q60 26 108 40 L108 50 Q60 36 12 50 Z" fill="#B7282E" />
      <Path d="M12 36 Q60 22 108 36 L108 41 Q60 27 12 41 Z" fill="#2B2B2B" />
      {/* lower beam (nuki) */}
      <Rect x={20} y={56} width={80} height={13} rx={5} fill="#B7282E" />
      {/* central plaque (gaku) */}
      <Circle cx={60} cy={48} r={9} fill="#FFF6E5" />
      <Path d="M60 43 L60 53" stroke="#B7282E" strokeWidth={2.4} strokeLinecap="round" />
      {/* round stone-cream belly/base with face */}
      <Circle cx={60} cy={90} r={30} fill="#F3E4CF" />
      <Circle cx={60} cy={90} r={30} fill="#00000010" />
      <Ellipse cx={48} cy={76} rx={9} ry={5.5} fill="#FBF0DD" opacity={0.9} />
      {/* face */}
      <Circle cx={50} cy={eyeY} r={3.6} fill="#5B3A1E" />
      <Circle cx={70} cy={eyeY} r={3.6} fill="#5B3A1E" />
      <Circle cx={44} cy={92} r={4} fill="#F4A7A1" opacity={0.65} />
      <Circle cx={76} cy={92} r={4} fill="#F4A7A1" opacity={0.65} />
      {mood === 'excited' ? (
        <Path d="M50 96 Q60 104 70 96" stroke="#5B3A1E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M50 95 Q60 100 70 95" stroke="#5B3A1E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M2 60 l6 6 M2 66 l6 -6" stroke="#FFD97D" strokeWidth={3} strokeLinecap="round" />
          <Path d="M118 60 l-6 6 M118 66 l-6 -6" stroke="#FFD97D" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
