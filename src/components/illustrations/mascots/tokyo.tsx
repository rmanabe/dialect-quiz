import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Maneki-neko (beckoning cat) - originated in Asakusa/Imado, Tokyo's
// shitamachi district; the bold red collar+bell and raised paw are
// instantly recognizable even at small size.
export default function TokyoMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* raised beckoning paw (behind body, drawn first) */}
      <Ellipse cx={90} cy={38} rx={11} ry={16} fill="#FFFFFF" />
      <Ellipse cx={90} cy={38} rx={11} ry={16} fill="#00000008" />
      <Path d="M83 30 L97 30" stroke="#E8D8C8" strokeWidth={1.5} opacity={0.6} />
      {/* body */}
      <Circle cx={58} cy={66} r={38} fill="#FFFFFF" />
      <Circle cx={58} cy={66} r={38} fill="#00000008" />
      {/* triangular ears */}
      <Path d="M32 40 L26 18 L46 34 Z" fill="#FFFFFF" />
      <Path d="M84 40 L92 18 L74 34 Z" fill="#FFFFFF" />
      <Path d="M33 36 L30 24 L42 34 Z" fill="#F7B8C0" />
      <Path d="M83 36 L86 24 L76 34 Z" fill="#F7B8C0" />
      {/* glossy highlight */}
      <Ellipse cx={42} cy={48} rx={10} ry={7} fill="#F4F4F4" opacity={0.9} />
      {/* bold red collar + gold bell (defining feature) */}
      <Path d="M28 74 Q58 90 88 74" stroke="#D3271F" strokeWidth={7} fill="none" strokeLinecap="round" />
      <Circle cx={58} cy={88} r={6} fill="#F2C879" />
      <Circle cx={58} cy={88} r={2} fill="#B98C42" />
      {/* face */}
      <Circle cx={46} cy={eyeY} r={3.4} fill="#3A2412" />
      <Circle cx={70} cy={eyeY} r={3.4} fill="#3A2412" />
      <Circle cx={40} cy={62} r={4} fill="#F7B8C0" opacity={0.7} />
      <Circle cx={76} cy={62} r={4} fill="#F7B8C0" opacity={0.7} />
      {/* nose + whiskers */}
      <Path d="M58 62 L54 66 L62 66 Z" fill="#E88A6A" />
      <Path
        d="M18 60 L38 62 M18 68 L38 66 M78 62 L98 60 M78 66 L98 68"
        stroke="#D8D8D8"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      {mood === 'excited' ? (
        <Path d="M50 70 Q58 78 66 70" stroke="#3A2412" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M50 68 Q58 72 66 68" stroke="#3A2412" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M16 40 l6 6 M16 46 l6 -6" stroke="#D4AF37" strokeWidth={3} strokeLinecap="round" />
          <Path d="M112 60 l-6 6 M112 66 l-6 -6" stroke="#D4AF37" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
