import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Echizen crab mascot — Fukui's most famous winter delicacy and the
// prefecture's symbolic food. Reinforced with eye-stalks (the single most
// crab-defining visual cue) and bigger, higher-contrast pincers/shell
// segments after an earlier round-blob-only version tested as ambiguous.
export default function FukuiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 26 : 28;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* legs */}
      <Path d="M22 62 Q6 58 4 68" stroke="#D9502E" strokeWidth={5} strokeLinecap="round" fill="none" />
      <Path d="M20 76 Q4 76 2 86" stroke="#D9502E" strokeWidth={5} strokeLinecap="round" fill="none" />
      <Path d="M98 62 Q114 58 116 68" stroke="#D9502E" strokeWidth={5} strokeLinecap="round" fill="none" />
      <Path d="M100 76 Q116 76 118 86" stroke="#D9502E" strokeWidth={5} strokeLinecap="round" fill="none" />
      {/* big bold claws */}
      <Path d="M18 50 Q4 42 2 26 Q14 28 20 42 Q26 44 18 50 Z" fill="#C6431F" />
      <Path d="M18 50 Q4 42 2 26 Q14 28 20 42 Q26 44 18 50 Z" fill="#00000010" />
      <Ellipse cx={10} cy={34} rx={4} ry={2.5} fill="#FFD9C4" opacity={0.7} transform="rotate(-30 10 34)" />
      <Path d="M102 50 Q116 42 118 26 Q106 28 100 42 Q94 44 102 50 Z" fill="#C6431F" />
      <Path d="M102 50 Q116 42 118 26 Q106 28 100 42 Q94 44 102 50 Z" fill="#00000010" />
      <Ellipse cx={110} cy={34} rx={4} ry={2.5} fill="#FFD9C4" opacity={0.7} transform="rotate(30 110 34)" />
      {/* eye stalks - the classic crab tell */}
      <Path d="M48 52 Q46 40 44 30" stroke="#D9502E" strokeWidth={4} strokeLinecap="round" fill="none" />
      <Path d="M72 52 Q74 40 76 30" stroke="#D9502E" strokeWidth={4} strokeLinecap="round" fill="none" />
      <Circle cx={44} cy={eyeY} r={5.5} fill="#FDFBF3" />
      <Circle cx={76} cy={eyeY} r={5.5} fill="#FDFBF3" />
      <Circle cx={44} cy={eyeY} r={3} fill="#1A0A04" />
      <Circle cx={76} cy={eyeY} r={3} fill="#1A0A04" />
      {/* carapace body */}
      <Ellipse cx={60} cy={68} rx={40} ry={34} fill="#D9502E" />
      <Ellipse cx={60} cy={68} rx={40} ry={34} fill="#00000012" />
      {/* bold shell segment arcs */}
      <Path d="M28 62 Q60 76 92 62" stroke="#A83318" strokeWidth={3} fill="none" opacity={0.7} />
      <Path d="M32 84 Q60 96 88 84" stroke="#A83318" strokeWidth={3} fill="none" opacity={0.7} />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={54} rx={11} ry={7} fill="#F0805A" opacity={0.8} />
      {/* mouth */}
      {mood === 'excited' ? (
        <Path d="M48 76 Q60 88 72 76" stroke="#3A1408" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 74 Q60 82 72 74" stroke="#3A1408" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {/* cheeks */}
      <Circle cx={40} cy={74} r={4} fill="#FFC9A8" opacity={0.7} />
      <Circle cx={80} cy={74} r={4} fill="#FFC9A8" opacity={0.7} />
      {mood === 'excited' && (
        <G>
          <Path d="M16 16 l6 6 M16 22 l6 -6" stroke="#F2C879" strokeWidth={3} strokeLinecap="round" />
          <Path d="M104 16 l-6 6 M104 22 l-6 -6" stroke="#F2C879" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
