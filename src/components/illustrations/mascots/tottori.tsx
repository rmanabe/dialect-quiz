import Svg, { Path, Ellipse, Circle, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Nijusseiki pear — given a true pear silhouette (narrow shoulders, wide
// base) rather than a plain circle, plus bold russet-speckle blotches, so
// it reads unambiguously as a pear rather than a generic apple/ball.
export default function TottoriMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 70 : 72;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* stem */}
      <Path d="M60 26 Q59 17 63 10" stroke="#7A5A2E" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      {/* leaf */}
      <Path d="M63 16 Q79 11 83 21 Q71 26 63 18 Z" fill="#7BA843" />
      {/* pear-shaped body: narrow shoulders, bulbous base */}
      <Path
        d="M60 26 C46 26 36 34 33 50 C30 66 32 82 40 94 C47 104 53 108 60 108 C67 108 73 104 80 94 C88 82 90 66 87 50 C84 34 74 26 60 26 Z"
        fill="#D7DE7E"
      />
      <Path
        d="M60 26 C46 26 36 34 33 50 C30 66 32 82 40 94 C47 104 53 108 60 108 C67 108 73 104 80 94 C88 82 90 66 87 50 C84 34 74 26 60 26 Z"
        fill="#00000012"
      />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={54} rx={12} ry={9} fill="#EDF0B8" opacity={0.85} />
      {/* bold russet-speckle blotches (the pear-defining marking) */}
      <Ellipse cx={50} cy={44} rx={4} ry={2.6} fill="#8A6A2E" opacity={0.85} transform="rotate(-15 50 44)" />
      <Ellipse cx={78} cy={62} rx={3.6} ry={2.4} fill="#8A6A2E" opacity={0.85} transform="rotate(20 78 62)" />
      <Ellipse cx={68} cy={92} rx={4.2} ry={2.6} fill="#8A6A2E" opacity={0.8} transform="rotate(-10 68 92)" />
      <Ellipse cx={40} cy={82} rx={3.6} ry={2.4} fill="#8A6A2E" opacity={0.8} transform="rotate(25 40 82)" />
      <Ellipse cx={60} cy={100} rx={3.4} ry={2.2} fill="#8A6A2E" opacity={0.75} />
      <Ellipse cx={72} cy={40} rx={3} ry={2} fill="#8A6A2E" opacity={0.7} transform="rotate(10 72 40)" />
      {/* face */}
      <Circle cx={46} cy={eyeY} r={3.4} fill="#4B4416" />
      <Circle cx={74} cy={eyeY} r={3.4} fill="#4B4416" />
      <Circle cx={40} cy={78} r={4} fill="#F2A96B" opacity={0.65} />
      <Circle cx={80} cy={78} r={4} fill="#F2A96B" opacity={0.65} />
      {mood === 'excited' ? (
        <Path d="M46 82 Q60 94 74 82" stroke="#4B4416" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M46 80 Q60 88 74 80" stroke="#4B4416" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M16 44 l6 6 M16 50 l6 -6" stroke="#4FA8D8" strokeWidth={3} strokeLinecap="round" />
          <Path d="M104 44 l-6 6 M104 50 l-6 -6" stroke="#4FA8D8" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
