import { useEffect, useRef } from "react";
import { playThunder } from "./thunderSound";

export default function LightningBolt({ left, top, angle }) {
  const hasPlayed = useRef(false);

  if (left === undefined || top === undefined || angle === undefined) return null;

  const generatePath = () => {
    let d = `M32 0`;
    let y = 0;
    for (let i = 0; i < 10; i++) {
      const x = 32 + Math.random() * 30 - 15;
      y += Math.random() * 10 + 8;
      d += ` L${x} ${y}`;
    }
    return d;
  };

  useEffect(() => {
    // Esperamos 50ms después del render para garantizar que el SVG esté en pantalla
    const timeout = setTimeout(() => {
      if (!hasPlayed.current) {
        playThunder();
        hasPlayed.current = true;
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <svg
      className="absolute z-50 pointer-events-none rayo-animado"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: `rotate(${angle}deg)`,
        width: "60px",
        height: "120px",
        opacity: 0.95,
      }}
      viewBox="0 0 64 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={generatePath()}
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="drop-shadow(0 0 6px white)"
      />
    </svg>
  );
}
