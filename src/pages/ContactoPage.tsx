import Contacto from "../components/Contacto";

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Contacto</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">¿Listo para empezar tu negocio de importación?</p>
        </div>
      </section>
      <Contacto />
    </div>
  );
}
