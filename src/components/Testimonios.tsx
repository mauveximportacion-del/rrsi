import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, TrendingUp } from "lucide-react";
import { testimonios } from "../data";

export default function Testimonios() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? "next" : "prev");
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    setDirection("next");
    setCurrent((p) => (p + 1) % testimonios.length);
  }, []);

  const prev = useCallback(() => {
    setDirection("prev");
    setCurrent((p) => (p - 1 + testimonios.length) % testimonios.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, next]);

  const t = testimonios[current];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-dark-bg transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold text-sm uppercase tracking-wider">Testimonios</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-primary dark:text-white">Historias de éxito reales</h2>
        </div>

        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden min-h-[280px] sm:min-h-[320px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

            <div
              key={current}
              className={`relative ${
                direction === "next"
                  ? "animate-slideInRight"
                  : "animate-slideInLeft"
              }`}
            >
              <Quote className="text-accent/30 w-16 h-16 mb-6" />
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 font-medium">
                &ldquo;{t.texto}&rdquo;
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.nombre}
                    className="w-14 h-14 rounded-full object-cover border-2 border-accent shadow-lg"
                  />
                  <div>
                    <h4 className="font-bold text-white">{t.nombre}</h4>
                    <p className="text-white/50 text-sm">{t.empresa}</p>
                  </div>
                </div>
                {t.resultado && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-xl backdrop-blur-sm">
                    <TrendingUp className="text-accent" size={16} />
                    <span className="text-accent text-sm font-bold">{t.resultado}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full bg-accent transition-all duration-[4000ms] ease-linear"
                style={{
                  width: isPlaying ? "100%" : "0%",
                  transition: isPlaying ? "width 4s linear" : "none",
                }}
                key={`progress-${current}`}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-primary dark:bg-accent hover:bg-primary-light dark:hover:bg-accent-dark text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonios.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === current
                      ? "w-8 bg-accent"
                      : "w-2.5 bg-gray-300 dark:bg-white/20 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-primary dark:bg-accent hover:bg-primary-light dark:hover:bg-accent-dark text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
