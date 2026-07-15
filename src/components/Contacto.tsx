import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", curso: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inscripción - ${form.curso}`);
    const body = encodeURIComponent(
      `Hola, me quiero inscribir.\n\n` +
      `Nombre: ${form.nombre}\n` +
      `Email: ${form.email}\n` +
      `Teléfono: ${form.telefono || "No proporcionado"}\n` +
      `Curso: ${form.curso}\n` +
      `Mensaje: ${form.mensaje || "Sin comentarios"}`
    );
    window.open(`mailto:rodolfoimport2003@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ nombre: "", email: "", telefono: "", curso: "", mensaje: "" });
  };

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-bold text-sm uppercase tracking-wider">Contacto</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-primary dark:text-white">¿Listo para empezar?</h2>
          <p className="mt-5 text-gray-600 dark:text-gray-400 text-lg">Escríbenos y te ayudamos a elegir el curso ideal.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-primary dark:text-white mb-5">Información de Contacto</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Ubicación", value: "Perú, Lima" },
                  { icon: Phone, label: "Teléfono", value: "+51 983 342 745", href: "tel:+51983342745" },
                  { icon: Mail, label: "Email", value: "rodolfoimport2003@gmail.com", href: "mailto:rodolfoimport2003@gmail.com" },
                  { icon: Clock, label: "Horario", value: "Lun-Sáb: 9:00 AM - 8:00 PM" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 group cursor-default">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all">
                      <c.icon className="text-accent group-hover:text-white transition-colors" size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary dark:text-white text-sm">{c.label}</h4>
                      {c.href ? <a href={c.href} className="text-gray-600 dark:text-gray-400 text-sm hover:text-accent transition-colors">{c.value}</a> : <p className="text-gray-600 dark:text-gray-400 text-sm">{c.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a href="https://wa.me/51983342745?text=Hola,%20me%20interesa%20un%20curso%20de%20importación" target="_blank" rel="noopener" className="inline-flex items-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
              <MessageCircle size={20} /> Hablar por WhatsApp
            </a>
          </div>

          <form onSubmit={submit} className="bg-gray-50 dark:bg-dark-card rounded-3xl p-7 border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-5">Inscríbete Ahora</h3>
            <div className="space-y-3">
              <input required value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Nombre completo *" className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm font-medium text-gray-800 dark:text-gray-200 transition-all" />
              <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="Email *" className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm font-medium text-gray-800 dark:text-gray-200 transition-all" />
              <input value={form.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="Teléfono (opcional)" className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm font-medium text-gray-800 dark:text-gray-200 transition-all" />
              <select required value={form.curso} onChange={(e) => set("curso", e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm font-medium text-gray-800 dark:text-gray-200 transition-all">
                <option value="">¿Qué curso te interesa? *</option>
                <option value="Importación de Teléfonos - S/ 99">Importación de Teléfonos - S/ 99</option>
                <option value="Perfumería Internacional - S/ 29">Perfumería Internacional - S/ 29</option>
                <option value="Mentorías Personalizadas">Mentorías Personalizadas</option>
              </select>
              <textarea value={form.mensaje} onChange={(e) => set("mensaje", e.target.value)} rows={3} placeholder="¿Tienes alguna pregunta?" className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm font-medium resize-none text-gray-800 dark:text-gray-200 transition-all" />
            </div>
            <button type="submit" className={`mt-5 w-full px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm ${
              sent ? "bg-green-500 text-white" : "bg-accent hover:bg-accent-dark text-white hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/20"
            }`}>
              {sent ? "✓ Enviado" : <>Enviar Inscripción <Send size={16} /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
