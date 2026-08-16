import Svg, { Circle, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
  color?: string;
}

// Generic speech-bubble mascot used by every prefecture that doesn't have its
// own custom illustration (currently only Osaka does, see TakoyakiMascot).
export default function WordMascot({ size = 120, mood = 'happy', color = '#7A6FF0' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Path
        d="M60 14 C86 14 106 32 106 55 C106 78 86 96 60 96 C52 96 45 94.5 39 91.5 L20 100 L27 82 C16 74 14 65 14 55 C14 32 34 14 60 14 Z"
        fill={color}
      />
      <Path
        d="M60 14 C86 14 106 32 106 55 C106 78 86 96 60 96 C52 96 45 94.5 39 91.5 L20 100 L27 82 C16 74 14 65 14 55 C14 32 34 14 60 14 Z"
        fill="#00000012"
      />
      {/* glossy highlight */}
      <Path d="M38 32 Q55 23 72 30" stroke="#FFFFFF" strokeWidth={4} opacity={0.35} fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <Circle cx={40} cy={64} r={5} fill="#FFFFFF" opacity={0.3} />
      <Circle cx={80} cy={64} r={5} fill="#FFFFFF" opacity={0.3} />
      {/* eyes */}
      <Circle cx={46} cy={eyeY} r={4} fill="#2B2B2B" />
      <Circle cx={74} cy={eyeY} r={4} fill="#2B2B2B" />
      {mood === 'excited' ? (
        <Path d="M46 68 Q60 82 74 68" stroke="#2B2B2B" strokeWidth={3} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M46 66 Q60 76 74 66" stroke="#2B2B2B" strokeWidth={3} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M4 30 l7 7 M4 37 l7 -7" stroke="#FFC93C" strokeWidth={3} strokeLinecap="round" />
          <Path d="M115 30 l-7 7 M115 37 l-7 -7" stroke="#FFC93C" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
