import { useEffect, useRef } from "react";

const empresas = [
  { nombre: "Apple", logo: "/imagenes/logoapple.svg" },
  { nombre: "Nike", logo: "/imagenes/nike.png" },
  { nombre: "Adidas", logo: "/imagenes/adidas.png" },
  { nombre: "Amazon", logo: "/imagenes/amazon.svg" },
  { nombre: "eBay", logo: "/imagenes/ebay.svg" },
  { nombre: "Guess", logo: "/imagenes/GUESS.png" },
  { nombre: "Lattafa", logo: "/imagenes/lattafa.png" },
  { nombre: "Invicta", logo: "/imagenes/invicta.png" },
  { nombre: "Cristo Fragancias", logo: "/imagenes/cristofragancias.png" },
  { nombre: "Oriental Aroma", logo: "/imagenes/orientalaromawholesale.svg" },
];

export default function Marcas() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let speed = 0.5;

    const animate = () => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += speed;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(animate); };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="py-12 bg-gray-50 dark:bg-dark-card border-y border-gray-100 dark:border-white/10 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-widest mb-6 font-bold">Empresas con las que trabajamos</p>

        <div ref={scrollRef} className="flex gap-10 overflow-hidden whitespace-nowrap" style={{ scrollbarWidth: "none" }}>
          {[...empresas, ...empresas].map((e, i) => (
            <div key={`${e.nombre}-${i}`} className="flex-shrink-0 flex items-center justify-center w-24 h-14 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 cursor-default group">
              <img src={e.logo} alt={e.nombre} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
