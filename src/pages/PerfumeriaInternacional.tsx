import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Star, Users, Clock, Award, Sparkles, Shield, Truck, Globe } from "lucide-react";
import PaymentModal from "../components/PaymentModal";

const beneficios = [
  { icon: Sparkles, titulo: "Perfumes Exclusivos", desc: "Importa perfumes de marcas internacionales directamente desde proveedores verificados en USA." },
  { icon: Shield, titulo: "Autenticidad Garantizada", desc: "Aprende a verificar la originalidad de cada producto y evitar falsificaciones." },
  { icon: Truck, titulo: "Envío Seguro", desc: "Logística especializada para productos frágiles con empaque premium." },
  { icon: Globe, titulo: "Marcas Globales", desc: "Accede a marcas como Chanel, Dior, Tom Ford y más a precios mayoristas." },
  { icon: Users, titulo: "Red de Distribuidores", desc: "Conecta con otros importadores y crea tu red de distribución." },
  { icon: Award, titulo: "Certificado", desc: "Certificación que respalda tu formación en importación de perfumería." },
];

const modulos = [
  { titulo: "El Mercado de la Perfumería", temas: ["Tendencias globales", "Marcas más demandadas", "Análisis de mercado en Perú"] },
  { titulo: "Proveedores y Compras", temas: ["Mayoristas en USA", "Negociación de precios", "Pedidos mínimos"] },
  { titulo: "Logística Especializada", temas: ["Empaque seguro", "Courier con seguro", "Manejo de productos frágiles"] },
  { titulo: "Venta y Marketing", temas: ["Fotografía de productos", "Redes sociales", "Atención al cliente"] },
];

const testimonios = [
  { nombre: "María V.", texto: "Mi tienda de perfumes online creció un 200% después de aplicar lo que aprendí. Los proveedores son increíbles.", rating: 5 },
  { nombre: "Luis R.", texto: "Nunca pensé que podría importar perfumes de alta gana. Ahora tengo clientes fijos que repiten cada mes.", rating: 5 },
  { nombre: "Sofia G.", texto: "El curso es muy práctico. En el primer mes ya estaba recibiendo mi primer lote de perfumes desde Miami.", rating: 5 },
];

export default function PerfumeriaInternacional() {
  const [payOpen, setPayOpen] = useState(false);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">Alta Demanda</span>
                <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full">100% Remoto</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Perfumería <span className="text-yellow-300">Internacional</span>
              </h1>
              <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">
                Importa perfumes de marcas globales desde Estados Unidos. 
                Aprende a crear tu propio negocio de perfumería con márgenes de ganancia de hasta el 300%.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Users size={14} className="text-yellow-300" /> <span>+800 alumnos</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Clock size={14} className="text-yellow-300" /> <span>10 horas</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Star size={14} className="text-yellow-300 fill-yellow-300" /> <span>4.8/5</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setPayOpen(true)} className="px-8 py-4 bg-white hover:bg-gray-100 text-purple-600 rounded-xl font-extrabold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2">
                  Inscribirme Ahora <ArrowRight size={16} />
                </button>
                <Link to="/faq" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                  Tengo dudas
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <span className="text-white/40 text-xs line-through">S/ 99</span>
                  <div className="text-4xl font-extrabold text-yellow-300">S/ 29</div>
                  <span className="text-white/60 text-xs">Pago único • Acceso de por vida</span>
                </div>
                <ul className="space-y-3">
                  {["Proveedores verificados de perfumes", "Logística para productos frágiles", "Asesoría de ventas", "Grupo VIP"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                      <Check size={14} className="text-green-400 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-primary dark:text-white mb-12">¿Qué aprenderás?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="p-6 bg-gray-50 dark:bg-dark-card rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <Icon size={22} className="text-purple-500 group-hover:text-white" />
                  </div>
                  <h3 className="font-bold text-primary dark:text-white mb-2">{b.titulo}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section className="py-16 bg-gray-50 dark:bg-dark-card transition-colors">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-primary dark:text-white mb-12">Contenido del Curso</h2>
          <div className="space-y-4">
            {modulos.map((m, i) => (
              <div key={i} className="bg-white dark:bg-dark-bg rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{i + 1}</div>
                  <h3 className="font-bold text-primary dark:text-white">{m.titulo}</h3>
                </div>
                <div className="mt-4 ml-14 flex flex-wrap gap-2">
                  {m.temas.map((t, j) => (
                    <span key={j} className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-primary dark:text-white mb-12">Lo que dicen nuestros alumnos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonios.map((t, i) => (
              <div key={i} className="bg-gray-50 dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">"{t.texto}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-500 font-bold text-xs">{t.nombre[0]}</div>
                  <span className="font-bold text-primary dark:text-white text-sm">{t.nombre}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">¿Listo para importar perfumes?</h2>
          <p className="text-white/70 text-sm mb-8">Únete a más de 800 alumnos que ya están vendiendo perfumes internacionales.</p>
          <button onClick={() => setPayOpen(true)} className="px-10 py-4 bg-white hover:bg-gray-100 text-purple-600 rounded-xl font-extrabold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl">
            Inscribirme por S/ 29
          </button>
        </div>
      </section>

      <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} curso={{ titulo: "Perfumería Internacional", precio: "S/ 29" }} />
    </div>
  );
}
