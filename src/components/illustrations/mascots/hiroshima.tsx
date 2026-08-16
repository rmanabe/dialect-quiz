import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Momiji manju — kept as a round blob body (per the illustration style),
// but now with a BOLD solid maple-leaf stamp on top (the momiji-manju's
// defining feature) instead of faint embossed veins, plus a bigger, more
// contrasty bitten edge revealing the bean-paste filling.
export default function HiroshimaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 74 : 76;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* cake body */}
      <Circle cx={60} cy={64} r={40} fill="#C08A4E" />
      <Circle cx={60} cy={64} r={40} fill="#00000012" />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={70} rx={13} ry={9} fill="#DDAE73" opacity={0.85} />
      {/* bold maple-leaf stamp (the momiji-manju's defining feature) */}
      <Path
        d="M60 24 L64 32 L74 26 L69 38 L80 37 L72 46 L78 54 L64 49 L61 58 L58 49 L44 54 L50 46 L42 37 L53 38 L48 26 L58 32 Z"
        fill="#C0392B"
        stroke="#8E2419"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      {/* bitten edge revealing bean paste (bold, high-contrast) */}
      <Path
        d="M94 74 Q104 82 94 94 Q84 104 72 98 Q86 90 84 80 Q88 74 94 74 Z"
        fill="#F3D9A0"
        stroke="#9C6B33"
        strokeWidth={1.4}
      />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#4A2A0F" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#4A2A0F" />
      <Circle cx={42} cy={84} r={4} fill="#F0A25F" opacity={0.6} />
      <Circle cx={78} cy={84} r={4} fill="#F0A25F" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 88 Q60 100 72 88" stroke="#4A2A0F" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 86 Q60 94 72 86" stroke="#4A2A0F" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 50 l6 6 M14 56 l6 -6" stroke="#E67E22" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 50 l-6 6 M106 56 l-6 -6" stroke="#E67E22" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
