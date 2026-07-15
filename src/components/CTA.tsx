import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-primary to-primary-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
          ¿Listo para empezar a importar?
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          Únete a más de 2,500 personas que ya crearon su negocio de importación. 
          Tu primer curso te espera.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/cursos" className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-accent/25">
            Ver Cursos <ArrowRight className="ml-2" size={20} />
          </Link>
          <a href="https://wa.me/51983342745" target="_blank" rel="noopener" className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-green-500/25">
            <MessageCircle className="mr-2" size={20} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
