import { Search, BookOpen, Rocket, Banknote } from "lucide-react";

const pasos = [
  { icon: Search, titulo: "Elige tu curso", desc: "Selecciona el programa que se adapte a tus metas y presupuesto." },
  { icon: BookOpen, titulo: "Aprende a tu ritmo", desc: "Accede a clases en video, guías prácticas y ejercicios reales." },
  { icon: Rocket, titulo: "Lanza tu negocio", desc: "Aplica lo aprendido con el acompañamiento de nuestros expertos." },
  { icon: Banknote, titulo: "Genera ingresos", desc: "Empieza a facturar con tu negocio de importación propio." },
];

export default function ComoFunciona() {
  return (
    <section className="py-16 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-bold text-sm uppercase tracking-wider">Metodología</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-primary dark:text-white">Cómo funciona</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pasos.map((p, i) => (
            <div key={p.titulo} className="relative bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">{i + 1}</div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:rotate-12 transition-all duration-300">
                <p.icon className="text-accent group-hover:text-white transition-colors" size={22} />
              </div>
              <h3 className="font-bold text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">{p.titulo}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
