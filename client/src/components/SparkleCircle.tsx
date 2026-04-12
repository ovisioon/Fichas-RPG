// SparkleCircle — Decoração de estrelinhas ao redor dos círculos de atributo
// Design: Dark Fantasy Manga — estrelinhas verdes neon fiel ao mangá

interface SparkleCircleProps {
  size?: number;
  color?: string;
  count?: number;
}

export function SparkleCircle({ size = 140, color = "#4ADE80", count = 8 }: SparkleCircleProps) {
  const radius = size / 2 - 8;
  const center = size / 2;

  const sparks = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const dist = radius + 10 + (i % 3) * 4;
    const x = center + Math.cos(angle) * dist;
    const y = center + Math.sin(angle) * dist;
    const starSize = 4 + (i % 3) * 2;
    return { x, y, starSize, angle };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {sparks.map((s, i) => (
        <g key={i} transform={`translate(${s.x}, ${s.y})`}>
          {/* 4-point star */}
          <path
            d={`M 0 ${-s.starSize} L ${s.starSize * 0.25} ${-s.starSize * 0.25} L ${s.starSize} 0 L ${s.starSize * 0.25} ${s.starSize * 0.25} L 0 ${s.starSize} L ${-s.starSize * 0.25} ${s.starSize * 0.25} L ${-s.starSize} 0 L ${-s.starSize * 0.25} ${-s.starSize * 0.25} Z`}
            fill={color}
            opacity={0.7 + (i % 3) * 0.1}
            style={{
              filter: `drop-shadow(0 0 3px ${color})`,
            }}
          />
        </g>
      ))}
      {/* Extra small dots */}
      {sparks.slice(0, 5).map((s, i) => {
        const angle2 = ((i + 0.5) / count) * Math.PI * 2 - Math.PI / 2;
        const dist2 = radius + 6;
        const x2 = center + Math.cos(angle2) * dist2;
        const y2 = center + Math.sin(angle2) * dist2;
        return (
          <circle
            key={`dot-${i}`}
            cx={x2}
            cy={y2}
            r={1.5}
            fill={color}
            opacity={0.5}
          />
        );
      })}
    </svg>
  );
}
