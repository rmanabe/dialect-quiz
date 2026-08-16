import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Kamakura Daibutsu (Great Buddha) - Kanagawa's most iconic landmark;
// the bronze-patina color, cranial bump, curl texture, and long earlobes
// are unmistakable even in silhouette.
export default function KanagawaMascot({ size = 120, mood = 'happy' }: Props) {
  const smileY = mood === 'excited' ? 84 : 82;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* long earlobes (defining feature) */}
      <Ellipse cx={26} cy={68} rx={7} ry={16} fill="#5A8C7A" />
      <Ellipse cx={94} cy={68} rx={7} ry={16} fill="#5A8C7A" />
      {/* head/body blob */}
      <Circle cx={60} cy={66} r={40} fill="#6B9A87" />
      <Circle cx={60} cy={66} r={40} fill="#00000012" />
      {/* cranial bump (nikukei, defining feature) */}
      <Circle cx={60} cy={22} r={11} fill="#6B9A87" />
      <Circle cx={60} cy={22} r={11} fill="#00000012" />
      {/* bold repeating curl texture (defining feature) */}
      <G opacity={0.55}>
        <Circle cx={44} cy={34} r={3} fill="#3F6B5A" />
        <Circle cx={58} cy={30} r={3} fill="#3F6B5A" />
        <Circle cx={72} cy={34} r={3} fill="#3F6B5A" />
        <Circle cx={38} cy={46} r={3} fill="#3F6B5A" />
        <Circle cx={52} cy={42} r={3} fill="#3F6B5A" />
        <Circle cx={66} cy={42} r={3} fill="#3F6B5A" />
        <Circle cx={80} cy={46} r={3} fill="#3F6B5A" />
        <Circle cx={60} cy={16} r={3} fill="#3F6B5A" />
      </G>
      {/* glossy highlight */}
      <Ellipse cx={46} cy={52} rx={10} ry={7} fill="#8FBBA8" opacity={0.8} />
      {/* serene closed eyes (meditative, defining feature) */}
      <Path d="M40 62 Q46 58 52 62" stroke="#243A32" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <Path d="M68 62 Q74 58 80 62" stroke="#243A32" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      {/* urna dot (forehead mark) */}
      <Circle cx={60} cy={50} r={2} fill="#3F6B5A" />
      {mood === 'excited' ? (
        <Path d={`M44 ${smileY} Q60 96 76 ${smileY}`} stroke="#243A32" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d={`M46 ${smileY} Q60 90 74 ${smileY}`} stroke="#243A32" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 44 l6 6 M14 50 l6 -6" stroke="#D4AF37" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 44 l-6 6 M106 50 l-6 -6" stroke="#D4AF37" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
