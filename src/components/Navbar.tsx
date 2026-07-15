import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/cursos", label: "Cursos", children: [
    { to: "/cursos/importacion-telefonos", label: "Importación de Teléfonos" },
    { to: "/cursos/perfumeria-internacional", label: "Perfumería Internacional" },
    { to: "/cursos/mentorias", label: "Mentorías" },
  ]},
  { to: "/tarifarios", label: "Tarifarios" },
  { to: "/sobre-nosotros", label: "Nosotros" },
  { to: "/preguntas-frecuentes", label: "FAQ" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => setDropdownOpen(null), [location]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-primary/98 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-18 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/imagenes/logo.png" alt="RRS IMPORT" className="h-14 w-auto drop-shadow-lg" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <div
              key={l.to}
              className="relative"
              onMouseEnter={() => l.children && setDropdownOpen(l.to)}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <Link
                to={l.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  location.pathname === l.to || (l.children && l.children.some(c => location.pathname === c.to))
                    ? "bg-accent text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {l.label}
                {l.children && <ChevronDown size={12} className={`transition-transform ${dropdownOpen === l.to ? "rotate-180" : ""}`} />}
              </Link>
              {l.children && dropdownOpen === l.to && (
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-100 dark:border-white/10 py-2 min-w-[220px] animate-[fadeIn_0.15s_ease-out]">
                  {l.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className={`block px-4 py-2.5 text-sm transition-all ${
                        location.pathname === child.to
                          ? "bg-accent/10 text-accent font-bold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onSearch} className="p-3 text-white/80 hover:text-accent hover:bg-white/10 rounded-lg transition-all" aria-label="Buscar">
            <Search size={20} />
          </button>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-3 text-white hover:bg-white/10 rounded-lg transition-all" aria-label="Menú">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-primary/98 backdrop-blur-xl border-t border-white/10 animate-[slideDown_0.2s_ease-out]">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <div key={l.to}>
                <Link
                  to={l.to}
                  className={`block px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    location.pathname === l.to ? "bg-accent text-white" : "text-white hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </Link>
                {l.children && (
                  <div className="ml-4 space-y-1">
                    {l.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className={`block px-4 py-2 rounded-lg transition-all text-xs ${
                          location.pathname === child.to
                            ? "bg-accent/20 text-accent font-bold"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
