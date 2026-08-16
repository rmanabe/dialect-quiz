import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

export default function OkinawaMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 54 : 56;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* shisa guardian statue - curly mane tufts, bigger + more numerous to read as a mane not bear ears */}
      <Circle cx={22} cy={34} r={7} fill="#B5623C" />
      <Circle cx={30} cy={18} r={7.5} fill="#B5623C" />
      <Circle cx={48} cy={10} r={7.5} fill="#B5623C" />
      <Circle cx={72} cy={10} r={7.5} fill="#B5623C" />
      <Circle cx={90} cy={18} r={7.5} fill="#B5623C" />
      <Circle cx={98} cy={34} r={7} fill="#B5623C" />
      {/* pointed upright ears (further out + taller, distinct from mane tufts) */}
      <Path d="M26 40 Q14 18 34 20 Q35 32 28 40 Z" fill="#C9714A" />
      <Path d="M94 40 Q106 18 86 20 Q85 32 92 40 Z" fill="#C9714A" />
      {/* terracotta clay body */}
      <Circle cx={60} cy={64} r={40} fill="#C9714A" />
      <Circle cx={60} cy={64} r={40} fill="#00000012" />
      {/* glossy highlight */}
      <Ellipse cx={46} cy={48} rx={12} ry={8} fill="#E29A6E" opacity={0.8} />
      {/* bulging round guardian eyes (whites + dark pupils), wider apart, more shisa-like than a bear's small dot eyes */}
      <Circle cx={44} cy={eyeY} r={7} fill="#FFF7EE" />
      <Circle cx={76} cy={eyeY} r={7} fill="#FFF7EE" />
      <Circle cx={45} cy={eyeY + 1} r={3.8} fill="#3A2013" />
      <Circle cx={75} cy={eyeY + 1} r={3.8} fill="#3A2013" />
      <Circle cx={38} cy={62} r={4} fill="#F2B899" opacity={0.6} />
      <Circle cx={82} cy={62} r={4} fill="#F2B899" opacity={0.6} />
      {/* wide open roaring mouth (shisa's signature open-mouthed "a-gyo" expression) with visible teeth */}
      {mood === 'excited' ? (
        <Path d="M42 76 Q60 96 78 76 Q60 92 42 76 Z" fill="#5A2E1C" />
      ) : (
        <Path d="M44 74 Q60 88 76 74 Q60 84 44 74 Z" fill="#5A2E1C" />
      )}
      <Path d="M48 76 L51 81 L54 76 Z" fill="#FFF7EE" />
      <Path d="M56 78 L59 84 L62 78 Z" fill="#FFF7EE" />
      <Path d="M64 78 L67 84 L70 78 Z" fill="#FFF7EE" />
      {/* nose */}
      <Ellipse cx={60} cy={68} rx={5} ry={3.4} fill="#3A2013" />
      {mood === 'excited' && (
        <G>
          <Path d="M14 44 l6 6 M14 50 l6 -6" stroke="#1E9E9E" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 44 l-6 6 M106 50 l-6 -6" stroke="#1E9E9E" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
