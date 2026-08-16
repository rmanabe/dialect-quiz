import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Mentaiko (spicy cod roe) - drawn as a tall tapered oblong sac (not a plain
// ball) with a bold central membrane seam and dense roe-grain speckling,
// since a round mentaiko reads as "just an orange circle."
export default function FukuokaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 52 : 54;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* tapered roe-sac body, tall oval instead of a plain circle */}
      <Ellipse cx={60} cy={62} rx={30} ry={44} fill="#E2604A" />
      <Ellipse cx={60} cy={62} rx={30} ry={44} fill="#00000012" />
      {/* pinched tips top and bottom, the sac's signature taper */}
      <Path d="M52 20 Q60 12 68 20 Q64 26 60 26 Q56 26 52 20 Z" fill="#C94A36" />
      <Path d="M52 104 Q60 112 68 104 Q64 98 60 98 Q56 98 52 104 Z" fill="#C94A36" />
      {/* bold central seam, the membrane groove running the length of the sac */}
      <Path d="M60 24 Q54 62 60 100" stroke="#9C2E1E" strokeWidth={2.6} fill="none" opacity={0.85} />
      {/* dense roe-grain speckling covering the whole surface */}
      <Circle cx={38} cy={34} r={2} fill="#9C2E1E" />
      <Circle cx={48} cy={28} r={1.7} fill="#9C2E1E" />
      <Circle cx={30} cy={48} r={1.9} fill="#9C2E1E" />
      <Circle cx={82} cy={36} r={2} fill="#9C2E1E" />
      <Circle cx={90} cy={54} r={1.8} fill="#9C2E1E" />
      <Circle cx={78} cy={50} r={1.6} fill="#9C2E1E" />
      <Circle cx={32} cy={68} r={1.9} fill="#9C2E1E" />
      <Circle cx={86} cy={72} r={1.9} fill="#9C2E1E" />
      <Circle cx={36} cy={86} r={1.8} fill="#9C2E1E" />
      <Circle cx={80} cy={88} r={1.8} fill="#9C2E1E" />
      <Circle cx={46} cy={96} r={1.6} fill="#9C2E1E" />
      <Circle cx={72} cy={98} r={1.6} fill="#9C2E1E" />
      <Circle cx={44} cy={44} r={1.4} fill="#FFD9C9" opacity={0.8} />
      <Circle cx={76} cy={64} r={1.4} fill="#FFD9C9" opacity={0.8} />
      <Circle cx={42} cy={80} r={1.3} fill="#FFD9C9" opacity={0.8} />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={44} rx={10} ry={14} fill="#F4907C" opacity={0.7} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#5A2418" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#5A2418" />
      <Circle cx={42} cy={62} r={4} fill="#FFB199" opacity={0.7} />
      <Circle cx={78} cy={62} r={4} fill="#FFB199" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 66 Q60 78 72 66" stroke="#5A2418" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 64 Q60 72 72 64" stroke="#5A2418" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 44 l6 6 M14 50 l6 -6" stroke="#F2B705" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 44 l-6 6 M106 50 l-6 -6" stroke="#F2B705" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
