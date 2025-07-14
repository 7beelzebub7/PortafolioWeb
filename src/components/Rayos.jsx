import { useEffect, useState } from "react";

export default function Rayos() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const progress = Math.min(scrollTop / 600, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⚡ Aparecer/desaparecer rayos cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      setShow(true);
      setTimeout(() => setShow(false), 120); // visible solo 120ms
    }, 3000); // cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {scrollProgress < 1 && show && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40">
          {/* Rayo central visible brevemente */}
          <svg
            viewBox="0 0 100 100"
            className="absolute w-24 h-24 z-40"
            style={{
              top: '25%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 1 - scrollProgress,
            }}
          >
            <polygon
              points="45,0 60,30 50,30 65,60 35,30 45,30"
              fill="white"
              className="drop-shadow-[0_0_35px_white]"
            />
          </svg>
        </div>
      )}
    </>
  );
}
