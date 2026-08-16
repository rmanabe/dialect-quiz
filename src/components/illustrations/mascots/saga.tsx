import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Arita-yaki (Imari) porcelain vase - drawn with an unmistakable vase
// silhouette (narrow rim, flared shoulder, round belly, foot) and a bold,
// high-contrast sometsuke blue-and-white pattern, since a subtle thin-line
// pattern on a plain circle just reads as "a ball."
export default function SagaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* narrow neck + rim */}
      <Path d="M50 8 L70 8 L74 26 L46 26 Z" fill="#F5F2E8" />
      <Ellipse cx={60} cy={8} rx={10} ry={4} fill="#EDEAE0" />
      <Path d="M46 26 L74 26" stroke="#1E4C7A" strokeWidth={3} />
      {/* round vase belly */}
      <Circle cx={60} cy={64} r={38} fill="#F5F2E8" />
      <Circle cx={60} cy={64} r={38} fill="#00000008" />
      {/* foot */}
      <Path d="M38 96 L82 96 L76 106 L44 106 Z" fill="#EDEAE0" />
      {/* bold blue shoulder band */}
      <Path d="M24 40 Q60 30 96 40" stroke="#1E4C7A" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* bold flower emblem, kept low on the belly so it never overlaps the mouth */}
      <Circle cx={60} cy={86} r={6} fill="#1E4C7A" />
      <Circle cx={50} cy={90} r={5} fill="#1E4C7A" opacity={0.9} />
      <Circle cx={70} cy={90} r={5} fill="#1E4C7A" opacity={0.9} />
      <Circle cx={60} cy={86} r={2.2} fill="#F5F2E8" />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={48} rx={11} ry={8} fill="#FFFFFF" opacity={0.75} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#1E4C7A" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#1E4C7A" />
      <Circle cx={42} cy={62} r={4} fill="#C94C4C" opacity={0.4} />
      <Circle cx={78} cy={62} r={4} fill="#C94C4C" opacity={0.4} />
      {mood === 'excited' ? (
        <Path d="M48 66 Q60 78 72 66" stroke="#1E4C7A" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 64 Q60 72 72 64" stroke="#1E4C7A" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 40 l6 6 M14 46 l6 -6" stroke="#C94C4C" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 40 l-6 6 M106 46 l-6 -6" stroke="#C94C4C" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
