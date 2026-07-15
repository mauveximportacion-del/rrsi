import { Package, Truck, CheckCircle, ArrowRight } from "lucide-react";

const pasos = [
  {
    imagen: "/imagenes/llegadaalmacen1.jfif",
    icono: Package,
    titulo: "Llegada al Almacén",
    descripcion:
      "Tus productos llegan a nuestro almacén en Estados Unidos. Verificamos cada paquete, lo fotografiamos y lo registramos en nuestro sistema para que puedas dar seguimiento en tiempo real.",
  },
  {
    imagen: "/imagenes/almacen.jfif",
    icono: Package,
    titulo: "Almacenamiento Seguro",
    descripcion:
      "Todos tus productos quedan resguardados en nuestro almacén con seguridad 24/7. Aquí se consolidan los pedidos de cada alumno para optimizar costos de envío.",
  },
  {
    imagen: "/imagenes/cajas1.jfif",
    icono: Package,
    titulo: "Preparación del Envío",
    descripcion:
      "Empaquetamos y aseguramos tu mercadería en cajas reforzadas. Cada envío es documentado con fotos antes de ser sellado para tu tranquilidad.",
  },
  {
    imagen: "/imagenes/pruebamercaderia.jfif",
    icono: Package,
    titulo: "Verificación de Mercadería",
    descripcion:
      "Revisamos y verificamos que toda tu mercadería esté en perfecto estado antes de ser enviada. Cada producto es contado y validado contra tu orden de compra.",
  },
  {
    imagen: "/imagenes/mercaderiaabiertacajas.jfif",
    icono: Package,
    titulo: "Consolidación en Cajas",
    descripcion:
      "Organizamos y agrupamos los productos de cada alumno en cajas etiquetadas. Esto permite reducir costos de envío y garantizar que recibas todo lo que te corresponde.",
  },
  {
    imagen: "/imagenes/llegadamercaderia.jfif",
    icono: Truck,
    titulo: "Envío a Peru",
    descripcion:
      "Tu pedido viaja desde Estados Unidos directamente a Lima, Peru. Te proporcionamos el tracking para que sepas exactamente en qué etapa está tu mercadería.",
  },
  {
    imagen: "/imagenes/llegadaashalom.jfif",
    icono: CheckCircle,
    titulo: "Entrega en Peru",
    descripcion:
      "Una vez en Peru, coordinamos la entrega de tu mercadería. Recibes tu producto en la comodidad de tu hogar listo para vender o usar.",
  },
];

export default function Almacenes() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-bold text-sm uppercase tracking-wider">
            Almacén & Logística
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-primary dark:text-white">
            ¿Cómo llega tu mercadería a Peru?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Un proceso completo de importación, desde que tu producto llega a nuestro almacén en
            Estados Unidos hasta que lo recibes en tus manos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pasos.map((paso, i) => (
            <div
              key={i}
              className="group relative bg-white dark:bg-dark-bg rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={paso.imagen}
                  alt={paso.titulo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                  <paso.icono className="text-white" size={18} />
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-white/90 dark:bg-dark-bg/90 text-primary dark:text-white text-[10px] font-bold rounded-lg backdrop-blur-sm">
                    Paso {i + 1}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-primary dark:text-white mb-2 group-hover:text-accent transition-colors text-sm">
                  {paso.titulo}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  {paso.descripcion}
                </p>
              </div>
              {i < pasos.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 w-7 h-7 bg-accent rounded-full items-center justify-center shadow-lg">
                  <ArrowRight className="text-white" size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
