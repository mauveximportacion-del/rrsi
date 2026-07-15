import { useState } from "react";
import { Check, Users, ArrowRight, Star } from "lucide-react";
import PaymentModal from "../components/PaymentModal";
import ComunidadModal from "../components/ComunidadModal";

const cursos = [
  {
    id: 1,
    titulo: "Importación",
    descripcion: "Aprende todo el proceso de importación desde Estados Unidos a Latinoamérica paso a paso. Incluye acceso a viajeros, courier $8 x KG y asesoría personalizada.",
    imagen: "/imagenes/almacen.jfif",
    features: [
      "Acceso a viajeros desde $35 USD",
      "Courier exclusivo $8 x KG",
      "Asesoría completa en importación",
      "Lista de productos rentables",
      "Grupo VIP de importadores",
    ],
    precioOriginal: null,
    precioFinal: "S/ 99",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    titulo: "Proveedores",
    descripcion: "Accede a nuestra base exclusiva de proveedores verificados en USA. Conecta directamente con fabricantes y mayoristas confiables.",
    imagen: "/imagenes/cajas1.jfif",
    features: [
      "Base de datos de proveedores USA",
      "Fabricantes verificados",
      "Mayoristas confiables",
      "Actualización mensual",
      "Soporte prioritario",
    ],
    precioOriginal: null,
    precioFinal: "S/ 29",
    color: "from-purple-500 to-purple-600",
  },
];

export default function CatalogoPage() {
  const [payOpen, setPayOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState<{ titulo: string; precio: string } | null>(null);
  const [comunidadOpen, setComunidadOpen] = useState(false);

  const openPay = (c: { titulo: string; precio: string }) => {
    setSelectedCurso(c);
    setPayOpen(true);
  };

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Catálogo de Cursos</h1>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">100% Remoto</span>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">Para todo el Perú</span>
            <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">Tarifas de Viajero desde $35</span>
          </div>
          <p className="text-white/80 text-sm max-w-2xl mx-auto">Todos nuestros cursos de importación. Accesibles desde Lima, provincias y cualquier departamento.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cursos.map((c) => (
              <div key={c.id} className="bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="relative h-44 overflow-hidden">
                  <img src={c.imagen} alt={c.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 bg-gradient-to-r ${c.color} text-white text-xs font-extrabold rounded-lg shadow-lg`}>
                      {c.titulo}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between">
                      <div>
                        {c.precioOriginal && <span className="text-white/60 text-sm line-through">{c.precioOriginal}</span>}
                        <div className="text-3xl font-extrabold text-white">{c.precioFinal}</div>
                      </div>
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Star size={12} className="text-accent fill-accent" />
                        <span className="text-white text-xs font-bold">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">{c.descripcion}</p>

                  <ul className="space-y-3 mb-6">
                    {c.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={10} className="text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openPay({ titulo: c.titulo, precio: c.precioFinal })}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white rounded-xl font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/20"
                  >
                    Pagar ahora <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} curso={selectedCurso} />
      <ComunidadModal open={comunidadOpen} onClose={() => setComunidadOpen(false)} />

      <button
        onClick={() => setComunidadOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-green-500/30 transition-all hover:scale-105 active:scale-95 group"
      >
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
          <Users size={20} />
        </div>
        <div className="text-left">
          <p className="font-extrabold text-sm leading-tight">Comunidad</p>
          <p className="text-green-100 text-[10px] font-medium">Gratis</p>
        </div>
      </button>
    </div>
  );
}
