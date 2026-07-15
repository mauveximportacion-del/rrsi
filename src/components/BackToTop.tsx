import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-primary hover:bg-primary-light text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
      aria-label="Volver arriba"
    >
      <ArrowUp size={20} />
    </button>
  );
}
