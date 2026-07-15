import { Clock, Shield, DollarSign, Headphones, TrendingUp, Award } from "lucide-react";

const items = [
  { icon: TrendingUp, title: "Ganancias Reales", desc: "Márgenes del 30-80% en cada importación" },
  { icon: DollarSign, title: "Baja Inversión", desc: "Empieza con $500 USD y escala" },
  { icon: Clock, title: "A tu Ritmo", desc: "Cursos 100% online, estudia cuando quieras" },
  { icon: Headphones, title: "Soporte Total", desc: "Mentoría y comunidad de apoyo" },
  { icon: Shield, title: "Sin Riesgos", desc: "Garantía de devolución en 30 días" },
  { icon: Award, title: "Certificado", desc: "Acredita tu formación profesional" },
];

export default function Beneficios() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-bold text-sm uppercase tracking-wider">Beneficios</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-primary dark:text-white">¿Por qué aprender con nosotros?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((b) => (
            <div key={b.title} className="bg-white dark:bg-dark-bg rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100 dark:border-white/10 cursor-default">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:rotate-12 transition-all duration-300">
                <b.icon className="text-accent group-hover:text-white transition-colors" size={22} />
              </div>
              <h3 className="text-lg font-bold text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">{b.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
