import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// A stack of wanko-soba lacquer bowls - the single most iconic image of Iwate's
// famous "bottomless bowl" noodle tradition (towers of empty bowls piled up).
export default function IwateMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 50 : 52;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* bottom bowl of the stack */}
      <Ellipse cx={60} cy={106} rx={42} ry={14} fill="#6B2415" />
      <Ellipse cx={60} cy={94} rx={38} ry={7} fill="#1F1F1F" />
      {/* middle bowl of the stack */}
      <Ellipse cx={60} cy={86} rx={36} ry={13} fill="#8C2F1B" />
      <Ellipse cx={60} cy={75} rx={32} ry={7} fill="#1F1F1F" />
      {/* top bowl - the character's face lives here */}
      <Circle cx={60} cy={54} r={28} fill="#B5432B" />
      <Circle cx={60} cy={54} r={28} fill="#00000012" />
      <Ellipse cx={60} cy={29} rx={26} ry={7} fill="#1F1F1F" />
      {/* bold noodle swirl peeking over the top rim */}
      <Path
        d="M32 27 Q42 15 52 26 Q60 13 68 26 Q78 15 88 27"
        stroke="#F5E6C8"
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
      {/* chopsticks resting on the top bowl */}
      <Path d="M20 18 L54 32" stroke="#8A5A34" strokeWidth={4} strokeLinecap="round" />
      <Path d="M24 26 L58 40" stroke="#8A5A34" strokeWidth={4} strokeLinecap="round" />
      {/* glossy highlight */}
      <Ellipse cx={48} cy={44} rx={9} ry={6} fill="#D97155" opacity={0.8} />
      {/* face */}
      <Circle cx={50} cy={eyeY} r={3.6} fill="#2A0E06" />
      <Circle cx={70} cy={eyeY} r={3.6} fill="#2A0E06" />
      <Circle cx={44} cy={60} r={4} fill="#F0A98A" opacity={0.75} />
      <Circle cx={76} cy={60} r={4} fill="#F0A98A" opacity={0.75} />
      {mood === 'excited' ? (
        <Path d="M48 64 Q60 76 72 64" stroke="#2A0E06" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 62 Q60 70 72 62" stroke="#2A0E06" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M10 50 l6 6 M10 56 l6 -6" stroke="#F2C879" strokeWidth={3} strokeLinecap="round" />
          <Path d="M110 50 l-6 6 M110 56 l-6 -6" stroke="#F2C879" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
