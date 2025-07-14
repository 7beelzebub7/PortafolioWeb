import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Proyectos() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cursorData, setCursorData] = useState({});

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const key = windowWidth < 768 ? "mobile" : windowWidth < 1024 ? "tablet" : "desktop";

  return (
    <div className="p-4 mt-20">
      <div className="grid grid-cols-12 grid-rows-2 gap-4 h-auto">
        {[
          {
            id: "caja1",
            col: "col-span-7 md:col-span-6 lg:col-span-8",
            row: "row-span-1",
            media: {
              mobile: "/images/code2.jpg",
              tablet: "/images/code1.jpg",
              desktop: "/images/code.jpg",
            },
            label: "Web",
          },
          {
            id: "caja2",
            col: "col-span-5 md:col-span-6 lg:col-span-4",
            row: "row-span-1 md:row-span-2 lg:row-span-3",
            media: {
              mobile: "/img/caja1-mobile.jpg",
              tablet: "/img/caja1-tablet.jpg",
              desktop: "/img/caja1-desktop.jpg",
            },
            label: "Audiovisual",
          },
          {
            id: "caja3",
            col: "col-span-4 md:col-span-3 lg:col-span-5",
            row: "row-span-1",
            media: {
              mobile: "/images/espuelasCaballero.png",
              tablet: "/images/mockupEspuelasDeCaballero.png",
              desktop: "/images/intensity.png",
            },
            label: "Diseño",
          },
          {
            id: "caja4",
            col: "col-span-8 md:col-span-3 lg:col-span-3",
            row: "row-span-2 md:row-span-1 lg:row-span-1",
            media: {
              mobile: "/video/LogoAnimado.mp4",
              tablet: "/video/intensity.mp4",
              desktop: "/video/LogoAnimado.mp4",
            },
            label: "Animación",
            isVideo: true,
          },
          {
            id: "caja5",
            col: "col-span-4 md:col-span-12 lg:col-span-8",
            row: "row-span-1",
            media: {
              mobile: "/images/coco.png",
              tablet: "/images/ilustracion1.png",
              desktop: "/images/ilustracion.png",
            },
            label: "Ilustración",
          },
        ].map((caja) => (
          <motion.div
            key={`${caja.id}-${key}`}
            layout
            transition={{ layout: { duration: 0.6, type: "spring" } }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`bg-white/10 ${caja.col} ${caja.row} flex items-center justify-center text-white font-bold text-xl rounded-2xl`}
          >
            <Link
              className="relative w-full h-full overflow-hidden group"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setCursorData((prev) => ({ ...prev, [caja.id]: { x, y } }));
              }}
              onMouseLeave={() => {
                setCursorData((prev) => ({ ...prev, [caja.id]: null }));
              }}
            >
              {caja.isVideo ? (
                <>
                  <video
                    src={caja.media.mobile}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="shadow-2xl p-4 block md:hidden w-full h-full object-cover rounded-2xl"
                  ></video>
                  <video
                    src={caja.media.tablet}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="shadow-2xl p-4 hidden md:block lg:hidden w-full h-full object-cover rounded-2xl"
                  ></video>
                  <video
                    src={caja.media.desktop}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="shadow-2xl p-4 hidden lg:block w-full h-full object-cover rounded-2xl"
                  ></video>
                </>
              ) : (
                <>
                  <img
                    src={caja.media.mobile}
                    alt={`${caja.label} Mobile`}
                    className="shadow-2xl p-4 block md:hidden w-full h-full object-cover rounded-2xl"
                  />
                  <img
                    src={caja.media.tablet}
                    alt={`${caja.label} Tablet`}
                    className="shadow-2xl p-4 hidden md:block lg:hidden w-full h-full object-cover rounded-2xl"
                  />
                  <img
                    src={caja.media.desktop}
                    alt={`${caja.label} Desktop`}
                    className="shadow-2xl p-4 hidden lg:block w-full h-full object-cover rounded-2xl"
                  />
                </>
              )}
              <div
                className="absolute inset-0 rounded-2xl backdrop-blur-sm bg-black/30 transition-all duration-500 pointer-events-none"
                style={
                  cursorData[caja.id]
                    ? {
                        WebkitMaskImage: `radial-gradient(circle at ${cursorData[caja.id].x}% ${cursorData[caja.id].y}%, transparent 50px, black 250px)`,
                        maskImage: `radial-gradient(circle at ${cursorData[caja.id].x}% ${cursorData[caja.id].y}%, transparent 50px, black 250px)`,
                      }
                    : {}
                }
              ></div>
              <p className="absolute inset-0 flex items-center justify-center text-[#d7d9d9] text-3xl font-bold z-10 pointer-events-none">
                {caja.label}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}