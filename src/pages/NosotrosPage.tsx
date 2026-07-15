import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, BookOpen, Users, Award, TrendingUp, Target, Heart, Shield, Globe, Sparkles, Zap } from "lucide-react";

const stats = [
  { icon: Users, value: "2,500+", label: "Alumnos", color: "from-blue-500 to-blue-600" },
  { icon: BookOpen, value: "4", label: "Cursos", color: "from-purple-500 to-purple-600" },
  { icon: Award, value: "95%", label: "Éxito", color: "from-accent to-accent-dark" },
  { icon: TrendingUp, value: "$30M+", label: "Generados", color: "from-emerald-500 to-emerald-600" },
];

const pilares = [
  { icon: BookOpen, title: "Formación Práctica", desc: "Cursos con proyectos reales, no solo teoría. Aprendes haciendo y generando ingresos desde el primer día.", color: "from-blue-500 to-blue-600" },
  { icon: Users, title: "Comunidad Activa", desc: "Red de más de 2,500 importadores que se apoyan mutuamente, comparten proveedores y estrategias.", color: "from-purple-500 to-purple-600" },
  { icon: TrendingUp, title: "Resultados Reales", desc: "Nuestros alumnos generan ingresos reales desde el primer mes. No prometemos, demostramos.", color: "from-emerald-500 to-emerald-600" },
  { icon: Target, title: "Enfoque en Perú", desc: "Todo nuestro conocimiento está adaptado a la realidad peruana: normativas, proveedores y mercado local.", color: "from-orange-500 to-orange-600" },
  { icon: Heart, title: "Compromiso", desc: "No solo vendemos cursos, creamos relaciones. Tu éxito es nuestro éxito.", color: "from-pink-500 to-pink-600" },
  { icon: Shield, title: "Confianza", desc: "Transparencia total en cada proceso. Sabes exactamente qué compras y qué obtienes.", color: "from-cyan-500 to-cyan-600" },
];

const timeline = [
  { year: "2019", title: "Nacimiento", desc: "RRS IMPORT Academy nace con la misión de democratizar las importaciones en Latinoamérica." },
  { year: "2020", title: "Crecimiento", desc: "Alcanzamos nuestros primeros 500 alumnos y lanzamos nuestro programa de mentoría personalizada." },
  { year: "2022", title: "Expansión", desc: "Abrimos operaciones en Perú y adaptamos nuestros cursos al mercado peruano." },
  { year: "2024", title: "Consolidación", desc: "Más de 2,500 alumnos exitosos y una comunidad que no para de crecer." },
  { year: "2026", title: "Actualidad", desc: "Continuamos innovando y expandiendo nuestra oferta de cursos con los mejores proveedores." },
];

export default function NosotrosPage() {
  return (
    <div className="pt-20">
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-6 backdrop-blur-sm border border-accent/30">
            <Sparkles className="text-accent" size={16} />
            <span className="text-accent text-sm font-bold">Conócenos</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Sobre <span className="text-accent">Nosotros</span>
          </h1>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            Transformando emprendedores en importadores exitosos desde 2019. 
            Tu éxito es nuestra misión.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-bg border-b border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">
              <div className={`w-14 h-14 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                <s.icon className="text-white" size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white">{s.value}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full">
              <span className="text-accent text-xs font-bold">Nuestra Historia</span>
            </div>
            <h2 className="text-4xl font-extrabold text-primary dark:text-white leading-tight">
              Nacimos para ayudarte a <span className="text-accent">importar con éxito</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              RRS IMPORT Academy nació de la frustración de ver cómo muchos emprendedores querían importar productos desde Estados Unidos pero no sabían por dónde empezar.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              Creamos una metodología práctica que ha ayudado a más de 2,500 personas a crear sus negocios de importación, generando ingresos reales desde el primer mes.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                "Metodología 100% práctica",
                "Basada en casos reales",
                "Soporte continuo",
                "Comunidad activa",
                "Precios accesibles",
                "Clases 100% remotas",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="text-accent flex-shrink-0" size={16} />
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <img src="/imagenes/logo.png" alt="RRS IMPORT Academy" className="rounded-3xl shadow-2xl w-full object-contain h-64 sm:h-80 md:h-96 bg-gray-50 dark:bg-dark-card p-8" />
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-accent to-accent-dark rounded-2xl shadow-2xl p-4 sm:p-6 text-white">
              <div className="text-2xl sm:text-4xl font-extrabold">+2,500</div>
              <p className="text-white/80 text-xs sm:text-sm font-medium">Alumnos exitosos</p>
            </div>
            <div className="absolute top-4 right-4 bg-white dark:bg-dark-card rounded-2xl shadow-xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <Zap className="text-emerald-600" size={20} />
              </div>
              <div>
                <p className="font-bold text-primary dark:text-white text-sm">+2,500</p>
                <p className="text-gray-400 text-[10px]">Alumnos activos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full mb-4">
              <span className="text-accent text-xs font-bold">Lo que nos define</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white">Nuestros Pilares</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pilares.map((v) => (
              <div key={v.title} className="group bg-white dark:bg-dark-bg rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${v.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <v.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-primary dark:text-white mb-2">{v.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full mb-4">
              <span className="text-accent text-xs font-bold">Nuestro Camino</span>
            </div>
            <h2 className="text-4xl font-extrabold text-primary dark:text-white">Nuestra Trayectoria</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-accent-dark -translate-x-1/2 hidden md:block" />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <div key={t.year} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="flex-1 text-center md:text-right">
                    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-white/10 inline-block hover:shadow-xl transition-all">
                      <div className="text-accent font-extrabold text-lg mb-1">{t.year}</div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">{t.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{t.desc}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg z-10 flex-shrink-0">
                    <span className="text-white font-bold text-sm">{t.year.slice(2)}</span>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-accent to-accent-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            ¿Listo para empezar a importar?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Únete a más de 2,500 personas que ya transformaron su negocio. 
            Tu primer curso te espera.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cursos" className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-accent rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl">
              Ver Cursos <ArrowRight className="ml-2" size={20} />
            </Link>
            <a href="https://wa.me/51983342745" target="_blank" rel="noopener" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg border border-white/20 transition-all backdrop-blur-sm">
              <Globe className="mr-2" size={20} /> Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
