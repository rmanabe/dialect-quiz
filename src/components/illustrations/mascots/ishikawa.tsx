import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Kinpaku soft-serve mascot — Kanazawa's famous gold-leaf-covered soft
// serve ice cream (a signature only-in-Kanazawa treat since the city
// produces ~99% of Japan's gold leaf). Swapped from an earlier subtle
// gold-fleck wagashi design that read as an ambiguous beige blob; a
// solid gold swirl on a waffle cone is bold and unmistakable.
export default function IshikawaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 68 : 70;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* waffle cone */}
      <Path d="M42 92 L60 116 L78 92 Z" fill="#D9A85C" />
      <Path d="M46 96 L74 96" stroke="#B8823E" strokeWidth={1.5} opacity={0.6} />
      <Path d="M50 104 L70 104" stroke="#B8823E" strokeWidth={1.5} opacity={0.6} />
      <Path d="M48 92 L62 110" stroke="#B8823E" strokeWidth={1.2} opacity={0.5} />
      <Path d="M72 92 L58 110" stroke="#B8823E" strokeWidth={1.2} opacity={0.5} />
      {/* soft-serve swirl - solid gold, stacked for a twist silhouette */}
      <Circle cx={60} cy={78} r={26} fill="#D4AF37" />
      <Circle cx={60} cy={78} r={26} fill="#00000010" />
      <Circle cx={60} cy={52} r={20} fill="#D4AF37" />
      <Circle cx={60} cy={52} r={20} fill="#00000008" />
      <Circle cx={60} cy={30} r={13} fill="#D4AF37" />
      {/* gold leaf flag on top */}
      <Path d="M52 16 L68 10 L64 24 L48 26 Z" fill="#F5D67A" />
      <Path d="M54 16 L64 13" stroke="#FFF6D8" strokeWidth={1.2} opacity={0.8} />
      {/* glossy highlight on swirl */}
      <Ellipse cx={48} cy={62} rx={9} ry={14} fill="#F0CB6A" opacity={0.7} />
      {/* face on the largest, lowest swirl segment */}
      <Circle cx={48} cy={eyeY} r={3.6} fill="#5A4212" />
      <Circle cx={72} cy={eyeY} r={3.6} fill="#5A4212" />
      <Circle cx={42} cy={80} r={4} fill="#FFF3CC" opacity={0.6} />
      <Circle cx={78} cy={80} r={4} fill="#FFF3CC" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 84 Q60 96 72 84" stroke="#5A4212" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 82 Q60 90 72 82" stroke="#5A4212" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 44 l6 6 M14 50 l6 -6" stroke="#8B0000" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 44 l-6 6 M106 50 l-6 -6" stroke="#8B0000" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
