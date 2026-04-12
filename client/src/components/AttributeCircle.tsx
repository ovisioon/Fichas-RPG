// AttributeCircle — Círculo de atributo estilo mangá com estrelinhas
// Design: Dark Fantasy Manga — verde neon, fundo escuro, Bebas Neue + Oswald

import { SparkleCircle } from "./SparkleCircle";

interface AttributeCircleProps {
  label: string;
  subLabel: string;
  value: number;
  onChange: (val: number) => void;
  size?: number;
  themeColor?: string;
}

export function AttributeCircle({
  label,
  subLabel,
  value,
  onChange,
  size = 140,
  themeColor = "#4ADE80",
}: AttributeCircleProps) {
  const innerSize = size - 24;

  return (
    <div
      style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}
      className="flex items-center justify-center"
    >
      {/* Sparkle decoration */}
      <SparkleCircle size={size} color={themeColor} count={10} />

      {/* Circle */}
      <div
        className="attr-circle animate-pulse-glow"
        style={{
          width: innerSize,
          height: innerSize,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Label top */}
        <span
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: innerSize * 0.13,
            color: themeColor,
            letterSpacing: '0.05em',
            lineHeight: 1,
            textAlign: 'center',
            padding: '0 8px',
            textShadow: `0 0 8px ${themeColor}99`,
          }}
        >
          {label}
        </span>

        {/* Sub label */}
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: innerSize * 0.095,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.03em',
            lineHeight: 1,
            textAlign: 'center',
            padding: '0 6px',
          }}
        >
          {subLabel}
        </span>

        {/* Number input — centered */}
        <input
          type="number"
          className="manga-number"
          value={value === 0 ? '' : value}
          placeholder="0"
          min={0}
          max={99}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange(isNaN(v) ? 0 : Math.max(0, Math.min(99, v)));
          }}
          style={{
            fontSize: innerSize * 0.28,
            width: '70%',
            textAlign: 'center',
            lineHeight: 1,
            marginTop: '2px',
          }}
        />
      </div>
    </div>
  );
}
