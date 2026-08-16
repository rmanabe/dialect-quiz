import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function MiyazakiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* Miyazaki mango body - golden with the signature sun-kissed red blush */}
      <Circle cx={60} cy={62} r={40} fill="#F2B23C" />
      <Circle cx={60} cy={62} r={40} fill="#00000012" />
      <Path
        d="M92 34 Q104 62 86 92 Q100 66 92 34 Z"
        fill="#D9483C"
        opacity={0.75}
      />
      {/* stem */}
      <Path d="M58 22 Q60 14 64 20" stroke="#5E7A28" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* glossy highlight */}
      <Ellipse cx={44} cy={44} rx={13} ry={9} fill="#FBE29A" opacity={0.85} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#7A3418" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#7A3418" />
      <Circle cx={42} cy={62} r={4} fill="#FF9D7A" opacity={0.6} />
      <Circle cx={78} cy={62} r={4} fill="#FF9D7A" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 66 Q60 78 72 66" stroke="#7A3418" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 64 Q60 72 72 64" stroke="#7A3418" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M20 40 l6 6 M20 46 l6 -6" stroke="#3E8E7E" strokeWidth={3} strokeLinecap="round" />
          <Path d="M100 40 l-6 6 M100 46 l-6 -6" stroke="#3E8E7E" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
