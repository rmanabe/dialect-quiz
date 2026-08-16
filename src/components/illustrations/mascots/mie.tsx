import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Ise-ebi (spiny lobster) - strengthened after feedback: antennae are now
// thick and unmistakable, the spiky shell is a bold filled crown (not faint
// tick marks), and the tail fan is bigger and clearly segmented.
export default function MieMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 48 : 50;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* long thick antennae - the lobster's most identifying feature */}
      <Path d="M48 26 Q26 4 4 2" stroke="#7A2211" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Path d="M72 26 Q94 4 116 2" stroke="#7A2211" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* short feeler antennae */}
      <Path d="M54 22 Q50 8 46 0" stroke="#7A2211" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <Path d="M66 22 Q70 8 74 0" stroke="#7A2211" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      {/* small walking legs */}
      <Path d="M28 84 L14 96 M32 92 L20 102" stroke="#A8331C" strokeWidth={3} strokeLinecap="round" />
      <Path d="M92 84 L106 96 M88 92 L100 102" stroke="#A8331C" strokeWidth={3} strokeLinecap="round" />
      {/* big segmented tail fan */}
      <Path d="M36 88 L24 114 L44 96 Z" fill="#C6351B" />
      <Path d="M60 92 L56 120 L64 120 L60 92 Z" fill="#C6351B" />
      <Path d="M84 88 L96 114 L76 96 Z" fill="#C6351B" />
      {/* body (cephalothorax) */}
      <Ellipse cx={60} cy={56} rx={34} ry={31} fill="#D9482B" />
      <Ellipse cx={60} cy={56} rx={34} ry={31} fill="#00000012" />
      {/* bold spike crown - filled triangles, not faint ticks */}
      <Path d="M28 42 L22 26 L34 34 Z" fill="#7A2211" />
      <Path d="M40 28 L36 12 L48 22 Z" fill="#7A2211" />
      <Path d="M60 22 L60 6 L68 20 Z" fill="#7A2211" />
      <Path d="M80 28 L84 12 L72 22 Z" fill="#7A2211" />
      <Path d="M92 42 L98 26 L86 34 Z" fill="#7A2211" />
      {/* segment lines on carapace */}
      <Path d="M30 68 Q60 76 90 68" stroke="#A8331C" strokeWidth={2} fill="none" opacity={0.65} />
      <Path d="M34 80 Q60 87 86 80" stroke="#A8331C" strokeWidth={2} fill="none" opacity={0.65} />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={42} rx={11} ry={7} fill="#EB7454" opacity={0.8} />
      {/* face */}
      <Circle cx={49} cy={eyeY} r={4} fill="#FFF6E5" />
      <Circle cx={49} cy={eyeY} r={2.2} fill="#3A140A" />
      <Circle cx={71} cy={eyeY} r={4} fill="#FFF6E5" />
      <Circle cx={71} cy={eyeY} r={2.2} fill="#3A140A" />
      <Circle cx={43} cy={58} r={3.8} fill="#FFC9A0" opacity={0.6} />
      <Circle cx={77} cy={58} r={3.8} fill="#FFC9A0" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M49 64 Q60 72 71 64" stroke="#3A140A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M49 63 Q60 68 71 63" stroke="#3A140A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M6 58 l6 6 M6 64 l6 -6" stroke="#FFD97D" strokeWidth={3} strokeLinecap="round" />
          <Path d="M114 58 l-6 6 M114 64 l-6 -6" stroke="#FFD97D" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
