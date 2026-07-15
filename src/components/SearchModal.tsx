import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, BookOpen, FileText, HelpCircle } from "lucide-react";
import { allSearchData } from "../data";

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    setQ("");
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  const results = q.trim()
    ? allSearchData.filter((d) => d.titulo.toLowerCase().includes(q.toLowerCase()) || d.desc.toLowerCase().includes(q.toLowerCase()))
    : [];

  const icon = (t: string) => {
    if (t === "curso") return <BookOpen size={16} style={{ color: "#C9A15B" }} />;
    if (t === "servicio") return <FileText size={16} style={{ color: "#C9A15B" }} />;
    return <HelpCircle size={16} style={{ color: "#C9A15B" }} />;
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "#ffffff", color: "#1a1a1a" }}
      >
        <div className="flex items-center px-5 border-b border-gray-200">
          <Search className="mr-3" size={20} style={{ color: "#9ca3af" }} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar cursos, preguntas..."
            className="flex-1 py-4 outline-none text-sm bg-transparent"
            style={{ color: "#1a1a1a" }}
          />
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} style={{ color: "#6b7280" }} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto" style={{ backgroundColor: "#ffffff" }}>
          {!q.trim() ? (
            <p className="px-5 py-8 text-center text-sm" style={{ color: "#9ca3af" }}>Escribe para buscar cursos, preguntas frecuentes...</p>
          ) : results.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm" style={{ color: "#9ca3af" }}>Sin resultados para &ldquo;{q}&rdquo;</p>
          ) : (
            results.map((r, i) => (
              <Link
                key={i}
                to={r.url}
                onClick={onClose}
                className="flex items-center gap-3 px-5 py-3 transition-colors"
                style={{ backgroundColor: "#ffffff" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(201,161,91,0.1)" }}>
                  {icon(r.tipo)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate" style={{ color: "#1a1a1a" }}>{r.titulo}</p>
                  <p className="text-xs truncate" style={{ color: "#6b7280" }}>{r.desc}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ backgroundColor: "#f3f4f6", color: "#6b7280" }}>{r.tipo}</span>
              </Link>
            ))
          )}
        </div>

        <div className="px-5 py-2 border-t text-xs text-center" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6", color: "#9ca3af" }}>
          ESC para cerrar
        </div>
      </div>
    </div>
  );
}
