import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Onigiri (rice ball) mascot, wrapped in a nori band — a nod to Niigata's
// Koshihikari rice, Japan's most famous rice-growing prefecture.
export default function NiigataMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 52 : 54;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* rounded triangle rice-ball body */}
      <Path
        d="M60 18 C64 18 67 20 69 24 L104 88 C107 93 104 100 98 100 L22 100 C16 100 13 93 16 88 L51 24 C53 20 56 18 60 18 Z"
        fill="#FDFBF3"
      />
      <Path
        d="M60 18 C64 18 67 20 69 24 L104 88 C107 93 104 100 98 100 L22 100 C16 100 13 93 16 88 L51 24 C53 20 56 18 60 18 Z"
        fill="#00000008"
      />
      {/* nori seaweed band */}
      <Path d="M18 82 L102 82 L98 100 L22 100 Z" fill="#2B2620" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={38} rx={10} ry={13} fill="#FFFFFF" opacity={0.6} />
      {/* rice grain flecks */}
      <Ellipse cx={72} cy={46} rx={2.2} ry={1.3} fill="#F3ECD8" opacity={0.9} />
      <Ellipse cx={80} cy={58} rx={2.2} ry={1.3} fill="#F3ECD8" opacity={0.9} />
      <Ellipse cx={36} cy={58} rx={2.2} ry={1.3} fill="#F3ECD8" opacity={0.9} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#3A2412" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#3A2412" />
      <Circle cx={42} cy={60} r={4} fill="#F4A28C" opacity={0.7} />
      <Circle cx={78} cy={60} r={4} fill="#F4A28C" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 62 Q60 74 72 62" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 60 Q60 68 72 60" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 36 l6 6 M18 42 l6 -6" stroke="#F2C94C" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 36 l-6 6 M102 42 l-6 -6" stroke="#F2C94C" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
