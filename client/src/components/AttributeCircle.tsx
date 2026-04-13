// src/components/AttributeCircle.tsx
import React from "react";

interface AttributeCircleProps {
  label: string;
  subLabel: string;
  value: number;
  onChange: (val: number) => void;
  color: string;
}

export const AttributeCircle: React.FC<AttributeCircleProps> = ({
  label,
  subLabel,
  value,
  onChange,
  color,
}) => {
  return (
    <div
      className="attr-circle"
      style={{ borderColor: color, boxShadow: `0 0 12px ${color}4D` }}
    >
      <span style={{ color }}>{label}</span>
      <span className="value" style={{ color }}>
        {value}
      </span>
      <span style={{ color, fontSize: "0.65rem" }}>{subLabel}</span>
      <div className="mt-1 flex gap-1">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="rounded bg-white/10 px-2 py-0.5 text-xs hover:bg-white/20"
          style={{ color }}
        >
          -
        </button>
        <button
          onClick={() => onChange(value + 1)}
          className="rounded bg-white/10 px-2 py-0.5 text-xs hover:bg-white/20"
          style={{ color }}
        >
          +
        </button>
      </div>
    </div>
  );
};