import { useState } from "react";
import { Check, ArrowRight, Star, Users, Clock, Award, Target, Video, MessageCircle, BookOpen, Gift } from "lucide-react";
import PaymentModal from "../components/PaymentModal";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const beneficios = [
  { icon: Video, titulo: "Sesiones 1 a 1", desc: "Videollamadas personalizadas donde resolvemos tus dudas en tiempo real." },
  { icon: Target, titulo: "Plan Personalizado", desc: "Estrategia adaptada a tu negocio y objetivos específicos de importación." },
  { icon: MessageCircle, titulo: "Soporte Directo", desc: "Acceso directo por WhatsApp para consultas urgentes durante el proceso." },
  { icon: BookOpen, titulo: "Recursos Exclusivos", desc: "Plantillas, listas de proveedores y guías que no están en el curso general." },
  { icon: Users, titulo: "Networking", desc: "Conecta con otros emprendedores importadores de alto nivel." },
  { icon: Award, titulo: "Resultados Garantizados", desc: "Te acompañamos hasta que completes tu primera importación exitosa." },
];

const grupos = [
  { nombre: "Free RRS", desc: "Comunidad gratuita de importadores", url: "https://chat.whatsapp.com/EasOtb7DoKdHULEkRfGA7K?mode=gi_t", color: "from-green-500 to-green-600" },
  { nombre: "Compra y Venta", desc: "Grupo de compraventa de productos", url: "https://chat.whatsapp.com/Im6cRaZRo2ZLJXzBfL7xhc?mode=gi_t", color: "from-blue-500 to-blue-600" },
];

const pasos = [
  { num: 1, titulo: "Elige tu plan", desc: "Selecciona el plan que mejor se adapte a tus necesidades y objetivos." },
  { num: 2, titulo: "Agenda tu sesión", desc: "Coordina el horario que mejor te funcione por WhatsApp." },
  { num: 3, titulo: "Prepara tus dudas", desc: "Escribe todas tus preguntas para aprovechar al máximo la sesión." },
  { num: 4, titulo: "¡A importar!", desc: "Implementa lo aprendido y recibe seguimiento personalizado." },
];

export default function Mentorias() {
  const [payOpen, setPayOpen] = useState(false);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent via-accent-dark to-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">100% Personalizado</span>
                <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full">Acompañamiento Total</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Mentorías <span className="text-white">Personalizadas</span>
              </h1>
              <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">
                Recibe asesoría 1 a 1 con expertos en importación. 
                Resuelve tus dudas, optimiza tus costos y arranca tu negocio con confianza.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Users size={14} className="text-white" /> <span>+500 mentoreados</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Clock size={14} className="text-white" /> <span>Sesiones flexibles</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Star size={14} className="text-white fill-white" /> <span>5.0/5</span>
                </div>
              </div>
              <a href="#plan" className="px-8 py-4 bg-white hover:bg-gray-100 text-accent rounded-xl font-extrabold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl inline-flex items-center gap-2">
                Ver Plan <ArrowRight size={16} />
              </a>
            </div>
            <div className="relative hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-6">¿Por qué mentoría?</h3>
                <ul className="space-y-4">
                  {[
                    "Evita errores que cuestan dinero",
                    "Acelera tu aprendizaje 10x",
                    "Acceso a contactos exclusivos",
                    "Soporte mientras importas",
                  ].map((f, i) => (
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
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-primary dark:text-white mb-12">¿Qué incluye la mentoría?</h2>
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

      {/* Plan + Grupos Gratis */}
      <section id="plan" className="py-16 bg-gray-50 dark:bg-dark-card transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-primary dark:text-white mb-12">Nuestro Plan</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Plan Importación */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-dark-bg rounded-3xl p-8 border-2 border-accent shadow-lg shadow-accent/10 relative h-full">
                <div className="absolute -top-4 left-8 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full">PLAN PRINCIPAL</div>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Target className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary dark:text-white text-2xl mb-2">Curso de Importación</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Todo lo que necesitas para empezar a importar desde USA</p>
                    <div className="mb-6">
                      <span className="text-4xl font-extrabold text-accent">S/ 99</span>
                      <span className="text-gray-400 text-sm ml-2">pago único</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {[
                        "Acceso a viajeros desde $35 USD",
                        "Courier exclusivo $8 x KG",
                        "Asesoría completa en importación",
                        "Lista de productos rentables",
                        "Grupo VIP de importadores",
                        "Certificado de finalización",
                      ].map((f, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <Check size={14} className="text-green-500 flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setPayOpen(true)}
                      className="w-full sm:w-auto px-8 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
                    >
                      Inscribirme Ahora <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grupos Gratuitos */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-bg rounded-3xl p-6 border border-gray-100 dark:border-white/10 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <Gift className="text-green-600" size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary dark:text-white">Grupos Gratuitos</h3>
                    <p className="text-gray-400 text-xs">Únete gratis</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {grupos.map((g, i) => (
                    <a
                      key={i}
                      href={g.url}
                      target="_blank"
                      rel="noopener"
                      className="group flex items-center gap-3 p-4 bg-gray-50 dark:bg-dark-card rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100 dark:border-white/10 hover:border-green-300"
                    >
                      <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all overflow-hidden flex-shrink-0">
                        <img src="/imagenes/logo.png" alt="RRS Import" className="w-9 h-9 object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-primary dark:text-white text-sm">{g.nombre}</p>
                        <p className="text-gray-400 text-[10px]">{g.desc}</p>
                      </div>
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all flex-shrink-0">
                        <WhatsAppIcon />
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-accent/5 rounded-xl border border-accent/20">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    <span className="font-bold text-accent">+1,200 miembros</span> ya forman parte de nuestra comunidad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-primary dark:text-white mb-12">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pasos.map((p, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">{p.num}</div>
                <h3 className="font-bold text-primary dark:text-white mb-2">{p.titulo}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-accent to-accent-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">¿Necesitas ayuda personalizada?</h2>
          <p className="text-white/70 text-sm mb-8">Agenda una mentoría y empieza a importar con confianza.</p>
          <a href="#plan" className="px-10 py-4 bg-white hover:bg-gray-100 text-accent rounded-xl font-extrabold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl inline-flex items-center gap-2">
            Ver Plan <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} curso={{ titulo: "Curso de Importación", precio: "S/ 99" }} />
    </div>
  );
}
