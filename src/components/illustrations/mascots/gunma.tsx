import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function GunmaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 58 : 60;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* daruma body */}
      <Circle cx={60} cy={66} r={40} fill="#D3271F" />
      <Circle cx={60} cy={66} r={40} fill="#00000012" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={48} rx={12} ry={8} fill="#E85850" opacity={0.75} />
      {/* gold trim collar */}
      <Path
        d="M28 78 Q60 96 92 78"
        stroke="#F2C879"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M32 86 Q60 100 88 86"
        stroke="#F2C879"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        opacity={0.8}
      />
      {/* white face patch */}
      <Ellipse cx={60} cy={58} rx={30} ry={26} fill="#FBF3E4" />
      {/* bushy brows */}
      <Path
        d="M36 48 Q44 38 54 44 Q46 42 40 50 Z"
        fill="#1A1A1A"
      />
      <Path
        d="M84 48 Q76 38 66 44 Q74 42 80 50 Z"
        fill="#1A1A1A"
      />
      {/* mustache */}
      <Path
        d="M42 70 Q52 76 60 72 Q68 76 78 70"
        stroke="#1A1A1A"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        opacity={0.85}
      />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.6} fill="#1A1A1A" />
      <Circle cx={72} cy={eyeY} r={3.6} fill="#1A1A1A" />
      <Circle cx={42} cy={66} r={4} fill="#F0A6A0" opacity={0.7} />
      <Circle cx={78} cy={66} r={4} fill="#F0A6A0" opacity={0.7} />
      {mood === 'excited' ? (
        <Path d="M48 78 Q60 88 72 78" stroke="#8A2418" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M50 76 Q60 82 70 76" stroke="#8A2418" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M18 40 l6 6 M18 46 l6 -6" stroke="#F2C879" strokeWidth={3} strokeLinecap="round" />
          <Path d="M102 40 l-6 6 M102 46 l-6 -6" stroke="#F2C879" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
