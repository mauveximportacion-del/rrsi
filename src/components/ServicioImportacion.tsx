import { ShoppingCart, Warehouse, Truck, DollarSign, ArrowRight } from "lucide-react";

const pasos = [
  {
    imagen: "/imagenes/cliente1.jfif",
    icono: ShoppingCart,
    titulo: "Tú Compras",
    descripcion: "Realizas tu compra en la página o proveedor de confianza que prefieras.",
    color: "from-blue-500 to-blue-600",
  },
  {
    imagen: "/imagenes/almacen.jfif",
    icono: Warehouse,
    titulo: "Llega a Miami",
    descripcion: "Tu producto llega a nuestro almacén en Miami, EE.UU. Nos encargamos de recibirlo.",
    color: "from-accent to-accent-dark",
  },
  {
    imagen: "/imagenes/llegadaashalom.jfif",
    icono: Truck,
    titulo: "Enviamos a Peru",
    descripcion: "Nos encargamos de entregar tu producto con éxito directamente a tus manos.",
    color: "from-green-500 to-green-600",
  },
  {
    imagen: "/imagenes/cliente3.jfif",
    icono: DollarSign,
    titulo: "Genera Ingresos",
    descripcion: "Empieza a generar ingresos desde hoy con tu negocio de importación.",
    color: "from-purple-500 to-purple-600",
  },
];

export default function ServicioImportacion() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <span className="text-accent font-bold text-sm uppercase tracking-wider">Nuestro Servicio</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight">
            Compras de tu página o proveedor de confianza, <span className="text-accent">llega a nuestro almacén</span> en Miami
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            y nos encargamos de entregarte tu producto con éxito.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent-dark rounded-full">
            <span className="text-white font-extrabold text-lg">¡Empieza a generar ingresos desde hoy!</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-accent to-green-500 rounded-full -translate-y-1/2 z-0" />

          {pasos.map((paso, i) => (
            <div key={i} className="relative z-10 group">
              <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={paso.imagen}
                    alt={paso.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className={`absolute top-3 left-3 w-10 h-10 bg-gradient-to-br ${paso.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <paso.icono className="text-white" size={20} />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 bg-white/90 dark:bg-dark-bg/90 text-primary dark:text-white text-xs font-extrabold rounded-lg backdrop-blur-sm">
                      Paso {i + 1}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {paso.titulo}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              </div>
              {i < pasos.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 z-20 w-6 h-6 bg-accent rounded-full items-center justify-center shadow-lg -translate-y-1/2">
                  <ArrowRight className="text-white" size={12} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
