import { motion } from "framer-motion";
import ClimaAmbiente from "../components/ClimaAmbiente";

// 🧩 Datos de las cartas con imágenes, video o texto
const cardData = [
  {
    id: 5,
    title: "Bienvenidos",
    description: "Soy beelzebub productor multimedia y esto es cumulonimbus, un lugar donde en una tormenta de habilidades encontrarás una lluvia de ideas y truenos de creatividad.",
    isTextOnly: true,
    initialScale: 0.8,
    finalScale: 1,
  },
  {
    id: 1,
    title: "Coco",
    description: "una de mis habilidades es la creación de personajes y la ilustración, este es COCO un proyecto personal basado en mi representado en un cocodrilo",
    image: "./images/coco.png",
    initialScale: 0.3,
    finalScale: 0.8,
  },
  {
    id: 2,
    title: "Diseño y Mockups",
    description: "Me gusta ilustrar y más si es para que se imprima, ya que un diseño impreso es una idea inmortalizada. este es un diseño de espuelas de caballero.",
    image: "./images/mockupEspuelasDeCaballero.png",
    style: { width: "700px", height: "400px" },
    initialScale: 0.2,
    finalScale: 0.9,
  },
  {
    id: 3,
    title: "Diseño Web",
    description: "No está de más decir que una de mis habilidades es el diseño frontEnd usando HTML5, CSS3, JavaScript y librerías como React, aunque no me quedo ahí ya que me estoy adentrando en el backEnd aprendiendo Laravel.",
    video: "./video/visual.mp4",
    initialScale: 0.5,
    finalScale: 0.9,
  },
  {
    id: 4,
    title: "Fotografía",
    description: "LA fotografía y el audiovisual me gustan aunque debo reconocer que no soy tan bueno como en otras cosas. Esta fué una sesión de fotos en las que se puso en práctica la planimetría y angulación",
    image: "./images/photo.jpg",
    initialScale: 0.4,
    finalScale: 0.9,
  },
  {
    id: 6,
    title: "",
    description: "Cumulonimbus se basa en explorar todas esas lluvias y truenos que se generan en la mente de las personas y que las mantienen ocultas para unirlas y crear la tormenta más hermosa y caotica de todas.",
    isTextOnly: true,
    initialScale: 0.8,
    finalScale: 1,
  },
];

export default function Inicio() {
  // Detecta tamaño de pantalla
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
  const isPC = window.innerWidth >= 1024;

  return (
    <>
      <ClimaAmbiente />
      <div className="min-h-[400vh] bg-gradient-to-b from-[#0e1b26] to-[#496373] p-12 space-y-32">
        {cardData.map((card, index) => {
          const isEven = index % 2 === 1;
          const direction = isEven ? 400 : -400;

          return (
            <motion.div
              key={card.id}
              initial={{
                opacity: 0,
                x: card.isTextOnly
                  ? -200
                  : isMobile || isTablet
                  ? 0
                  : direction, // ← solo PC tiene desplazamiento lateral
                scale: card.initialScale ?? 0.4,
              }}
              whileInView={{
                opacity: 1,
                x: card.isTextOnly
                  ? 0
                  : isMobile || isTablet
                  ? 0 // ← en móviles y tablets las cajas terminan centradas
                  : card.id === 1 || card.id === 3
                  ? 250
                  : -250, // ← movimiento lateral solo en PC
                scale: card.finalScale ?? 1,
              }}
              transition={{
                opacity: { duration: 0.6, ease: "easeOut" },
                x: { duration: 0.8, ease: "easeOut" },
                scale: {
                  duration: 1,
                  ease: [0.6, -0.05, 0.01, 1.4],
                }, // ← animación solo para escala
              }}
              viewport={{ once: false, amount: 0.5 }}
              className={`
                max-w-2xl w-full p-6 rounded-lg shadow-xl text-white 
                bg-white/10 backdrop-blur-md mx-auto 
                ${card.isTextOnly ? "text-center" : ""}
              `}
            >
              {/* 🎞️ Imagen o video */}
              {!card.isTextOnly && (card.image || card.video) && (
                card.video ? (
                  <video
                    src={card.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={card.style}
                    className="rounded mb-4 object-cover"
                  />
                ) : (
                  <img
                    src={card.image}
                    alt={card.title}
                    style={card.style}
                    className="rounded mb-4 object-cover"
                  />
                )
              )}

              {/* 📖 Texto */}
              <h2 className="text-4xl font-bold text-[#d7d9d9] mb-4">{card.title}</h2>
              <p className="text-[#d7d9d9] text-xl">{card.description}</p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
