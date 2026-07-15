import { useState } from "react";
import { HelpCircle, Search, ChevronDown, MessageCircle } from "lucide-react";
import { faq } from "../data";

const cats = [
  { id: null, label: "Todas" },
  { id: "cursos", label: "Cursos" },
  { id: "negocio", label: "Negocio" },
  { id: "pagos", label: "Pagos" },
  { id: "legal", label: "Legal" },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [cat, setCat] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const filtered = faq.filter((f) => {
    const matchCat = cat ? f.categoria === cat : true;
    const matchQ = f.pregunta.toLowerCase().includes(q.toLowerCase()) || f.respuesta.toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-accent font-bold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-primary dark:text-white">Preguntas Frecuentes</h2>
        </div>

        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar pregunta..." className="w-full pl-11 pr-4 py-3 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-gray-800 dark:text-gray-200 transition-all" />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c.id ?? "all"} onClick={() => setCat(c.id)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                cat === c.id ? "bg-accent text-white shadow-md scale-105" : "bg-white dark:bg-dark-bg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
              }`}>{c.label}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((f) => (
            <div key={f.id} className="bg-white dark:bg-dark-bg rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-all">
              <button onClick={() => setOpen(open === f.id ? null : f.id)} className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${open === f.id ? "bg-accent/10" : "bg-gray-100 dark:bg-white/5"}`}>
                    <HelpCircle className={open === f.id ? "text-accent" : "text-gray-300 dark:text-white/20 group-hover:text-accent transition-colors"} size={18} />
                  </div>
                  <span className="font-bold text-primary dark:text-white text-sm group-hover:text-accent transition-colors">{f.pregunta}</span>
                </div>
                <ChevronDown className={`transition-transform duration-300 ${open === f.id ? "rotate-180 text-accent" : "text-gray-300 dark:text-white/20"}`} size={20} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === f.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 text-sm border-t dark:border-white/10 pt-4 leading-relaxed">{f.respuesta}</div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-gray-400 py-12">Sin resultados.</p>}
        </div>

        <div className="mt-10 text-center">
          <a href="https://wa.me/51983342745" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
            <MessageCircle size={18} /> ¿No encontraste tu pregunta? Escríbenos
          </a>
        </div>
      </div>
    </section>
  );
}
