import { useState } from "react";
import { X, CreditCard, Smartphone, Banknote, Check, Shield, ArrowRight, Copy, QrCode, User, Phone, FileText, MessageCircle, Ticket } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  curso: { titulo: string; precio: string } | null;
}

const metodos = [
  { id: "yape", label: "Yape", icon: Smartphone, desc: "Pago instantáneo", qr: "/imagenes/qr_yape_rrs.jpg", logo: "/imagenes/yape.png" },
  { id: "plin", label: "Plin", icon: Smartphone, desc: "Pago instantáneo", qr: "/imagenes/qr_plin_rrs.jpg", logo: "/imagenes/plin.png" },
  { id: "bcp", label: "BCP", icon: Banknote, desc: "Cuenta Soles", qr: null, logo: "/imagenes/bcp.webp", cuenta: "57005690464097" },
  { id: "interbank", label: "Interbank", icon: Banknote, desc: "Cuenta Interbancaria", qr: null, logo: "/imagenes/interbank.webp", cuenta: "00257010569046409707" },
  { id: "tarjeta", label: "Tarjeta de Crédito/Débito", icon: CreditCard, desc: "Visa, Mastercard, Amex", qr: null, logo: null },
];

function buildWhatsAppMessage(curso: { titulo: string; precio: string }, datos: { nombre: string; telefono: string; dni: string }, metodo: string) {
  const lines = [
    `🎓 *NUEVA INSCRIPCIÓN - RRS IMPORT Academy*`,
    ``,
    `📚 *Curso:* ${curso.titulo}`,
    `💰 *Precio:* ${curso.precio}`,
    `💳 *Método de pago:* ${metodo}`,
    ``,
    `👤 *Datos del alumno:*`,
    `• Nombre: ${datos.nombre}`,
    `• Teléfono: ${datos.telefono}`,
    `• DNI/RUC: ${datos.dni}`,
    ``,
    `📎 *Adjuntar captura de pago*`,
  ];
  return lines.join("\n");
}

