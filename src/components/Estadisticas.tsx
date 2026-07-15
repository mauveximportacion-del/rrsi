import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 40);
        const iv = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(iv); }
          else setCount(start);
        }, 30);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-accent mb-2">{prefix}{count.toLocaleString()}{suffix}</div>;
}

export default function Estadisticas() {
  const stats = [
    { valor: 2500, suffix: "+", label: "Alumnos formados" },
    { valor: 4, suffix: "", label: "Cursos disponibles" },
    { valor: 30, suffix: "M+", label: "Generados por alumnos", prefix: "$" },
    { valor: 49, suffix: ".9/5", label: "Calificación promedio" },
  ];

  return (
    <section className="py-14 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center group cursor-default">
              <AnimatedNumber target={s.valor} suffix={s.suffix} prefix={(s as any).prefix || ""} />
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium group-hover:text-accent transition-colors">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
