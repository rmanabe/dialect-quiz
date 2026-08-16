import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Shimaenaga (long-tailed tit) - Hokkaido's beloved fluffy white winter bird,
// instantly recognizable in Japan as "Hokkaido's cutest mascot animal."
export default function HokkaidoMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 52 : 54;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* tail feathers sticking out behind */}
      <Path d="M60 96 L52 118 L60 108 L68 118 Z" fill="#E8E8E8" />
      {/* small stubby wings */}
      <Ellipse cx={22} cy={70} rx={10} ry={16} fill="#DCDCDC" transform="rotate(-20 22 70)" />
      <Ellipse cx={98} cy={70} rx={10} ry={16} fill="#DCDCDC" transform="rotate(20 98 70)" />
      {/* fluffy white round body */}
      <Circle cx={60} cy={62} r={40} fill="#FFFFFF" />
      <Circle cx={60} cy={62} r={40} fill="#00000008" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={46} rx={12} ry={8} fill="#F4F4F4" opacity={0.9} />
      {/* signature black eye-stripe marking (the shimaenaga's most distinctive feature) */}
      <Path d="M32 50 Q48 42 46 58 Q38 56 32 50 Z" fill="#2B2B2B" />
      <Path d="M88 50 Q72 42 74 58 Q82 56 88 50 Z" fill="#2B2B2B" />
      {/* tiny round black eyes */}
      <Circle cx={44} cy={eyeY} r={3} fill="#111" />
      <Circle cx={76} cy={eyeY} r={3} fill="#111" />
      {/* rosy cheeks */}
      <Circle cx={38} cy={66} r={5} fill="#F7B8C0" opacity={0.7} />
      <Circle cx={82} cy={66} r={5} fill="#F7B8C0" opacity={0.7} />
      {/* tiny triangular beak */}
      {mood === 'excited' ? (
        <Path d="M54 74 L60 84 L66 74 Z" fill="#4A4A4A" />
      ) : (
        <Path d="M55 74 L60 80 L65 74 Z" fill="#4A4A4A" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 40 l6 6 M14 46 l6 -6" stroke="#8B6BA8" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 40 l-6 6 M106 46 l-6 -6" stroke="#8B6BA8" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
