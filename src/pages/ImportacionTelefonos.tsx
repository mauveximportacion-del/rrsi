import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Star, Users, Clock, Award, Smartphone, Shield, Truck, Globe, Target } from "lucide-react";
import PaymentModal from "../components/PaymentModal";

const beneficios = [
  { icon: Smartphone, titulo: "Mercado de Teléfonos", desc: "Aprende a importar iPhone, Samsung, Xiaomi y más desde USA con los mejores precios." },
  { icon: Shield, titulo: "Garantía y Calidad", desc: "Conoce cómo verificar la autenticidad y calidad de cada dispositivo antes de vender." },
  { icon: Truck, titulo: "Logística Completa", desc: "Domina el envío desde Miami hasta Lima con courier especializado a $8 x KG." },
  { icon: Globe, titulo: "Proveedores Verificados", desc: "Accede a nuestra lista exclusiva de proveedores confiables en Estados Unidos." },
  { icon: Users, titulo: "Comunidad VIP", desc: "Únete a más de 2,500 importadores activos que comparten experiencias y oportunidades." },
  { icon: Award, titulo: "Certificado", desc: "Recibe un certificado que respalda tu formación en importación de teléfonos." },
  { icon: Target, titulo: "Personal Shopper", desc: "Te ayudamos a encontrar los mejores productos y precios en USA para tu negocio." },
  { icon: Users, titulo: "Contactos en Operadoras", desc: "Accede a contactos directos con operadoras para registrar equipos legalmente." },
];

const modulos = [
  { titulo: "Introducción a las Importaciones", temas: ["Marco legal en Perú", "Documentos necesarios", "Cálculo de costos totales"] },
  { titulo: "Proveedores en USA", temas: ["Cómo encontrar proveedores", "Negociación y precios", "Verificación de confiabilidad"] },
  { titulo: "Logística y Envío", temas: ["Courier $8 x KG", "Viajeros desde $35", "Seguimiento de paquetes"] },
  { titulo: "Desaduanaje y Entrega", temas: ["Proceso de aduanas", "Costos de desaduanaje", "Entrega final al cliente"] },
  { titulo: "Venta y Rentabilidad", temas: ["Precios de mercado", "Estrategias de venta", "Márgenes de ganancia"] },
];

const testimonios = [
  { nombre: "Carlos M.", texto: "Importé mi primer lote de iPhones y en 2 semanas ya tenía todo vendido. La asesoría fue clave.", rating: 5 },
  { nombre: "Ana L.", texto: "Las mentorías personalizadas me ayudaron a evitar errores costosos. Totalmente recomendado.", rating: 5 },
  { nombre: "Roberto S.", texto: "Ya van 6 meses importando teléfonos y mi negocio creció un 300%. Excelente curso.", rating: 5 },
];

export default function ImportacionTelefonos() {
  const [payOpen, setPayOpen] = useState(false);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full">Más Popular</span>
                <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full">100% Remoto</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Importación de <span className="text-accent">Teléfonos</span> desde USA
              </h1>
              <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">
                Aprende a importar iPhone, Samsung, Xiaomi y más desde Estados Unidos. 
                Conoce todo el proceso: desde encontrar proveedores hasta vender con altos márgenes de ganancia.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Users size={14} className="text-accent" /> <span>+1,200 alumnos</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Clock size={14} className="text-accent" /> <span>12 horas</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Star size={14} className="text-accent fill-accent" /> <span>4.9/5</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setPayOpen(true)} className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl font-extrabold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/30 flex items-center gap-2">
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
                  <span className="text-white/40 text-xs line-through">S/ 149</span>
                  <div className="text-4xl font-extrabold text-accent">S/ 99</div>
                  <span className="text-white/60 text-xs">Pago único • Acceso de por vida</span>
                </div>
                <ul className="space-y-3">
                  {["Acceso a viajeros desde $35 USD", "Courier exclusivo $8 x KG", "Asesoría completa", "Grupo VIP"].map((f, i) => (
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
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                    <Icon size={22} className="text-accent group-hover:text-white" />
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
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{i + 1}</div>
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
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-xs">{t.nombre[0]}</div>
                  <span className="font-bold text-primary dark:text-white text-sm">{t.nombre}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">¿Listo para empezar a importar?</h2>
          <p className="text-white/70 text-sm mb-8">Únete a más de 1,200 alumnos que ya están ganando dinero importando teléfonos desde USA.</p>
          <button onClick={() => setPayOpen(true)} className="px-10 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl font-extrabold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/30">
            Inscribirme por S/ 99
          </button>
        </div>
      </section>

      <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} curso={{ titulo: "Importación de Teléfonos", precio: "S/ 99" }} />
    </div>
  );
}
