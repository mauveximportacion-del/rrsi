import FAQ from "../components/FAQ";

export default function FAQPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Preguntas Frecuentes</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Resolvemos tus dudas sobre nuestros cursos de importación.</p>
        </div>
      </section>
      <FAQ />
    </div>
  );
}
