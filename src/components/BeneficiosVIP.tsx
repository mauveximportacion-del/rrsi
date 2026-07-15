import { useState } from "react";
import { Crown, Check, Truck, Shield, Package, Users, Star, Phone, Wrench, Heart, BookOpen, Scale, ShoppingBag, Zap, ArrowRight } from "lucide-react";

const beneficios = [
  { icono: Shield, titulo: "Almacén 0% Tax", desc: "Libre de impuestos en tu almacenamiento", color: "from-blue-500 to-blue-600" },
  { icono: Truck, titulo: "Entrega 4-5 días", desc: "Rápido envío a todo el Perú", color: "from-green-500 to-green-600" },
  { icono: Package, titulo: "$9/kg + $3 desad.", desc: "Precios manejables por volumen", color: "from-accent to-accent-dark" },
  { icono: ShoppingBag, titulo: "Proveedores Mayoristas", desc: "Acceso directo a precios bajos", color: "from-purple-500 to-purple-600" },
  { icono: Star, titulo: "Proveedores Confiables", desc: "Lista verificada de todo rubro", color: "from-yellow-500 to-orange-500" },
  { icono: Users, titulo: "Personal Shopper", desc: "Te ayudamos a comprar", color: "from-pink-500 to-pink-600" },
  { icono: Zap, titulo: "Viajeros de Confianza", desc: "Envíos seguros por vía terrestre", color: "from-cyan-500 to-cyan-600" },
  { icono: Package, titulo: "Compras Consolidadas", desc: "Unimos tus pedidos para ahorrar", color: "from-indigo-500 to-indigo-600" },
  { icono: Phone, titulo: "Lista Blanca Móviles", desc: "Contactos para equipos celulares", color: "from-emerald-500 to-emerald-600" },
  { icono: Phone, titulo: "Cajas de iPhone", desc: "Contacto directo para Apple y más", color: "from-gray-700 to-gray-800" },
  { icono: Wrench, titulo: "Servicio Técnico", desc: "Red de confianza para reparaciones", color: "from-red-500 to-red-600" },
  { icono: Heart, titulo: "Soporte de Por Vida", desc: "Siempre estaremos para ayudarte", color: "from-rose-500 to-rose-600" },
  { icono: BookOpen, titulo: "Acompañamiento", desc: "Guiamos tus primeras importaciones", color: "from-teal-500 to-teal-600" },
  { icono: Scale, titulo: "Normativas Aduaneras", desc: "Asesoría en regulaciones legales", color: "from-amber-600 to-amber-700" },
];

export default function BeneficiosVIP() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary via-primary-light to-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-4 backdrop-blur-sm border border-accent/30">
            <Crown className="text-accent" size={18} />
            <span className="text-accent text-sm font-bold">Beneficios Exclusivos</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Comunidad <span className="text-accent">VIP</span>
          </h2>
          <p className="text-white/60 text-lg">
            Accede a beneficios que transformarán tu negocio de importación
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {beneficios.map((b, i) => (
            <div
              key={i}
              className="group relative"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 transition-all duration-300 cursor-default h-full ${
                hovered === i ? "bg-white/20 border-accent/50 scale-105 shadow-xl shadow-accent/20" : "hover:bg-white/15"
              }`}>
                <div className={`w-12 h-12 bg-gradient-to-br ${b.color} rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                  hovered === i ? "scale-110 rotate-6" : ""
                }`}>
                  <b.icono className="text-white" size={22} />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{b.titulo}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{b.desc}</p>
                <div className={`absolute top-3 right-3 transition-all duration-300 ${
                  hovered === i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                }`}>
                  <Check size={14} className="text-accent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://wa.me/51983342745?text=Hola,%20quiero%20unirme%20a%20la%20Comunidad%20VIP"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/30"
          >
            <Crown size={20} /> Unirme a la Comunidad VIP
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
