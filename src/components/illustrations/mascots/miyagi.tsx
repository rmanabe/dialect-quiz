import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// An onigiri (rice ball) wearing Date Masamune's famous gold crescent-moon
// crest - riffing on Miyagi's real official mascot むすび丸, and instantly
// readable as "rice ball" even to someone with zero context.
export default function MiyagiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 46 : 48;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* gold crescent-moon crest */}
      <Path d="M48 8 Q60 -6 72 8 Q64 6 60 13 Q56 6 48 8 Z" fill="#C9A227" />
      {/* rounded rice-ball triangle */}
      <Path
        d="M60 14 Q66 14 68 22 L96 92 Q100 102 88 102 L32 102 Q20 102 24 92 L52 22 Q54 14 60 14 Z"
        fill="#FFFDF5"
      />
      <Path
        d="M60 14 Q66 14 68 22 L96 92 Q100 102 88 102 L32 102 Q20 102 24 92 L52 22 Q54 14 60 14 Z"
        fill="#00000008"
      />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={38} rx={9} ry={6} fill="#FFFFFF" opacity={0.9} />
      {/* black nori band wrapped around the base */}
      <Path d="M35 68 L85 68 L92 100 Q94 102 88 102 L32 102 Q26 102 28 100 Z" fill="#242424" />
      {/* face */}
      <Circle cx={50} cy={eyeY} r={3.6} fill="#3A2412" />
      <Circle cx={70} cy={eyeY} r={3.6} fill="#3A2412" />
      <Circle cx={44} cy={54} r={4} fill="#F7B8C0" opacity={0.7} />
      <Circle cx={76} cy={54} r={4} fill="#F7B8C0" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 58 Q60 68 72 58" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 56 Q60 63 72 56" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 34 l6 6 M14 40 l6 -6" stroke="#1C3D5A" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 34 l-6 6 M106 40 l-6 -6" stroke="#1C3D5A" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
