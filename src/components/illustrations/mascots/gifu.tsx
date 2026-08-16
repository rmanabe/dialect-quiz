import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Chochin (paper lantern) mascot — Gifu is Japan's leading producer of
// traditional paper lanterns (Gifu chochin). Reinforced with a bold red
// emblem disc and thicker, darker rib lines after an earlier version's
// subtle gold-on-gold ribs tested as too low-contrast to read clearly.
export default function GifuMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 40 : 42;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* hanging loop */}
      <Path d="M60 22 Q60 12 60 8" stroke="#5A3A1A" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* lantern body */}
      <Ellipse cx={60} cy={62} rx={36} ry={40} fill="#E8B84B" />
      <Ellipse cx={60} cy={62} rx={36} ry={40} fill="#00000010" />
      {/* bold red emblem disc, like traditional lantern-shop signage */}
      <Circle cx={60} cy={78} r={16} fill="#B8342E" />
      <Path d="M60 68 L64 78 L60 88 L56 78 Z" fill="#FDFBF3" opacity={0.9} />
      {/* bold rib lines */}
      <Path d="M24 44 Q60 58 96 44" stroke="#8A5A1E" strokeWidth={3} fill="none" opacity={0.8} />
      <Path d="M22 96 Q60 108 98 96" stroke="#8A5A1E" strokeWidth={3} fill="none" opacity={0.8} />
      {/* top/bottom wooden caps - bold and dark */}
      <Ellipse cx={60} cy={24} rx={15} ry={6} fill="#5A3A1A" />
      <Ellipse cx={60} cy={100} rx={15} ry={6} fill="#5A3A1A" />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={44} rx={9} ry={11} fill="#F5D889" opacity={0.6} />
      {/* face, placed above the emblem disc */}
      <Circle cx={46} cy={eyeY} r={3.6} fill="#3A2412" />
      <Circle cx={74} cy={eyeY} r={3.6} fill="#3A2412" />
      <Circle cx={38} cy={48} r={4} fill="#F0965A" opacity={0.6} />
      <Circle cx={82} cy={48} r={4} fill="#F0965A" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M46 52 Q60 62 74 52" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M46 50 Q60 56 74 50" stroke="#3A2412" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 28 l6 6 M14 34 l6 -6" stroke="#7A8B4E" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 28 l-6 6 M106 34 l-6 -6" stroke="#7A8B4E" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
