import { useState, useMemo, useRef } from "react";
import { Calculator, Package, Globe, FileText, MapPin, TrendingUp, BarChart3, PieChart, Download, FileSpreadsheet, Printer, Share2, RotateCcw, Save, AlertCircle, ChevronDown, Check } from "lucide-react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const fmtUsd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

function Section({ id, expanded, setExpanded, icon: Icon, title, children, count }: { id: string; expanded: string | null; setExpanded: (v: string | null) => void; icon: React.ComponentType<{ size?: number; className?: string }>; title: string; children: React.ReactNode; count?: string }) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden transition-all duration-300 hover:shadow-md">
      <button onClick={() => setExpanded(expanded === id ? null : id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center"><Icon className="text-accent" size={16} /></div>
          <h3 className="font-bold text-primary dark:text-white text-sm">{title}</h3>
          {count && <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">{count}</span>}
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${expanded === id ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${expanded === id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-white/10 pt-3">{children}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "number", suffix, placeholder }: { label: string; value: string | number; onChange: (v: string | number) => void; type?: string; suffix?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === "number" ? (parseFloat(e.target.value) || 0) : e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultCard({ label, value, color = "text-accent", icon }: { label: string; value: string; color?: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 border border-gray-100 dark:border-white/10 hover:shadow-md hover:-translate-y-0.5 transition-all group">
      <div className="flex items-center gap-1.5 mb-1.5">{icon}<span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</span></div>
      <div className={`text-lg font-extrabold ${color}`}>{value}</div>
    </div>
  );
}

const initialState = {
  nombre: "", pais: "Estados Unidos", proveedor: "", moneda: "USD", cantidad: 0, precioUnitario: 0, tipoCambio: 3.75, pesoUnitario: 0, pesoTotal: 0, volumen: 0, incoterm: "FOB",
  fleteInternacional: 0, seguroInternacional: 0, gastosBancarios: 0, inspeccion: 0, certificados: 0, otrosGastosInt: 0,
  partidaArancelaria: "", arancel: 6, igv: 16, ipm: 2, percepcion: 0.75,
  agenciaAduanas: 0, terminalPortuario: 0, almacenaje: 0, transporteLima: 0, descarga: 0, manipuleo: 0, otrosGastosLoc: 0,
  precioVenta: 0, cantidadVender: 0, inversionInicial: 0, publicidad: 0, marketing: 0, sueldos: 0, alquiler: 0, servicios: 0, otrosGastosOp: 0,
};

export default function Tarifarios() {
  const [d, setD] = useState(initialState);
  const [tab, setTab] = useState<"simulador" | "financiero">("simulador");
  const [expanded, setExpanded] = useState<string | null>("producto");
  const [saved, setSaved] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const set = (k: string, v: string | number) => setD((p) => ({ ...p, [k]: v }));

  const calc = useMemo(() => {
    const cant = d.cantidad || 0;
    const precio = d.precioUnitario || 0;
    const costoProducto = cant * precio;
    const pesoTotal = d.pesoUnitario * cant || d.pesoTotal;

    let costoEXW = costoProducto;
    let costoFOB = costoProducto;
    let costoCIF = costoProducto;

    if (d.incoterm === "EXW") {
      costoFOB = costoProducto + (d.fleteInternacional * 0.3);
      costoCIF = costoFOB + d.fleteInternacional + d.seguroInternacional;
    } else if (d.incoterm === "FOB") {
      costoCIF = costoProducto + d.fleteInternacional + d.seguroInternacional;
    } else {
      costoEXW = costoProducto - d.fleteInternacional - d.seguroInternacional;
      costoFOB = costoEXW + (d.fleteInternacional * 0.3);
    }

    const gastosInt = d.fleteInternacional + d.seguroInternacional + d.gastosBancarios + d.inspeccion + d.certificados + d.otrosGastosInt;
    const baseImponible = d.incoterm === "CIF" ? costoCIF : costoFOB + d.fleteInternacional + d.seguroInternacional;
    const derechosArancel = baseImponible * (d.arancel / 100);
    const igv = (baseImponible + derechosArancel) * (d.igv / 100);
    const ipm = baseImponible * (d.ipm / 100);
    const percepcion = baseImponible * (d.percepcion / 100);
    const tributos = derechosArancel + igv + ipm + percepcion;

    const gastosLoc = d.agenciaAduanas + d.terminalPortuario + d.almacenaje + d.transporteLima + d.descarga + d.manipuleo + d.otrosGastosLoc;
    const costoPuestoLima = costoCIF + tributos + gastosLoc;
    const costoUnitario = cant > 0 ? costoPuestoLima / cant : 0;
    const capitalNecesario = costoPuestoLima + d.inversionInicial;

    const ventasTotales = d.precioVenta * (d.cantidadVender || cant);
    const gastosOp = d.publicidad + d.marketing + d.sueldos + d.alquiler + d.servicios + d.otrosGastosOp;
    const utilidadBruta = ventasTotales - costoPuestoLima;
    const utilidadNeta = utilidadBruta - gastosOp;
    const margen = ventasTotales > 0 ? (utilidadNeta / ventasTotales) * 100 : 0;
    const roi = capitalNecesario > 0 ? (utilidadNeta / capitalNecesario) * 100 : 0;
    const gananciaUnidad = (d.cantidadVender || cant) > 0 ? utilidadNeta / (d.cantidadVender || cant) : 0;
    const puntoEquilibrio = margen > 0 ? capitalNecesario / (margen / 100) : 0;

    return { costoProducto, costoEXW, costoFOB, costoCIF, derechosArancel, igv, ipm, percepcion, tributos, gastosInt, gastosLoc, costoPuestoLima, costoUnitario, capitalNecesario, ventasTotales, utilidadBruta, gastosOp, utilidadNeta, margen, roi, gananciaUnidad, puntoEquilibrio, baseImponible, pesoTotal };
  }, [d]);

  const reset = () => { setD(initialState); setTab("simulador"); setExpanded("producto"); };

  const exportPDF = () => {
    const doc = new jsPDF();
    const w = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 0;

    // Header background
    doc.setFillColor(0, 42, 107);
    doc.rect(0, 0, w, 45, "F");

    // Accent line
    doc.setFillColor(201, 161, 91);
    doc.rect(0, 45, w, 3, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("CALCULA TU INVERSION", w / 2, 18, { align: "center" });
    doc.setFontSize(12);
    doc.text("PUESTO EN LIMA", w / 2, 27, { align: "center" });

    // Date
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${new Date().toLocaleDateString("es-PE")} | Hora: ${new Date().toLocaleTimeString("es-PE")}`, w / 2, 35, { align: "center" });

    y = 55;

    // Product info table
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, y, w - margin * 2, 28, 3, 3, "F");
    doc.setDrawColor(201, 161, 91);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, w - margin * 2, 28, 3, 3, "S");

    doc.setTextColor(0, 42, 107);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("DATOS DEL PRODUCTO", margin + 5, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    const colW = (w - margin * 2 - 10) / 3;
    doc.text(`Producto: ${d.nombre || "N/A"}`, margin + 5, y + 14);
    doc.text(`Pais: ${d.pais}`, margin + 5 + colW, y + 14);
    doc.text(`Proveedor: ${d.proveedor || "N/A"}`, margin + 5 + colW * 2, y + 14);
    doc.text(`Moneda: ${d.moneda}`, margin + 5, y + 21);
    doc.text(`Cantidad: ${d.cantidad}`, margin + 5 + colW, y + 21);
    doc.text(`Incoterm: ${d.incoterm}`, margin + 5 + colW * 2, y + 21);

    y += 36;

    // Results table
    doc.setFillColor(0, 42, 107);
    doc.roundedRect(margin, y, w - margin * 2, 8, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("RESULTADOS DEL COSTEO", margin + 5, y + 5.5);
    y += 10;

    const tableData = [
      ["Costo EXW", fmtUsd(calc.costoEXW), "blue"],
      ["Costo FOB", fmtUsd(calc.costoFOB), "purple"],
      ["Costo CIF", fmtUsd(calc.costoCIF), "green"],
      ["Base Imponible", fmtUsd(calc.baseImponible), "gray"],
      ["Derechos Arancelarios", fmtUsd(calc.derechosArancel), "orange"],
      ["IGV", fmtUsd(calc.igv), "red"],
      ["IPM", fmtUsd(calc.ipm), "yellow"],
      ["Percepcion", fmtUsd(calc.percepcion), "pink"],
      ["Tributos", fmtUsd(calc.tributos), "redbold"],
      ["Gastos Internacionales", fmtUsd(calc.gastosInt), "gray"],
      ["Gastos Locales", fmtUsd(calc.gastosLoc), "gray"],
    ];

    tableData.forEach((row, i) => {
      const bg = i % 2 === 0 ? [250, 250, 250] : [255, 255, 255];
      doc.setFillColor(bg[0], bg[1], bg[2]);
      doc.rect(margin, y, w - margin * 2, 7, "F");
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.2);
      doc.rect(margin, y, w - margin * 2, 7, "S");

      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(row[0], margin + 5, y + 5);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 42, 107);
      doc.text(row[1], w - margin - 5, y + 5, { align: "right" });
      y += 7;
    });

    // Summary box
    y += 3;
    doc.setFillColor(0, 42, 107);
    doc.roundedRect(margin, y, w - margin * 2, 22, 3, 3, "F");
    doc.setFillColor(201, 161, 91);
    doc.rect(margin, y + 22, w - margin * 2, 1, "F");

    const sumCols = [
      ["Puesto en Lima", fmtUsd(calc.costoPuestoLima)],
      ["Por Unidad", fmtUsd(calc.costoUnitario)],
      ["Capital", fmtUsd(calc.capitalNecesario)],
    ];
    const sumColW = (w - margin * 2) / 3;
    sumCols.forEach((s, i) => {
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text(s[0].toUpperCase(), margin + sumColW * i + sumColW / 2, y + 7, { align: "center" });
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(201, 161, 91);
      doc.text(s[1], margin + sumColW * i + sumColW / 2, y + 16, { align: "center" });
    });

    y += 30;

    // Distribution bars
    doc.setFillColor(0, 42, 107);
    doc.roundedRect(margin, y, w - margin * 2, 8, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("DISTRIBUCION DEL COSTO", margin + 5, y + 5.5);
    y += 12;

    const distData: [string, number, number[]][] = [
      ["Producto", calc.costoProducto, [59, 130, 246]],
      ["Impuestos", calc.tributos, [239, 68, 68]],
      ["Logistica", calc.gastosInt + calc.gastosLoc, [16, 185, 129]],
    ];
    const barW = w - margin * 2 - 60;
    distData.forEach((item) => {
      const label = item[0];
      const value = item[1];
      const color = item[2];
      const pct = calc.costoPuestoLima > 0 ? value / calc.costoPuestoLima : 0;
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(label, margin + 2, y + 5);

      doc.setFillColor(230, 230, 230);
      doc.roundedRect(margin + 55, y, barW, 6, 2, 2, "F");
      doc.setFillColor(color[0], color[1], color[2]);
      doc.roundedRect(margin + 55, y, barW * Math.min(pct, 1), 6, 2, 2, "F");

      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 42, 107);
      doc.text(`${fmtUsd(value)} (${(pct * 100).toFixed(1)}%)`, w - margin - 2, y + 5, { align: "right" });
      y += 10;
    });

    // Footer
    y = doc.internal.pageSize.getHeight() - 15;
    doc.setFillColor(245, 245, 245);
    doc.rect(0, y - 5, w, 20, "F");
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("RRS IMPORT Academy - Simulador de Importacion", margin, y + 3);
    doc.text(`Generado: ${new Date().toLocaleDateString("es-PE")}`, w - margin, y + 3, { align: "right" });

    doc.save("simulacion-importacion.pdf");
  };

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();

    // Costeo sheet
    const costeoData = [
      ["CALCULA TU INVERSION - PUESTO EN LIMA"],
      [""],
      ["DATOS DEL PRODUCTO", "", "", "GASTOS INTERNACIONALES", ""],
      ["Producto", d.nombre || "N/A", "", "Flete Internacional", d.fleteInternacional],
      ["Pais", d.pais, "", "Seguro Internacional", d.seguroInternacional],
      ["Proveedor", d.proveedor || "N/A", "", "Gastos Bancarios", d.gastosBancarios],
      ["Moneda", d.moneda, "", "Inspeccion", d.inspeccion],
      ["Cantidad", d.cantidad, "", "Certificados", d.certificados],
      ["Precio Unitario", d.precioUnitario, "", "Otros", d.otrosGastosInt],
      ["Tipo de Cambio", d.tipoCambio, "", "", ""],
      ["Incoterm", d.incoterm, "", "IMPUESTOS", ""],
      ["", "", "", "Arancel %", d.arancel],
      ["GASTOS LOCALES", "", "", "IGV %", d.igv],
      ["Agencia Aduanas", d.agenciaAduanas, "", "IPM %", d.ipm],
      ["Terminal Portuario", d.terminalPortuario, "", "Percepcion %", d.percepcion],
      ["Almacenaje", d.almacenaje, "", "", ""],
      ["Transporte Lima", d.transporteLima, "", "", ""],
      ["Descarga", d.descarga, "", "", ""],
      ["Manipuleo", d.manipuleo, "", "", ""],
      ["Otros", d.otrosGastosLoc, "", "", ""],
      ["", "", "", "", ""],
      ["RESULTADOS DEL COSTEO", "", "", "", ""],
      ["Concepto", "", "Monto (USD)", "", ""],
      ["Costo EXW", "", calc.costoEXW, "", ""],
      ["Costo FOB", "", calc.costoFOB, "", ""],
      ["Costo CIF", "", calc.costoCIF, "", ""],
      ["Base Imponible", "", calc.baseImponible, "", ""],
      ["Derechos Arancelarios", "", calc.derechosArancel, "", ""],
      ["IGV", "", calc.igv, "", ""],
      ["IPM", "", calc.ipm, "", ""],
      ["Percepcion", "", calc.percepcion, "", ""],
      ["Tributos Totales", "", calc.tributos, "", ""],
      ["Gastos Internacionales", "", calc.gastosInt, "", ""],
      ["Gastos Locales", "", calc.gastosLoc, "", ""],
      ["", "", "", "", ""],
      ["COSTO PUESTO EN LIMA", "", calc.costoPuestoLima, "", ""],
      ["COSTO POR UNIDAD", "", calc.costoUnitario, "", ""],
      ["CAPITAL NECESARIO", "", calc.capitalNecesario, "", ""],
    ];

    const ws = XLSX.utils.aoa_to_sheet(costeoData);
    ws["!cols"] = [{ wch: 25 }, { wch: 20 }, { wch: 18 }, { wch: 22 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws, "Costeo");

    // Financiero sheet
    const financieroData = [
      ["SIMULADOR FINANCIERO"],
      [""],
      ["DATOS DE VENTAS", "", "GASTOS OPERATIVOS", ""],
      ["Precio Venta Unit.", d.precioVenta, "Inversion Inicial", d.inversionInicial],
      ["Cantidad a Vender", d.cantidadVender || d.cantidad, "Publicidad", d.publicidad],
      ["", "", "Marketing", d.marketing],
      ["", "", "Sueldos", d.sueldos],
      ["", "", "Alquiler", d.alquiler],
      ["", "", "Servicios", d.servicios],
      ["", "", "Otros", d.otrosGastosOp],
      ["", "", "", ""],
      ["RESULTADOS FINANCIEROS", "", "", ""],
      ["Concepto", "", "Monto", ""],
      ["Ventas Totales", "", calc.ventasTotales, ""],
      ["Costo Mercaderia", "", calc.costoPuestoLima, ""],
      ["Utilidad Bruta", "", calc.utilidadBruta, ""],
      ["Gastos Operativos", "", calc.gastosOp, ""],
      ["Utilidad Neta", "", calc.utilidadNeta, ""],
      ["", "", "", ""],
      ["INDICADORES", "", "", ""],
      ["Margen %", calc.margen.toFixed(1), "", ""],
      ["ROI %", calc.roi.toFixed(1), "", ""],
      ["Ganancia/Unidad", calc.gananciaUnidad.toFixed(2), "", ""],
      ["Punto Equilibrio", calc.puntoEquilibrio.toFixed(2), "", ""],
    ];

    const ws2 = XLSX.utils.aoa_to_sheet(financieroData);
    ws2["!cols"] = [{ wch: 22 }, { wch: 15 }, { wch: 22 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws2, "Financiero");

    XLSX.writeFile(wb, "simulacion-importacion.xlsx");
  };

  const printPage = () => window.print();

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Simulación de Importación", text: `Costo Puesto en Lima: ${fmtUsd(calc.costoPuestoLima)}`, url: window.location.href });
    }
  };

  const saveSim = () => {
    localStorage.setItem("rrs-simulacion", JSON.stringify({ ...d, resultados: calc }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-dark-bg transition-colors duration-300 min-h-screen" ref={contentRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-3">
            <Calculator className="text-accent" size={16} />
            <span className="text-accent text-xs font-bold">Simulador Profesional</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white">Calcula tu Inversion</h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Puesto en Lima - Costos de importacion en tiempo real</p>
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          <button onClick={() => setTab("simulador")} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${tab === "simulador" ? "bg-accent text-white shadow-lg shadow-accent/25 scale-105" : "bg-white dark:bg-dark-card text-gray-500 border border-gray-200 dark:border-white/10 hover:border-accent"}`}>
            <Package size={14} /> Costeo
          </button>
          <button onClick={() => setTab("financiero")} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${tab === "financiero" ? "bg-accent text-white shadow-lg shadow-accent/25 scale-105" : "bg-white dark:bg-dark-card text-gray-500 border border-gray-200 dark:border-white/10 hover:border-accent"}`}>
            <TrendingUp size={14} /> Financiero
          </button>
        </div>

        {tab === "simulador" ? (
          <div className="grid lg:grid-cols-5 gap-5">
            <div className="lg:col-span-2 space-y-3">
              <Section id="producto" expanded={expanded} setExpanded={setExpanded} icon={Package} title="Producto" count={`${d.cantidad} uds`}>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="col-span-2"><Input label="Nombre" value={d.nombre} onChange={(v) => set("nombre", v)} type="text" placeholder="Ej: iPhone 15" /></div>
                  <Input label="Pais" value={d.pais} onChange={(v) => set("pais", v)} type="text" />
                  <Input label="Proveedor" value={d.proveedor} onChange={(v) => set("proveedor", v)} type="text" />
                  <div><label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Moneda</label><select value={d.moneda} onChange={(e) => set("moneda", e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-accent outline-none"><option value="USD">USD</option><option value="PEN">PEN</option></select></div>
                  <div><label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Incoterm</label><select value={d.incoterm} onChange={(e) => set("incoterm", e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-accent outline-none"><option>EXW</option><option>FOB</option><option>CIF</option></select></div>
                  <Input label="Cantidad" value={d.cantidad} onChange={(v) => set("cantidad", v)} />
                  <Input label="Precio Unit." value={d.precioUnitario} onChange={(v) => set("precioUnitario", v)} />
                  <Input label="Tipo Cambio" value={d.tipoCambio} onChange={(v) => set("tipoCambio", v)} />
                  <Input label="Peso Unit. (kg)" value={d.pesoUnitario} onChange={(v) => set("pesoUnitario", v)} />
                  <Input label="Peso Total" value={d.pesoTotal} onChange={(v) => set("pesoTotal", v)} />
                  <Input label="Volumen (m3)" value={d.volumen} onChange={(v) => set("volumen", v)} />
                </div>
              </Section>
              <Section id="internacional" expanded={expanded} setExpanded={setExpanded} icon={Globe} title="Gastos Internacionales" count={fmtUsd(calc.gastosInt)}>
                <div className="grid grid-cols-2 gap-2.5">
                  <Input label="Flete" value={d.fleteInternacional} onChange={(v) => set("fleteInternacional", v)} />
                  <Input label="Seguro" value={d.seguroInternacional} onChange={(v) => set("seguroInternacional", v)} />
                  <Input label="Bancarios" value={d.gastosBancarios} onChange={(v) => set("gastosBancarios", v)} />
                  <Input label="Inspeccion" value={d.inspeccion} onChange={(v) => set("inspeccion", v)} />
                  <Input label="Certificados" value={d.certificados} onChange={(v) => set("certificados", v)} />
                  <Input label="Otros" value={d.otrosGastosInt} onChange={(v) => set("otrosGastosInt", v)} />
                </div>
              </Section>
              <Section id="impuestos" expanded={expanded} setExpanded={setExpanded} icon={FileText} title="Impuestos" count={`${d.arancel}%`}>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="col-span-2"><Input label="Partida Arancelaria" value={d.partidaArancelaria} onChange={(v) => set("partidaArancelaria", v)} type="text" placeholder="8517.12.00" /></div>
                  <Input label="Arancel" value={d.arancel} onChange={(v) => set("arancel", v)} suffix="%" />
                  <Input label="IGV" value={d.igv} onChange={(v) => set("igv", v)} suffix="%" />
                  <Input label="IPM" value={d.ipm} onChange={(v) => set("ipm", v)} suffix="%" />
                  <Input label="Percepcion" value={d.percepcion} onChange={(v) => set("percepcion", v)} suffix="%" />
                </div>
              </Section>
              <Section id="local" expanded={expanded} setExpanded={setExpanded} icon={MapPin} title="Gastos Locales" count={fmtUsd(calc.gastosLoc)}>
                <div className="grid grid-cols-2 gap-2.5">
                  <Input label="Agencia Aduanas" value={d.agenciaAduanas} onChange={(v) => set("agenciaAduanas", v)} />
                  <Input label="Terminal Portuario" value={d.terminalPortuario} onChange={(v) => set("terminalPortuario", v)} />
                  <Input label="Almacenaje" value={d.almacenaje} onChange={(v) => set("almacenaje", v)} />
                  <Input label="Transporte Lima" value={d.transporteLima} onChange={(v) => set("transporteLima", v)} />
                  <Input label="Descarga" value={d.descarga} onChange={(v) => set("descarga", v)} />
                  <Input label="Manipuleo" value={d.manipuleo} onChange={(v) => set("manipuleo", v)} />
                  <Input label="Otros" value={d.otrosGastosLoc} onChange={(v) => set("otrosGastosLoc", v)} />
                </div>
              </Section>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-white/10 p-4">
                <h3 className="font-bold text-primary dark:text-white text-sm mb-3 flex items-center gap-2"><BarChart3 size={16} className="text-accent" /> Resultados</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  <ResultCard label="EXW" value={fmtUsd(calc.costoEXW)} icon={<Package size={12} className="text-blue-500" />} />
                  <ResultCard label="FOB" value={fmtUsd(calc.costoFOB)} icon={<Globe size={12} className="text-purple-500" />} />
                  <ResultCard label="CIF" value={fmtUsd(calc.costoCIF)} icon={<FileText size={12} className="text-emerald-500" />} />
                  <ResultCard label="Base Imp." value={fmtUsd(calc.baseImponible)} />
                  <ResultCard label="Arancel" value={fmtUsd(calc.derechosArancel)} color="text-orange-500" />
                  <ResultCard label="IGV" value={fmtUsd(calc.igv)} color="text-red-500" />
                  <ResultCard label="IPM" value={fmtUsd(calc.ipm)} color="text-yellow-600" />
                  <ResultCard label="Percep." value={fmtUsd(calc.percepcion)} color="text-pink-500" />
                  <ResultCard label="Tributos" value={fmtUsd(calc.tributos)} color="text-red-600" icon={<AlertCircle size={12} />} />
                  <ResultCard label="G. Int." value={fmtUsd(calc.gastosInt)} />
                  <ResultCard label="G. Loc." value={fmtUsd(calc.gastosLoc)} />
                  <ResultCard label="Peso" value={`${calc.pesoTotal.toFixed(1)} kg`} color="text-gray-500" />
                </div>
                <div className="mt-3 p-4 bg-gradient-to-r from-primary to-primary-light rounded-xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div><div className="text-[9px] text-white/60 uppercase font-bold">Puesto en Lima</div><div className="text-lg md:text-xl font-extrabold text-white">{fmtUsd(calc.costoPuestoLima)}</div></div>
                    <div><div className="text-[9px] text-white/60 uppercase font-bold">Por Unidad</div><div className="text-lg md:text-xl font-extrabold text-accent">{fmtUsd(calc.costoUnitario)}</div></div>
                    <div><div className="text-[9px] text-white/60 uppercase font-bold">Capital</div><div className="text-lg md:text-xl font-extrabold text-white">{fmtUsd(calc.capitalNecesario)}</div></div>
                    <div><div className="text-[9px] text-white/60 uppercase font-bold">Total</div><div className="text-lg md:text-xl font-extrabold text-accent">{fmtUsd(calc.costoPuestoLima)}</div></div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-white/10 p-4">
                <h3 className="font-bold text-primary dark:text-white text-sm mb-3 flex items-center gap-2"><PieChart size={16} className="text-accent" /> Distribucion</h3>
                <div className="space-y-2.5">
                  {[
                    { label: "Producto", value: calc.costoProducto, color: "bg-blue-500", pct: calc.costoPuestoLima > 0 ? (calc.costoProducto / calc.costoPuestoLima * 100) : 0 },
                    { label: "Impuestos", value: calc.tributos, color: "bg-red-500", pct: calc.costoPuestoLima > 0 ? (calc.tributos / calc.costoPuestoLima * 100) : 0 },
                    { label: "Logistica", value: calc.gastosInt + calc.gastosLoc, color: "bg-emerald-500", pct: calc.costoPuestoLima > 0 ? ((calc.gastosInt + calc.gastosLoc) / calc.costoPuestoLima * 100) : 0 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[11px] mb-1"><span className="text-gray-600 dark:text-gray-400">{item.label}</span><span className="font-bold text-primary dark:text-white">{fmtUsd(item.value)} ({item.pct.toFixed(1)}%)</span></div>
                      <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1.5"><div className={`${item.color} rounded-full h-1.5 transition-all duration-700`} style={{ width: `${Math.min(item.pct, 100)}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-5">
            <div className="space-y-3">
              <Section id="ventas" expanded={expanded} setExpanded={setExpanded} icon={TrendingUp} title="Ventas">
                <div className="grid grid-cols-2 gap-2.5">
                  <Input label="Precio Venta Unit." value={d.precioVenta} onChange={(v) => set("precioVenta", v)} />
                  <Input label="Cantidad a Vender" value={d.cantidadVender} onChange={(v) => set("cantidadVender", v)} />
                </div>
              </Section>
              <Section id="gastos" expanded={expanded} setExpanded={setExpanded} icon={FileText} title="Gastos Operativos" count={fmtUsd(calc.gastosOp)}>
                <div className="grid grid-cols-2 gap-2.5">
                  <Input label="Inversion Inicial" value={d.inversionInicial} onChange={(v) => set("inversionInicial", v)} />
                  <Input label="Publicidad" value={d.publicidad} onChange={(v) => set("publicidad", v)} />
                  <Input label="Marketing" value={d.marketing} onChange={(v) => set("marketing", v)} />
                  <Input label="Sueldos" value={d.sueldos} onChange={(v) => set("sueldos", v)} />
                  <Input label="Alquiler" value={d.alquiler} onChange={(v) => set("alquiler", v)} />
                  <Input label="Servicios" value={d.servicios} onChange={(v) => set("servicios", v)} />
                  <Input label="Otros" value={d.otrosGastosOp} onChange={(v) => set("otrosGastosOp", v)} />
                </div>
              </Section>
            </div>
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-white/10 p-4">
                <h3 className="font-bold text-primary dark:text-white text-sm mb-3 flex items-center gap-2"><TrendingUp size={16} className="text-accent" /> Resultados Financieros</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  <ResultCard label="Ventas" value={fmtUsd(calc.ventasTotales)} color="text-blue-600" />
                  <ResultCard label="Costo Merc." value={fmtUsd(calc.costoPuestoLima)} color="text-orange-500" />
                  <ResultCard label="Utilidad Bruta" value={fmtUsd(calc.utilidadBruta)} color={calc.utilidadBruta >= 0 ? "text-emerald-600" : "text-red-600"} />
                  <ResultCard label="G. Operativos" value={fmtUsd(calc.gastosOp)} color="text-red-500" />
                  <ResultCard label="Utilidad Neta" value={fmtUsd(calc.utilidadNeta)} color={calc.utilidadNeta >= 0 ? "text-emerald-600" : "text-red-600"} />
                  <ResultCard label="Margen" value={`${calc.margen.toFixed(1)}%`} color={calc.margen >= 0 ? "text-emerald-600" : "text-red-600"} />
                  <ResultCard label="ROI" value={`${calc.roi.toFixed(1)}%`} color="text-accent" />
                  <ResultCard label="Ganancia/Unid" value={fmtUsd(calc.gananciaUnidad)} color={calc.gananciaUnidad >= 0 ? "text-emerald-600" : "text-red-600"} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center border border-blue-100 dark:border-blue-500/20">
                  <div className="text-[9px] text-blue-600 dark:text-blue-400 font-bold uppercase">P. Equilibrio</div>
                  <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{fmtUsd(calc.puntoEquilibrio)}</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center border border-emerald-100 dark:border-emerald-500/20">
                  <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Rentabilidad</div>
                  <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{calc.margen.toFixed(1)}%</div>
                </div>
                <div className="bg-accent/10 rounded-xl p-3 text-center border border-accent/20">
                  <div className="text-[9px] text-accent font-bold uppercase">ROI</div>
                  <div className="text-lg font-extrabold text-accent">{calc.roi.toFixed(1)}%</div>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-white/10 p-4">
                <h3 className="font-bold text-primary dark:text-white text-sm mb-3 flex items-center gap-2"><PieChart size={16} className="text-accent" /> Distribucion</h3>
                <div className="space-y-2.5">
                  {[
                    { label: "Producto", value: calc.costoProducto, color: "bg-blue-500", pct: calc.costoPuestoLima > 0 ? (calc.costoProducto / calc.costoPuestoLima * 100) : 0 },
                    { label: "Impuestos", value: calc.tributos, color: "bg-red-500", pct: calc.costoPuestoLima > 0 ? (calc.tributos / calc.costoPuestoLima * 100) : 0 },
                    { label: "Logistica", value: calc.gastosInt + calc.gastosLoc, color: "bg-emerald-500", pct: calc.costoPuestoLima > 0 ? ((calc.gastosInt + calc.gastosLoc) / calc.costoPuestoLima * 100) : 0 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[11px] mb-1"><span className="text-gray-600 dark:text-gray-400">{item.label}</span><span className="font-bold text-primary dark:text-white">{fmtUsd(item.value)} ({item.pct.toFixed(1)}%)</span></div>
                      <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1.5"><div className={`${item.color} rounded-full h-1.5 transition-all duration-700`} style={{ width: `${Math.min(item.pct, 100)}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold hover:bg-gray-300 dark:hover:bg-white/20 transition-all active:scale-95"><RotateCcw size={13} /> Nuevo</button>
          <button onClick={saveSim} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${saved ? "bg-emerald-500 text-white" : "bg-primary text-white hover:bg-primary-light"}`}>{saved ? <><Check size={13} /> Guardado</> : <><Save size={13} /> Guardar</>}</button>
          <button onClick={exportPDF} className="flex items-center gap-1.5 px-4 py-2.5 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-all active:scale-95"><Download size={13} /> PDF</button>
          <button onClick={exportExcel} className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all active:scale-95"><FileSpreadsheet size={13} /> Excel</button>
          <button onClick={printPage} className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-500 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all active:scale-95"><Printer size={13} /> Imprimir</button>
          <button onClick={share} className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-500 text-white rounded-xl text-xs font-bold hover:bg-purple-600 transition-all active:scale-95"><Share2 size={13} /> Compartir</button>
        </div>
      </div>
    </section>
  );
}
