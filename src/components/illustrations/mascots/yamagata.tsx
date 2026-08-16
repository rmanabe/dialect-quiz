import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function YamagataMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 62 : 64;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* bold twin cherry stems meeting at a point above */}
      <Path d="M60 20 Q64 6 82 4" stroke="#4C7A3D" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Path d="M60 20 Q56 6 34 8" stroke="#4C7A3D" strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* leaf */}
      <Path d="M72 4 Q90 -4 96 8 Q80 14 72 6 Z" fill="#4C7A3D" />
      {/* left cherry (clearly visible, near-equal size) */}
      <Circle cx={40} cy={78} r={28} fill="#C21E4C" />
      {/* right cherry - main body with the face */}
      <Circle cx={78} cy={72} r={32} fill="#E0245E" />
      <Circle cx={78} cy={72} r={32} fill="#00000012" />
      {/* glossy highlights on both cherries */}
      <Ellipse cx={32} cy={68} rx={6} ry={4} fill="#F0678F" opacity={0.7} />
      <Ellipse cx={66} cy={58} rx={10} ry={7} fill="#F0678F" opacity={0.85} />
      {/* face on the main cherry */}
      <Circle cx={68} cy={eyeY} r={3.4} fill="#4A0D22" />
      <Circle cx={88} cy={eyeY} r={3.4} fill="#4A0D22" />
      <Circle cx={62} cy={74} r={3.8} fill="#FFB3C6" opacity={0.85} />
      <Circle cx={94} cy={74} r={3.8} fill="#FFB3C6" opacity={0.85} />
      {mood === 'excited' ? (
        <Path d="M66 78 Q78 88 90 78" stroke="#4A0D22" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M66 76 Q78 82 90 76" stroke="#4A0D22" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M8 46 l6 6 M8 52 l6 -6" stroke="#F5D547" strokeWidth={3} strokeLinecap="round" />
          <Path d="M108 46 l-6 6 M108 52 l-6 -6" stroke="#F5D547" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