export default function PaymentModal({ open, onClose, curso }: PaymentModalProps) {
  const [step, setStep] = useState<"datos" | "pago">("datos");
  const [datos, setDatos] = useState({ nombre: "", telefono: "", dni: "" });
  const [metodo, setMetodo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [aplicado, setAplicado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [verQR, setVerQR] = useState<string | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [codigoError, setCodigoError] = useState("");

  if (!open || !curso) return null;

  const esImportacion = curso.titulo.toLowerCase().includes("importación") || curso.titulo.toLowerCase().includes("importacion");
  const precioNum = parseFloat(curso.precio.replace(/[^0-9.]/g, "")) || 0;
  const descuentoMonto = aplicado && esImportacion ? precioNum * 0.2 : 0;
  const total = precioNum - descuentoMonto;

  const validarDatos = () => {
    const e: Record<string, string> = {};
    if (!datos.nombre.trim()) e.nombre = "Ingresa tu nombre";
    if (!datos.telefono.trim() || datos.telefono.length < 9) e.telefono = "Teléfono inválido";
    if (!datos.dni.trim() || datos.dni.length < 8) e.dni = "DNI inválido";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const continuarAPago = () => {
    if (validarDatos()) setStep("pago");
  };

  const aplicarDescuento = () => {
    if (codigo.toLowerCase() === "live" && esImportacion) {
      setAplicado(true);
      setCodigoError("");
      setTimeout(() => setShowDiscountModal(false), 1500);
    } else {
      setCodigoError("Código no válido");
    }
  };

  const copiar = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const enviarWhatsApp = () => {
    const metodoLabel = metodos.find((m) => m.id === metodo)?.label || metodo;
    const msg = buildWhatsAppMessage(curso, datos, metodoLabel);
    const url = `https://wa.me/51983342745?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  };

  const metodoActual = metodos.find((m) => m.id === metodo);

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white dark:bg-dark-bg rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light p-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
            <X size={16} className="text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">{step === "datos" ? "Datos del Alumno" : "Método de Pago"}</h3>
              <p className="text-white/60 text-xs">{curso.titulo} — {curso.precio}</p>
            </div>
          </div>
          {/* Steps indicator */}
          <div className="flex gap-2 mt-3">
            <div className={`flex-1 h-1 rounded-full ${step === "datos" ? "bg-accent" : "bg-white/40"}`} />
            <div className={`flex-1 h-1 rounded-full ${step === "pago" ? "bg-accent" : "bg-white/20"}`} />
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* STEP 1: Datos del alumno */}
          {step === "datos" && (
            <>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 block">Nombre completo *</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={datos.nombre}
                      onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                      placeholder="Ej: Juan Pérez"
                      className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-dark-card border ${errores.nombre ? "border-red-400" : "border-gray-200 dark:border-white/10"} rounded-xl text-xs outline-none focus:ring-2 focus:ring-accent`}
                    />
                  </div>
                  {errores.nombre && <p className="text-[10px] text-red-500 mt-1">{errores.nombre}</p>}
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 block">Teléfono / WhatsApp *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={datos.telefono}
                      onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
                      placeholder="Ej: 983342745"
                      className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-dark-card border ${errores.telefono ? "border-red-400" : "border-gray-200 dark:border-white/10"} rounded-xl text-xs outline-none focus:ring-2 focus:ring-accent`}
                    />
                  </div>
                  {errores.telefono && <p className="text-[10px] text-red-500 mt-1">{errores.telefono}</p>}
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 block">DNI / RUC *</label>
                  <div className="relative">
                    <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={datos.dni}
                      onChange={(e) => setDatos({ ...datos, dni: e.target.value })}
                      placeholder="Ej: 12345678"
                      maxLength={11}
                      className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-dark-card border ${errores.dni ? "border-red-400" : "border-gray-200 dark:border-white/10"} rounded-xl text-xs outline-none focus:ring-2 focus:ring-accent`}
                    />
                  </div>
                  {errores.dni && <p className="text-[10px] text-red-500 mt-1">{errores.dni}</p>}
                </div>
              </div>

              <button onClick={continuarAPago} className="w-full flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/25">
                Continuar al pago <ArrowRight size={16} />
              </button>
            </>
          )}

          {/* STEP 2: Método de pago */}
          {step === "pago" && (
            <>
              {/* Resumen */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-card rounded-xl">
                <div>
                  <span className="text-[10px] text-gray-400 block">{datos.nombre}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Total a pagar</span>
                </div>
                <div className="text-right">
                  {descuentoMonto > 0 && <span className="text-xs text-gray-400 line-through mr-2">S/{precioNum}</span>}
                  <span className="text-xl font-extrabold text-accent">S/{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Volver a datos */}
              <button onClick={() => setStep("datos")} className="text-[10px] text-accent hover:underline font-bold">
                ← Modificar datos
              </button>

              {/* Botón Descuento - Solo para Importación */}
              {esImportacion && !aplicado && (
                <button
                  onClick={() => { setShowDiscountModal(true); setCodigo(""); setCodigoError(""); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-accent/50 rounded-xl bg-accent/5 hover:bg-accent/10 transition-all group"
                >
                  <Ticket className="text-accent group-hover:scale-110 transition-transform" size={16} />
                  <span className="text-xs font-bold text-accent">¿Tienes un código de descuento?</span>
                </button>
              )}

              {aplicado && esImportacion && (
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 rounded-xl">
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">¡20% de descuento aplicado!</span>
                </div>
              )}

              {/* Métodos de pago */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Selecciona un método</h4>
                <div className="space-y-2">
                  {metodos.map((m) => {
                    const Icon = m.icon;
                    return (
                      <button key={m.id} onClick={() => { setMetodo(m.id); setVerQR(null); }} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                        metodo === m.id ? "border-accent bg-accent/5 shadow-md" : "border-gray-100 dark:border-white/10 hover:border-gray-300"
                      }`}>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden ${metodo === m.id ? "bg-accent" : "bg-gray-100 dark:bg-white/5"}`}>
                          {m.logo ? <img src={m.logo} alt={m.label} className="w-full h-full object-contain" /> : <Icon className={metodo === m.id ? "text-white" : "text-gray-400"} size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-xs text-primary dark:text-white">{m.label}</div>
                          <div className="text-[10px] text-gray-400">{m.desc}</div>
                        </div>
                        {m.qr && metodo === m.id && <button onClick={(e) => { e.stopPropagation(); setVerQR(verQR === m.id ? null : m.id); }} className="px-2 py-1 bg-accent/10 text-accent rounded text-[10px] font-bold"><QrCode size={12} /></button>}
                        {metodo === m.id && <Check className="text-accent" size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detalle del método */}
              {metodoActual && (
                <div className="bg-gray-50 dark:bg-dark-card rounded-xl p-4 space-y-3">
                  {metodoActual.cuenta && (
                    <div>
                      <p className="text-[10px] text-gray-400 mb-1">Cuenta {metodoActual.label}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-primary dark:text-white tracking-wider">{metodoActual.cuenta}</span>
                        <button onClick={() => copiar(metodoActual.cuenta!)} className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${copiado ? "bg-emerald-500 text-white" : "bg-accent/10 text-accent hover:bg-accent/20"}`}>
                          {copiado ? <Check size={10} /> : <Copy size={10} />}
                        </button>
                      </div>
                    </div>
                  )}
                  {metodoActual.qr && verQR === metodoActual.id && (
                    <div className="text-center">
                      <img src={metodoActual.qr} alt={`QR ${metodoActual.label}`} className="w-48 h-48 mx-auto rounded-xl border-2 border-gray-200 dark:border-white/10" />
                      <p className="text-[10px] text-gray-400 mt-2">Escanea el código QR</p>
                    </div>
                  )}
                  {metodoActual.id === "tarjeta" && (
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                      <p>Serás redirigido a la pasarela de pago seguro</p>
                    </div>
                  )}
                </div>
              )}

              {/* Enviar por WhatsApp */}
              <button disabled={!metodo} onClick={enviarWhatsApp} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                metodo ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-95" : "bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed"
              }`}>
                <MessageCircle size={16} /> Enviar inscripción por WhatsApp
              </button>

              <p className="text-[10px] text-center text-gray-400">
                Se enviarán tus datos y el comprobante a nuestro WhatsApp
              </p>
            </>
          )}
        </div>
      </div>

      {/* Modal de Descuento */}
      {showDiscountModal && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowDiscountModal(false)}>
          <div className="bg-white dark:bg-dark-bg rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center" onClick={(e) => e.stopPropagation()}>
            {/* Logo girando 3D */}
            <div className="mb-6 perspective-500">
              <div className="preserve-3d animate-spin3d inline-block">
                <img
                  src="/imagenes/logo.png"
                  alt="RRS IMPORT"
                  className="w-24 h-24"
                />
              </div>
            </div>

            <h3 className="text-lg font-extrabold text-primary dark:text-white mb-2">Código de Descuento</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-6">Ingresa el código para obtener un 20% de descuento</p>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 via-accent/50 to-accent/30 rounded-2xl blur opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => { setCodigo(e.target.value.toUpperCase()); setCodigoError(""); }}
                  placeholder=""
                  className="relative w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white dark:from-dark-card dark:to-dark-bg border-2 border-gray-200 dark:border-white/10 rounded-xl text-center text-lg font-bold uppercase tracking-[0.3em] outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/20 transition-all duration-300"
                  autoFocus
                />
                {codigo && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {aplicado ? (
                      <Check size={18} className="text-emerald-500 animate-[fadeIn_0.3s_ease-out]" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-accent rounded-full animate-[spin_1s_linear_infinite]"></div>
                    )}
                  </div>
                )}
              </div>

              {codigoError && (
                <div className="flex items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-[shake_0.3s_ease-in-out]">
                  <X size={14} className="text-red-500" />
                  <p className="text-xs font-bold text-red-500">{codigoError}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDiscountModal(false)}
                  className="flex-1 py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
                >
                  Cancelar
                </button>
                <button
                  onClick={aplicarDescuento}
                  disabled={!codigo}
                  className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 ${
                    codigo
                      ? "bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02]"
                      : "bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {aplicado ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check size={16} /> ¡Aplicado!
                    </span>
                  ) : (
                    "Aplicar"
                  )}
                </button>
              </div>
            </div>

            {aplicado && (
              <div className="mt-4 p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl animate-[fadeIn_0.3s_ease-out] shadow-lg shadow-emerald-500/30">
                <div className="flex items-center justify-center gap-2">
                  <Check size={18} className="text-white" />
                  <p className="text-sm font-bold text-white">¡20% de descuento aplicado!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
