import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function TochigiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 56 : 58;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* strawberry body */}
      <Path
        d="M60 24 C82 24 96 46 92 68 C89 92 74 100 60 100 C46 100 31 92 28 68 C24 46 38 24 60 24 Z"
        fill="#E6002D"
      />
      <Path
        d="M60 24 C82 24 96 46 92 68 C89 92 74 100 60 100 C46 100 31 92 28 68 C24 46 38 24 60 24 Z"
        fill="#00000012"
      />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={48} rx={11} ry={8} fill="#FF6B7A" opacity={0.8} />
      {/* strawberry seeds */}
      <Ellipse cx={42} cy={62} rx={1.8} ry={2.6} fill="#FFD93C" />
      <Ellipse cx={60} cy={54} rx={1.8} ry={2.6} fill="#FFD93C" />
      <Ellipse cx={78} cy={62} rx={1.8} ry={2.6} fill="#FFD93C" />
      <Ellipse cx={50} cy={80} rx={1.8} ry={2.6} fill="#FFD93C" />
      <Ellipse cx={70} cy={80} rx={1.8} ry={2.6} fill="#FFD93C" />
      <Ellipse cx={60} cy={92} rx={1.8} ry={2.6} fill="#FFD93C" />
      {/* calyx leaves */}
      <Path
        d="M60 26 L48 12 L54 24 L38 14 L48 28 L28 24 L44 34 L60 30 L76 34 L92 24 L72 28 L82 14 L66 24 L72 12 Z"
        fill="#3F9142"
      />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#5C0016" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#5C0016" />
      <Circle cx={42} cy={66} r={4} fill="#FFAFA0" opacity={0.7} />
      <Circle cx={78} cy={66} r={4} fill="#FFAFA0" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 70 Q60 82 72 70" stroke="#5C0016" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 68 Q60 76 72 68" stroke="#5C0016" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 46 l6 6 M18 52 l6 -6" stroke="#3F9142" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 46 l-6 6 M102 52 l-6 -6" stroke="#3F9142" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
