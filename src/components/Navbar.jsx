import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const progress = Math.min(scrollY / 400, 1);
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 768;

  // ✏️ TAMAÑOS DEL LOGO por versión
  const logoSizes = {
    mobile: { start: 4.5, end: 0.9 },
    tablet: { start: 7, end: 0.8 },
    pc: { start: 12, end: 0.4 },
  };

  // 🧮 Determinar tamaños según versión
  const logoStartSize = isMobile
    ? logoSizes.mobile.start
    : isTablet
    ? logoSizes.tablet.start
    : logoSizes.pc.start;

  const logoEndScale = isMobile
    ? logoSizes.mobile.end
    : isTablet
    ? logoSizes.tablet.end
    : logoSizes.pc.end;

  // ✏️ POSICIÓN INICIAL del logo por versión
  const logoStartPosition = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(1)",
  };

  // ✏️ POSICIÓN FINAL del logo por versión
  const logoEndPosition = isMobile
    ? {
        top: "0.1rem",     // ← cambia aquí posición final en móvil
        left: "1rem",
        transform: `translate(0, 0) scale(${logoEndScale})`,
      }
    : isTablet
    ? {
        top: "0.1rem",     // ← cambia aquí posición final en tablet
        left: "-2rem",
        transform: `translate(0, 0) scale(${logoEndScale})`,
      }
    : {
        top: "-2.8rem",    // ← posición final en PC (no editar si está bien)
        left: "-2rem",
        transform: "translate(0, 0)",
      };

  // ✔️ Estilos base del botón
  const fontSize = isMobile ? "0.75rem" : isTablet ? "0.9rem" : "1.25rem";
  const padding = isMobile ? "0.4rem 0.8rem" : isTablet ? "0.5rem 1rem" : "0.75rem 1.5rem";
  const borderRadius = isMobile ? "0.8rem" : isTablet ? "1rem" : "1.5rem";

  return (
    <div className="relative min-h-screen w-full bg-[#0e1b26] overflow-hidden">

      {/* ✅ LOGO con tamaño y posición editable por versión */}
      <div
        className="fixed z-50 font-bold transition-all duration-500 ease-out flex items-center gap-2"
        style={{
          top: progress < 1 ? logoStartPosition.top : logoEndPosition.top,
          left: progress < 1 ? logoStartPosition.left : logoEndPosition.left,
          transform: progress < 1 ? logoStartPosition.transform : logoEndPosition.transform,
        }}
      >
        <img
          src="./images/logo.png"
          alt="Logo"
          className="glow-animation"
          style={{
            height: `${logoStartSize}rem`,
            transform: progress < 1
              ? "scale(1)"
              : `scale(${logoEndScale})`,
            transition: "transform 0.5s ease-out, height 0.5s ease-out",
          }}
        />
        <img
          src="./images/logoLetra.png"
          alt="Cumulonimbus Productor Multimedia"
          className="glow-animation"
          style={{
            height: `${logoStartSize}rem`,
            opacity: 1 - progress * 1.5,
            transition: "opacity 0.4s ease-out, transform 0.5s ease-out, height 0.5s ease-out",
          }}
        />
      </div>

      {/* 🔘 BOTONES */}
      <div className="fixed z-40 w-full h-full pointer-events-none">

        {/* 🔵 INICIO */}
        <Link
          to="/"
          className="absolute pointer-events-auto transition-all duration-500 ease-in-out text-[#d7d9d9]"
          style={{
            fontSize,
            padding,
            borderRadius,
            ...(isMobile && {
              top: `${1 - progress * 0.3}rem`,
              right: `${1 + progress * 12}rem`,
            }),
            ...(isTablet && {
              top: `${1 - progress * -0.5}rem`,
              right: `${2 + progress * 13.4}rem`,
            }),
            ...(!isMobile && !isTablet && {
              top: `${2 - progress * -0.1}rem`,
              right: `${4 - progress * -19}rem`,
            }),
          }}
        >
          <span
            className={`relative font-bold px-6 py-2 ${
              currentPath === "/"
                ? "after:scale-x-100"
                : "border-2 border-[#d7d9d9]"
            } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#d7d9d9] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300`}
            style={{ fontSize, borderRadius, padding }}
          >
            Inicio
          </span>
        </Link>

        {/* 🔵 PROYECTOS */}
        <Link
          to="/proyectos"
          className="absolute pointer-events-auto transition-all duration-500 ease-in-out text-[#d7d9d9]"
          style={{
            fontSize,
            padding,
            borderRadius,
            ...(isMobile && {
              top: `${39.3 - progress * 38.6}rem`,
              right: `${1 + progress * 5.8}rem`,
            }),
            ...(isTablet && {
              top: `${39 - progress * 37.5}rem`,
              right: `${2 + progress * 5.9}rem`,
            }),
            ...(!isMobile && !isTablet && {
              top: `${39 - progress * 37}rem`,
              right: `${3.5 - progress * -8.4}rem`,
            }),
          }}
        >
          <span
            className={`relative font-bold px-6 py-2 ${
              currentPath === "/proyectos"
                ? "after:scale-x-100"
                : "border-2 border-[#d7d9d9]"
            } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#d7d9d9] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300`}
            style={{ fontSize, borderRadius, padding }}
          >
            Proyectos
          </span>
        </Link>

        {/* 🔵 CONTACTO */}
        <Link
          to="/contacto"
          className="absolute pointer-events-auto transition-all duration-500 ease-in-out text-[#d7d9d9]"
          style={{
            fontSize,
            padding,
            borderRadius,

            // 📱 MÓVIL
            ...(isMobile && {
              top: `${39 - progress * 38.3}rem`,
              left: `${1 + progress * 22}rem`,
            }),

            // 💊 TABLET PEQUEÑA
            ...(windowWidth >= 640 && windowWidth < 720 && {
              top: `${39 - progress * 37.5}rem`,
              left: `${1 + progress * 33}rem`,
            }),

            // 💊 TABLET MEDIA
            ...(windowWidth >= 720 && windowWidth < 840 && {
              top: `${39 - progress * 37}rem`,
              left: `${1 + progress * 36}rem`,
            }),

            // 💊 TABLET GRANDE
            ...(windowWidth >= 840 && windowWidth < 1024 && {
              top: `${39 - progress * 37}rem`,
              left: `${1 + progress * 40}rem`,
            }),

            // 🖥 LAPTOP ESTÁNDAR
            ...(windowWidth >= 1024 && windowWidth < 1280 && {
              top: `${39 - progress * 37}rem`,
              left: `${1 + progress * 55}rem`,
            }),

            // 💻 PC GRANDE
            ...(windowWidth >= 1280 && windowWidth < 1536 && {
              top: `${39 - progress * 37}rem`,
              left: `${1 + progress * 80.5}rem`,
            }),

            // 🖥 ULTRAWIDE
            ...(windowWidth >= 1536 && {
              top: `${39 - progress * 37}rem`,
              left: `${1 + progress * 91}rem`,
            }),
          }}
        >
          <span
            className={`relative font-bold px-6 py-2 ${
              currentPath === "/contacto"
                ? "after:scale-x-100"
                : "border-2 border-[#d7d9d9]"
            } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-[#d7d9d9] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300`}
            style={{ fontSize, borderRadius, padding }}
          >
            Contacto
          </span>
        </Link>

      </div>

      {/* 📦 CONTENIDO PRINCIPAL */}
      <div className="pt-[120vh]">
        <Outlet />
      </div>
    </div>
  );
}
