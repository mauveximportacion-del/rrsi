import { Pill, Sparkles, ArrowRight } from "lucide-react";

export default function Drogueria() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-pink-500 to-pink-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
              <Pill className="text-white" size={18} />
              <span className="text-white text-sm font-bold">Servicio Exclusivo</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Acceso a <span className="text-yellow-300">Droguería</span>
            </h2>
            <p className="text-white/80 text-lg mb-6 max-w-lg">
              Contamos con otra dirección exclusiva para la compra de maquillajes, cosméticos y productos de belleza. 
              Accede a precios especiales y proveedores directos.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Dirección exclusiva para maquillajes",
                "Precios mayoristas en cosméticos",
                "Marcas internacionales de belleza",
                "Envío seguro a nuestro almacén",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles size={10} className="text-white" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/51983342745?text=Hola,%20quiero%20información%20sobre%20el%20acceso%20a%20droguería"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-pink-600 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Más Información <ArrowRight size={16} />
            </a>
          </div>

          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src="/imagenes/almacen2.jfif" 
                alt="Droguería y Cosméticos" 
                className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 object-cover rounded-3xl shadow-2xl border-4 border-white/30"
              />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <Pill className="text-pink-500" size={20} />
                  <span className="font-extrabold text-primary text-sm">DROGUERÍA</span>
                </div>
                <p className="text-gray-400 text-[10px]">Maquillajes & Cosméticos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
