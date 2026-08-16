import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Peanut (rakkasei) - Chiba is Japan's top peanut-growing prefecture; the
// deeply pinched double-lobe shell silhouette and bold ridge lines are
// the defining, unmistakable feature.
export default function ChibaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 78 : 80;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* peanut shell silhouette with deep waist pinch */}
      <Path
        d="M60 16 C78 16 88 30 86 46 C84 54 78 58 74 62 C84 66 92 78 90 94 C88 110 76 118 60 118 C44 118 32 110 30 94 C28 78 36 66 46 62 C42 58 36 54 34 46 C32 30 42 16 60 16 Z"
        fill="#D9AD62"
      />
      <Path
        d="M60 16 C78 16 88 30 86 46 C84 54 78 58 74 62 C84 66 92 78 90 94 C88 110 76 118 60 118 C44 118 32 110 30 94 C28 78 36 66 46 62 C42 58 36 54 34 46 C32 30 42 16 60 16 Z"
        fill="#00000012"
      />
      {/* bold waist crease (defining feature) */}
      <Path d="M40 60 Q60 68 80 60" stroke="#8A6428" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.7} />
      {/* bold shell ridge lines */}
      <Path
        d="M42 28 Q60 22 78 28 M38 40 Q60 34 82 40 M36 82 Q60 74 84 82 M40 100 Q60 110 80 100"
        stroke="#8A6428"
        strokeWidth={2.8}
        fill="none"
        strokeLinecap="round"
        opacity={0.75}
      />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={32} rx={8} ry={6} fill="#EFC888" opacity={0.85} />
      <Ellipse cx={42} cy={78} rx={9} ry={7} fill="#EFC888" opacity={0.6} />
      {/* face (lower lobe) */}
      <Circle cx={48} cy={eyeY} r={3.8} fill="#5C3E14" />
      <Circle cx={72} cy={eyeY} r={3.8} fill="#5C3E14" />
      <Circle cx={42} cy={90} r={4} fill="#E8A15A" opacity={0.7} />
      <Circle cx={78} cy={90} r={4} fill="#E8A15A" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 94 Q60 106 72 94" stroke="#5C3E14" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 92 Q60 100 72 92" stroke="#5C3E14" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M12 60 l6 6 M12 66 l6 -6" stroke="#4C9A3B" strokeWidth={3} strokeLinecap="round" />
          <Path d="M108 60 l-6 6 M108 66 l-6 -6" stroke="#4C9A3B" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
