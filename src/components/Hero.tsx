import { Link } from "react-router-dom";
import { ArrowRight, Package, Sparkles, BookOpen, Users, Calculator } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
      <img src="/imagenes/almacen.jfif" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary-light/80" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 w-full">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full backdrop-blur-sm border border-accent/30 animate-pulse">
              <Sparkles className="text-accent" size={16} />
              <span className="text-accent text-sm font-semibold">Importaciones de Estados Unidos</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full backdrop-blur-sm border border-green-400/30">
              <span className="text-green-300 text-sm font-semibold">Clases 100% Remotas</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
              <span className="text-white text-sm font-semibold">Tarifas de Viajero desde $35</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            Importa productos de{" "}
            <span className="text-accent hover:scale-105 inline-block transition-transform">Estados Unidos</span>{" "}
            a tu negocio
          </h1>

          <p className="text-lg text-white/75 max-w-2xl mb-8 leading-relaxed">
            Teléfonos, electrónica, perfumería, ropa y más. Aprende a importar
            productos variados con los mejores márgenes de ganancia.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Link to="/cursos" className="inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold text-sm sm:text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25 active:scale-95">
              Ver Cursos <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link to="/tarifarios" className="inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/25">
              <Calculator className="mr-2" size={18} /> Simular Importación
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
            {[
              { icon: Users, value: "2,500+", label: "Alumnos" },
              { icon: Package, value: "4", label: "Cursos" },
              { icon: BookOpen, value: "95%", label: "Éxito" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 group cursor-default">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                  <s.icon className="text-accent group-hover:text-white transition-colors" size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-dark-bg to-transparent transition-colors duration-300" />
    </section>
  );
}
