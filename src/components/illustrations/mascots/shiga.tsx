import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Funa (crucian carp, of funazushi/Lake Biwa fame) - strengthened with a
// bold forked tail and a gill mark, the two clearest universal "fish" signals.
export default function ShigaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 56 : 58;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* forked tail fin - bold V-notch, the clearest fish signal */}
      <Path d="M94 62 L120 34 L108 62 L120 90 Z" fill="#5E86A8" />
      {/* dorsal fin */}
      <Path d="M50 32 Q60 12 72 32 Q61 24 50 32 Z" fill="#5E86A8" />
      {/* body */}
      <Ellipse cx={56} cy={62} rx={40} ry={30} fill="#7FA8C9" />
      <Ellipse cx={56} cy={62} rx={40} ry={30} fill="#00000010" />
      {/* back shading */}
      <Path d="M18 48 Q56 22 94 48 Q56 38 18 48 Z" fill="#5E86A8" opacity={0.6} />
      {/* belly patch */}
      <Ellipse cx={54} cy={78} rx={26} ry={13} fill="#EAF3F8" opacity={0.85} />
      {/* pectoral fin */}
      <Path d="M38 70 Q26 80 32 94 Q44 84 46 72 Z" fill="#5E86A8" opacity={0.9} />
      {/* gill mark - bold curved line, the other clearest fish signal */}
      <Path d="M28 46 Q22 58 28 74" stroke="#3F5F7A" strokeWidth={2.6} fill="none" strokeLinecap="round" />
      {/* scale texture, bolder and more repeated */}
      <Path d="M42 52 Q47 57 42 62 Q47 67 42 72" stroke="#5E86A8" strokeWidth={1.4} fill="none" opacity={0.5} />
      <Path d="M58 48 Q63 53 58 58 Q63 63 58 68" stroke="#5E86A8" strokeWidth={1.4} fill="none" opacity={0.5} />
      <Path d="M74 54 Q79 59 74 64" stroke="#5E86A8" strokeWidth={1.4} fill="none" opacity={0.5} />
      {/* glossy highlight */}
      <Ellipse cx={40} cy={44} rx={10} ry={6} fill="#B9D6E8" opacity={0.8} />
      {/* face */}
      <Circle cx={26} cy={eyeY} r={4} fill="#FFF6E5" />
      <Circle cx={26} cy={eyeY} r={2.3} fill="#243A4A" />
      <Circle cx={42} cy={eyeY} r={4} fill="#FFF6E5" />
      <Circle cx={42} cy={eyeY} r={2.3} fill="#243A4A" />
      <Circle cx={22} cy={68} r={3.6} fill="#F4A7A1" opacity={0.55} />
      <Circle cx={46} cy={68} r={3.6} fill="#F4A7A1" opacity={0.55} />
      {mood === 'excited' ? (
        <Path d="M24 72 Q34 80 44 72" stroke="#243A4A" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M24 71 Q34 76 44 71" stroke="#243A4A" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M4 36 l6 6 M4 42 l6 -6" stroke="#D6EEFF" strokeWidth={3} strokeLinecap="round" />
          <Path d="M64 20 l6 6 M64 26 l6 -6" stroke="#D6EEFF" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
