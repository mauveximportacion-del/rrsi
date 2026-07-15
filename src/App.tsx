import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchModal from "./components/SearchModal";

import BackToTop from "./components/BackToTop";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/Home";
import CatalogoPage from "./pages/CatalogoPage";
import ImportacionTelefonos from "./pages/ImportacionTelefonos";
import PerfumeriaInternacional from "./pages/PerfumeriaInternacional";
import Mentorias from "./pages/Mentorias";
import NosotrosPage from "./pages/NosotrosPage";
import FAQPage from "./pages/FAQPage";
import ContactoPage from "./pages/ContactoPage";
import Tarifarios from "./pages/Tarifarios";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar onSearch={() => setSearchOpen(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<CatalogoPage />} />
          <Route path="/cursos/importacion-telefonos" element={<ImportacionTelefonos />} />
          <Route path="/cursos/perfumeria-internacional" element={<PerfumeriaInternacional />} />
          <Route path="/cursos/mentorias" element={<Mentorias />} />
          <Route path="/sobre-nosotros" element={<NosotrosPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/preguntas-frecuentes" element={<FAQPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/tarifarios" element={<Tarifarios />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <ThemeToggle />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
