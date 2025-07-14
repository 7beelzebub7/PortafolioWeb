import { useEffect, useRef, useState } from "react";
import LightningBolt from "./LightningBolt";

export default function ClimaAmbiente() {
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rayos, setRayos] = useState([]);
  const intervalRef = useRef(null);

  // 🎵 Sonido de lluvia
  useEffect(() => {
    const rainAudio = new Audio("/sounds/rain.mp3");
    rainAudio.loop = true;
    rainAudio.volume = 0.4;

    const startRain = () => {
      rainAudio.play().catch((err) =>
        console.warn("Autoplay bloqueado:", err.message)
      );
      window.removeEventListener("click", startRain);
    };

    window.addEventListener("click", startRain);
    return () => window.removeEventListener("click", startRain);
  }, []);

  // ☔ Lluvia visual
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const drops = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 10 + Math.random() * 15,
      speed: 4 + Math.random() * 3,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 1;

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📉 Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const progress = Math.min(scrollTop / (window.innerHeight / 2), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⚡ Rayos con sonido y desaparición controlada
  useEffect(() => {
    clearInterval(intervalRef.current);
    setRayos([]);

    if (scrollProgress >= 1) return;

    intervalRef.current = setInterval(() => {
      const nuevoRayo = {
        id: Date.now(),
        left: Math.random() * 90,
        top: Math.random() * 30,
        angle: Math.random() * 40 - 20,
      };

      setRayos((prev) => [...prev, nuevoRayo]);

      // Quitar rayo tras 1 segundo
      setTimeout(() => {
        setRayos((prev) => prev.filter((r) => r.id !== nuevoRayo.id));
      }, 1000);
    }, 7000); // intervalo entre rayos

    return () => clearInterval(intervalRef.current);
  }, [scrollProgress]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      />
      {scrollProgress < 1 &&
        rayos.map((rayo) => (
          <LightningBolt
            key={rayo.id}
            left={rayo.left}
            top={rayo.top}
            angle={rayo.angle}
          />
        ))}
    </>
  );
}
