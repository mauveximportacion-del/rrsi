import { useState } from "react";
import { FileText, User, Building2, Briefcase, Check, ArrowRight } from "lucide-react";

const tipos = [
  {
    id: "dni",
    label: "DNI",
    icon: User,
    desc: "Persona natural",
    detail: "Importa productos para uso personal o pequeño comercio sin necesidad de RUC.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "ruc20",
    label: "RUC 20",
    icon: Building2,
    desc: "Persona jurídica",
    detail: "Importa a nombre de tu empresa con beneficios tributarios y facturación legal.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-500/30",
  },
  {
    id: "ruc10",
    label: "RUC 10",
    icon: Briefcase,
    desc: "Persona natural con negocio",
    detail: "Importa y vende legalmente. Ideal para emprendedores que están empezando.",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-500/30",
  },
];

export default function TipoDocumento() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = tipos.find((t) => t.id === selected);

  return (
    <section className="py-16 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-accent font-bold text-sm uppercase tracking-wider">Personaliza tu experiencia</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-primary dark:text-white">¿Qué tipo de documento tienes?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {tipos.map((t) => {
            const Icon = t.icon;
            const isActive = selected === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelected(isActive ? null : t.id)}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                  isActive
                    ? `${t.bg} ${t.border} shadow-lg scale-[1.03]`
                    : "bg-white dark:bg-dark-card border-gray-100 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-md"
                }`}
              >
                {isActive && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-bounce">
                    <Check size={14} className="text-white" />
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                  isActive ? `bg-gradient-to-br ${t.color} shadow-lg` : "bg-gray-100 dark:bg-white/5"
                }`}>
                  <Icon className={isActive ? "text-white" : "text-gray-400 dark:text-gray-500"} size={22} />
                </div>

                <h3 className={`font-extrabold text-lg mb-1 transition-colors ${isActive ? "text-primary dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                  {t.label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.desc}</p>
              </button>
            );
          })}
        </div>

        <div className={`overflow-hidden transition-all duration-500 ${active ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className={`${active?.bg} ${active?.border} border rounded-2xl p-5 flex items-start gap-4`}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${active?.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
              <FileText className="text-white" size={18} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-primary dark:text-white text-sm mb-1">Documento: {active?.label}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{active?.detail}</p>
            </div>
            <a href="https://wa.me/51983342745" target="_blank" rel="noopener" className="flex items-center gap-1 px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg font-bold text-xs transition-all hover:scale-105 active:scale-95 flex-shrink-0">
              Consultar <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
