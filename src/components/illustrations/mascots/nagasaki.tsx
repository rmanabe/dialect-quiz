import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  mood?: 'happy' | 'excited' | 'neutral';
}

// Castella sponge cake - drawn as an unmistakable rounded loaf block (not a
// plain circle) with a browned crust top and bottom and a dense cluster of
// zarame sugar granules along the base, its most recognizable trait.
export default function NagasakiMascot({ size = 120, mood = 'happy' }: Props) {
  const eyeY = mood === 'excited' ? 52 : 54;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* rounded loaf block silhouette */}
      <Path
        d="M24 40 Q24 22 42 22 L78 22 Q96 22 96 40 L96 86 Q96 104 78 104 L42 104 Q24 104 24 86 Z"
        fill="#E8B84B"
      />
      <Path
        d="M24 40 Q24 22 42 22 L78 22 Q96 22 96 40 L96 86 Q96 104 78 104 L42 104 Q24 104 24 86 Z"
        fill="#00000010"
      />
      {/* browned top crust */}
      <Path d="M24 40 Q24 22 42 22 L78 22 Q96 22 96 40 L96 48 L24 48 Z" fill="#B87A2E" />
      {/* browned bottom crust */}
      <Path d="M24 86 L96 86 Q96 104 78 104 L42 104 Q24 104 24 86 Z" fill="#B87A2E" />
      {/* dense zarame sugar granule cluster along the base, castella's signature tell */}
      <Circle cx={36} cy={94} r={1.8} fill="#FFF3C7" />
      <Circle cx={44} cy={97} r={1.6} fill="#FFF3C7" />
      <Circle cx={52} cy={93} r={1.7} fill="#FFF3C7" />
      <Circle cx={60} cy={97} r={1.8} fill="#FFF3C7" />
      <Circle cx={68} cy={93} r={1.6} fill="#FFF3C7" />
      <Circle cx={76} cy={97} r={1.7} fill="#FFF3C7" />
      <Circle cx={84} cy={93} r={1.6} fill="#FFF3C7" />
      {/* sponge crumb texture in the middle band */}
      <Circle cx={38} cy={62} r={1.3} fill="#C9962E" opacity={0.6} />
      <Circle cx={54} cy={68} r={1.3} fill="#C9962E" opacity={0.6} />
      <Circle cx={70} cy={60} r={1.3} fill="#C9962E" opacity={0.6} />
      <Circle cx={84} cy={70} r={1.3} fill="#C9962E" opacity={0.6} />
      {/* glossy highlight */}
      <Ellipse cx={42} cy={58} rx={11} ry={7} fill="#F6D383" opacity={0.8} />
      {/* face */}
      <Circle cx={48} cy={eyeY} r={3.4} fill="#6B4212" />
      <Circle cx={72} cy={eyeY} r={3.4} fill="#6B4212" />
      <Circle cx={42} cy={60} r={4} fill="#F4A05C" opacity={0.6} />
      <Circle cx={78} cy={60} r={4} fill="#F4A05C" opacity={0.6} />
      {mood === 'excited' ? (
        <Path d="M48 64 Q60 76 72 64" stroke="#6B4212" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      ) : (
        <Path d="M48 62 Q60 70 72 62" stroke="#6B4212" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <G>
          <Path d="M14 36 l6 6 M14 42 l6 -6" stroke="#2E5C8A" strokeWidth={3} strokeLinecap="round" />
          <Path d="M106 36 l-6 6 M106 42 l-6 -6" stroke="#2E5C8A" strokeWidth={3} strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}
