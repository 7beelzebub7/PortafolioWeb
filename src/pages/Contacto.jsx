import { useEffect, useRef } from "react";
import "./Contacto.css";

export default function Contacto() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = container.querySelectorAll(".card");

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      cards.forEach((card) => {
        const handleClick = (e) => {
          // Establece coordenadas al centro de la card
          card.style.setProperty("--mouse-x", `50%`);
          card.style.setProperty("--mouse-y", `50%`);

          card.classList.add("active-glow");

          // Remueve clase después de un tiempo
          setTimeout(() => {
            card.classList.remove("active-glow");
          }, 1000);
        };

        card.addEventListener("click", handleClick);
      });

      return () => {
        cards.forEach((card) => {
          card.removeEventListener("click", handleClick);
        });
      };
    } else {
      const handleMouseMove = (e) => {
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        });
      };

      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="cards-container bg-gradient-to-b from-[#0e1b26] to-[#223039]"
    >
      <a
        href="https://www.instagram.com/cumulonimbus.7?igsh=N244Zm1reGdzMjdz"
        target="_blank"
        rel="noopener noreferrer"
        className="card"
        style={{ "--glow-color": "#E1306C" }}
      >
        <img src="/images/instagram.svg" alt="Instagram" className="icon" />
      </a>

      <a
        href="https://github.com/7beelzebub7"
        target="_blank"
        rel="noopener noreferrer"
        className="card"
        style={{ "--glow-color": "#ffffff" }}
      >
        <img src="/images/github.svg" alt="GitHub" className="icon" />
      </a>

      <a
        href="https://www.behance.net/cumulonimbus"
        target="_blank"
        rel="noopener noreferrer"
        className="card"
        style={{ "--glow-color": "#1769FF" }}
      >
        <img src="/images/behance.svg" alt="Behance" className="icon" />
      </a>
    </div>
  );
}
