import { X, Check, Camera, Zap } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const freeBenefits = [
  "$12 KG | $8 Desaduanaje",
  "Entrega en 7 días hábiles",
  "Breve asesoría en su compra",
  "Ingreso al grupo gratuito",
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ComunidadModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white dark:bg-dark-card rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <X size={16} className="text-white" />
        </button>

        <div className="relative bg-gradient-to-r from-green-500 to-green-600 p-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <img src="/imagenes/logo.png" alt="RRS Import" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white leading-tight">Únete a nuestra</h2>
              <h2 className="text-2xl font-extrabold text-white leading-tight">Comunidad <span className="text-yellow-300">Gratuita</span></h2>
              <p className="text-white/80 text-xs mt-1">Aprende, conecta y crece con otros importadores</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <ul className="space-y-2.5 mb-6">
            {freeBenefits.map((b, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{b}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <a
              href="https://chat.whatsapp.com/EasOtb7DoKdHULEkRfGA7K?mode=gi_t"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-4 px-4 py-3.5 bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-100 dark:border-white/10 hover:border-green-300 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all overflow-hidden flex-shrink-0">
                <img src="/imagenes/logo.png" alt="RRS Import" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-primary dark:text-white text-sm">COMUNIDAD FREE RRS</p>
                <p className="text-gray-400 text-[11px]">Únete ahora y empieza a importar</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all">
                <WhatsAppIcon />
              </div>
            </a>

            <a
              href="https://chat.whatsapp.com/Im6cRaZRo2ZLJXzBfL7xhc?mode=gi_t"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-4 px-4 py-3.5 bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-100 dark:border-white/10 hover:border-green-300 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all overflow-hidden flex-shrink-0">
                <img src="/imagenes/logo.png" alt="RRS Import" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-primary dark:text-white text-sm">RRS | COMPRA Y VENTA</p>
                <p className="text-gray-400 text-[11px]">Conecta con la comunidad</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all">
                <WhatsAppIcon />
              </div>
            </a>
          </div>

          <div className="flex gap-3 mt-5">
            <a
              href="https://www.instagram.com/rodriguez2003l?utm_source=qr"
              target="_blank"
              rel="noopener"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-bold text-xs transition-all hover:scale-[1.02] active:scale-95"
            >
              <Camera size={14} /> Instagram
            </a>
            <a
              href="https://www.tiktok.com/@rrs.importaciones?_r=1&_t=ZS-97uIvm54mvA"
              target="_blank"
              rel="noopener"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-xs transition-all hover:scale-[1.02] active:scale-95"
            >
              <Zap size={14} /> TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
