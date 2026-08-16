import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Budo (grape) mascot — Yamanashi is Japan's top grape (Koshu grape) and
// wine producing prefecture.
export default function YamanashiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* small grapes behind, for a cluster feel */}
      <Circle cx={36} cy={80} r={15} fill="#5B2C6F" />
      <Circle cx={84} cy={80} r={15} fill="#5B2C6F" />
      <Circle cx={60} cy={92} r={15} fill="#5B2C6F" />
      {/* main grape body */}
      <Circle cx={60} cy={62} r={38} fill="#7B3F91" />
      <Circle cx={60} cy={62} r={38} fill="#00000010" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={46} rx={11} ry={8} fill="#B685C9" opacity={0.8} />
      {/* stem + leaf */}
      <Path d="M60 24 Q58 14 64 8" stroke="#5A7A3A" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Path d="M64 8 Q76 2 80 14 Q70 18 64 8 Z" fill="#6FA84A" />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#2A1230" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#2A1230" />
      <Circle cx={42} cy={62} r={4} fill="#D9A8E8" opacity={0.6} />
      <Circle cx={78} cy={62} r={4} fill="#D9A8E8" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 66 Q60 78 72 66" stroke="#2A1230" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 64 Q60 72 72 64" stroke="#2A1230" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 40 l6 6 M14 46 l6 -6" stroke="#F4A300" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 40 l-6 6 M106 46 l-6 -6" stroke="#F4A300" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
