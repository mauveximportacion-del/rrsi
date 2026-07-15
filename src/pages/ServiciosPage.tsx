import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cursos } from "../data";
import { Clock, Users } from "lucide-react";

export default function ServiciosPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Nuestros Programas</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Programas diseñados para llevar tu negocio de importación al siguiente nivel.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {cursos.map((c) => {
            return (
              <div key={c.id} className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img src={c.imagen} alt={c.titulo} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-lg">{c.nivel}</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg">{c.duracion}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-primary mb-3">{c.titulo}</h3>
                    <p className="text-gray-600 mb-6">{c.descripcion}</p>
                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1"><Clock size={16} />{c.duracion}</div>
                      <div className="flex items-center gap-1"><Users size={16} />{c.inscritos} inscritos</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-extrabold text-accent">{c.precio}</span>
                      <Link to="/contacto" className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold text-sm transition-all hover:scale-105">
                        Inscribirme <ArrowRight className="ml-2" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">¿No sabes cuál elegir?</h2>
          <p className="text-white/90 mb-8">Escríbenos y te ayudamos a encontrar el curso perfecto para tus objetivos.</p>
          <Link to="/contacto" className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-xl font-bold transition-all hover:scale-105">
            Contactar Asesor <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
