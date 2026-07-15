import Hero from "../components/Hero";
import ServicioImportacion from "../components/ServicioImportacion";
import Almacenes from "../components/Almacenes";
import BeneficiosVIP from "../components/BeneficiosVIP";
import Drogueria from "../components/Drogueria";
import ComoFunciona from "../components/ComoFunciona";
import Estadisticas from "../components/Estadisticas";
import Testimonios from "../components/Testimonios";
import Marcas from "../components/Marcas";
import CTA from "../components/CTA";
import TipoDocumento from "../components/TipoDocumento";

export default function Home() {
  return (
    <>
      <Hero />
      <TipoDocumento />
      <ServicioImportacion />
      <Almacenes />
      <BeneficiosVIP />
      <Drogueria />
      <Estadisticas />
      <ComoFunciona />
      <Marcas />
      <Testimonios />
      <CTA />
    </>
  );
}
