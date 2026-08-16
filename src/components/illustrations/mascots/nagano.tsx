import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Ringo (apple) mascot — Nagano is one of Japan's top apple-growing
// prefectures, especially the Shinshu apple.
export default function NaganoMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 56 : 58;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* apple body - classic two-lobed silhouette */}
      <Path
        d="M60 26 C40 20 18 34 18 62 C18 88 38 104 60 104 C82 104 102 88 102 62 C102 34 80 20 60 26 Z"
        fill="#C0392B"
      />
      <Path
        d="M60 26 C40 20 18 34 18 62 C18 88 38 104 60 104 C82 104 102 88 102 62 C102 34 80 20 60 26 Z"
        fill="#00000010"
      />
      {/* top dimple */}
      <Path d="M50 26 Q60 20 70 26" stroke="#8E2A1F" strokeWidth={2} fill="none" opacity={0.5} />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={48} rx={12} ry={9} fill="#E8746A" opacity={0.8} />
      {/* stem + leaf */}
      <Path d="M60 26 Q58 14 62 8" stroke="#6B4226" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Path d="M62 12 Q74 6 78 16 Q68 20 62 12 Z" fill="#5A9A4A" />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#3A1210" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#3A1210" />
      <Circle cx={42} cy={64} r={4} fill="#F0A89E" opacity={0.7} />
      <Circle cx={78} cy={64} r={4} fill="#F0A89E" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 68 Q60 80 72 68" stroke="#3A1210" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 66 Q60 74 72 66" stroke="#3A1210" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M16 44 l6 6 M16 50 l6 -6" stroke="#8FAADC" strokeWidth={3} strokeLinecap="round" />
          <Path d="M104 44 l-6 6 M104 50 l-6 -6" stroke="#8FAADC" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
