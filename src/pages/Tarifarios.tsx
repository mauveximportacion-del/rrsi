import { useState, useMemo, useRef } from "react";
import { Calculator, Package, Globe, FileText, MapPin, TrendingUp, BarChart3, PieChart, Download, FileSpreadsheet, Printer, Share2, RotateCcw, Save, AlertCircle, ChevronDown, Check } from "lucide-react";
import jsPDF from "jspdf";
import * as ExcelJS from "exceljs";

const fmtUsd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);
const fmtPen = (n: number) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", minimumFractionDigits: 2 }).format(n);

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

function ResultCard({ label, value, color = "text-accent", icon, secondary }: { label: string; value: string; color?: string; icon?: React.ReactNode; secondary?: string }) {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 border border-gray-100 dark:border-white/10 hover:shadow-md hover:-translate-y-0.5 transition-all group">
      <div className="flex items-center gap-1.5 mb-1.5">{icon}<span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</span></div>
      <div className={`text-lg font-extrabold ${color}`}>{value}</div>
      {secondary && (
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[8px] px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded font-bold">PEN</span>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">{secondary}</span>
        </div>
      )}
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

    // Header
    doc.setFillColor(0, 42, 107);
    doc.rect(0, 0, w, 45, "F");
    doc.setFillColor(201, 161, 91);
    doc.rect(0, 45, w, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("CALCULA TU INVERSION", w / 2, 18, { align: "center" });
    doc.setFontSize(12);
    doc.text("PUESTO EN LIMA", w / 2, 27, { align: "center" });

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${new Date().toLocaleDateString("es-PE")} | Hora: ${new Date().toLocaleTimeString("es-PE")} | Tipo Cambio: S/ ${d.tipoCambio}`, w / 2, 35, { align: "center" });

    y = 55;

    // Product info
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

    // Results table header
    doc.setFillColor(0, 42, 107);
    doc.roundedRect(margin, y, w - margin * 2, 8, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("RESULTADOS DEL COSTEO", margin + 5, y + 5.5);
    y += 10;

    // Table header row
    doc.setFillColor(0, 42, 107);
    doc.rect(margin, y, w - margin * 2, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Concepto", margin + 5, y + 5);
    doc.text("USD", w - margin - 50, y + 5, { align: "center" });
    doc.text("PEN", w - margin - 20, y + 5, { align: "center" });
    y += 7;

    const tableRows: [string, number][] = [
      ["Costo EXW", calc.costoEXW],
      ["Costo FOB", calc.costoFOB],
      ["Costo CIF", calc.costoCIF],
      ["Base Imponible", calc.baseImponible],
      ["Derechos Arancelarios", calc.derechosArancel],
      ["IGV", calc.igv],
      ["IPM", calc.ipm],
      ["Percepcion", calc.percepcion],
      ["Tributos", calc.tributos],
      ["Gastos Internacionales", calc.gastosInt],
      ["Gastos Locales", calc.gastosLoc],
    ];

    tableRows.forEach((row, i) => {
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
      doc.text(fmtUsd(row[1]), w - margin - 50, y + 5, { align: "center" });

      doc.setTextColor(180, 130, 40);
      doc.text(fmtPen(row[1] * d.tipoCambio), w - margin - 20, y + 5, { align: "center" });

      y += 7;
    });

    // Summary box
    y += 3;
    doc.setFillColor(0, 42, 107);
    doc.roundedRect(margin, y, w - margin * 2, 30, 3, 3, "F");
    doc.setFillColor(201, 161, 91);
    doc.rect(margin, y + 30, w - margin * 2, 1, "F");

    const sumItems: [string, number][] = [
      ["PUESTO EN LIMA", calc.costoPuestoLima],
      ["POR UNIDAD", calc.costoUnitario],
      ["CAPITAL", calc.capitalNecesario],
    ];
    const sumColW = (w - margin * 2) / 3;
    sumItems.forEach((s, i) => {
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text(s[0], margin + sumColW * i + sumColW / 2, y + 7, { align: "center" });
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(201, 161, 91);
      doc.text(fmtUsd(s[1]), margin + sumColW * i + sumColW / 2, y + 15, { align: "center" });
      doc.setFontSize(8);
      doc.setTextColor(255, 200, 100);
      doc.text(fmtPen(s[1] * d.tipoCambio), margin + sumColW * i + sumColW / 2, y + 22, { align: "center" });
    });

    y += 38;

    // Distribution
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
    const barW = w - margin * 2 - 70;
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
      doc.text(fmtUsd(value), w - margin - 50, y + 5, { align: "center" });
      doc.setTextColor(180, 130, 40);
      doc.text(fmtPen(value * d.tipoCambio), w - margin - 20, y + 5, { align: "center" });
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

    doc.save("simulacion-costeo.pdf");
  };

  const exportExcel = async () => {
    const wb = new ExcelJS.Workbook();
    wb.creator = "RRS IMPORT Academy";
    wb.created = new Date();

    const BLUE = "2F5496";
    const GOLD = "C9A15B";
    const WHITE = "FFFFFF";
    const LIGHT_BG = "F2F2F2";
    const BORDER_COLOR = "B4B4B4";

    const thinBorder: Partial<ExcelJS.Borders> = {
      top: { style: "thin", color: { argb: BORDER_COLOR } },
      left: { style: "thin", color: { argb: BORDER_COLOR } },
      bottom: { style: "thin", color: { argb: BORDER_COLOR } },
      right: { style: "thin", color: { argb: BORDER_COLOR } },
    };

    const sectionHeader = (row: ExcelJS.Row, text: string, cols: number) => {
      row.getCell(1).value = text;
      row.getCell(1).font = { bold: true, color: { argb: WHITE }, size: 11 };
      row.getCell(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE } };
      row.getCell(1).alignment = { horizontal: "left", vertical: "middle" };
      row.height = 24;
      for (let c = 1; c <= cols; c++) {
        row.getCell(c).border = thinBorder;
        row.getCell(c).fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE } };
      }
    };

    const subHeader = (row: ExcelJS.Row, texts: string[]) => {
      texts.forEach((t, i) => {
        const cell = row.getCell(i + 1);
        cell.value = t;
        cell.font = { bold: true, color: { argb: WHITE }, size: 10 };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD } };
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = thinBorder;
      });
      row.height = 20;
    };

    const dataRow = (row: ExcelJS.Row, values: (string | number)[], isAlt: boolean) => {
      values.forEach((v, i) => {
        const cell = row.getCell(i + 1);
        cell.value = v;
        cell.border = thinBorder;
        cell.alignment = { horizontal: i === 0 ? "left" : "right", vertical: "middle" };
        if (isAlt) {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT_BG } };
        }
      });
    };

    // ============ COSTEO SHEET ============
    const ws = wb.addWorksheet("Costeo", { properties: { defaultColWidth: 18 } });
    ws.columns = [
      { width: 28 }, { width: 22 }, { width: 20 }, { width: 22 }, { width: 20 },
    ];

    // Title
    const titleRow = ws.addRow(["CALCULA TU INVERSION - PUESTO EN LIMA"]);
    titleRow.getCell(1).font = { bold: true, color: { argb: WHITE }, size: 14 };
    titleRow.getCell(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE } };
    titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
    titleRow.height = 32;
    for (let c = 1; c <= 5; c++) {
      titleRow.getCell(c).fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE } };
      titleRow.getCell(c).border = thinBorder;
    }
    ws.mergeCells(1, 1, 1, 5);

    // Date row
    const dateRow = ws.addRow([`Fecha: ${new Date().toLocaleDateString("es-PE")}  |  Tipo Cambio: S/ ${d.tipoCambio}`]);
    dateRow.getCell(1).font = { italic: true, color: { argb: "666666" }, size: 9 };
    dateRow.getCell(1).alignment = { horizontal: "center" };
    ws.mergeCells(2, 1, 2, 5);

    // Spacer
    ws.addRow([]);

    // === DATOS DEL PRODUCTO ===
    const prodTitle = ws.addRow([]);
    sectionHeader(prodTitle, "DATOS DEL PRODUCTO", 5);
    ws.mergeCells(prodTitle.number, 1, prodTitle.number, 5);

    const prodData = [
      ["Producto", d.nombre || "N/A", "", "Pais", d.pais],
      ["Proveedor", d.proveedor || "N/A", "", "Moneda", d.moneda],
      ["Cantidad", d.cantidad, "", "Incoterm", d.incoterm],
      ["Peso Total (kg)", d.pesoTotal, "", "Volumen (m3)", d.volumen],
      ["Tipo de Cambio", `S/ ${d.tipoCambio}`, "", "", ""],
    ];
    prodData.forEach((r, i) => {
      const row = ws.addRow(r);
      dataRow(row, r, i % 2 === 0);
    });

    ws.addRow([]);

    // === GASTOS INTERNACIONALES + IMPUESTOS (side by side) ===
    const gastosTitle = ws.addRow([]);
    sectionHeader(gastosTitle, "GASTOS INTERNACIONALES", 5);
    ws.mergeCells(gastosTitle.number, 1, gastosTitle.number, 5);

    const gastosHeader = ws.addRow(["Concepto", "USD", "", "Concepto", "% / USD"]);
    subHeader(gastosHeader, ["Concepto", "USD", "", "Concepto", "% / USD"]);

    const gastosRows = [
      ["Flete Internacional", d.fleteInternacional, "", "Arancel", `${d.arancel}%`],
      ["Seguro Internacional", d.seguroInternacional, "", "IGV", `${d.igv}%`],
      ["Gastos Bancarios", d.gastosBancarios, "", "IPM", `${d.ipm}%`],
      ["Inspeccion", d.inspeccion, "", "Percepcion", `${d.percepcion}%`],
      ["Certificados", d.certificados, "", "", ""],
      ["Otros G. Int.", d.otrosGastosInt, "", "", ""],
    ];
    gastosRows.forEach((r, i) => {
      const row = ws.addRow(r);
      dataRow(row, r, i % 2 === 0);
    });

    ws.addRow([]);

    // === GASTOS LOCALES ===
    const localTitle = ws.addRow([]);
    sectionHeader(localTitle, "GASTOS LOCALES", 5);
    ws.mergeCells(localTitle.number, 1, localTitle.number, 5);

    const localHeader = ws.addRow(["Concepto", "USD", "", "", ""]);
    subHeader(localHeader, ["Concepto", "USD", "", "", ""]);

    const localRows = [
      ["Agencia Aduanas", d.agenciaAduanas],
      ["Terminal Portuario", d.terminalPortuario],
      ["Almacenaje", d.almacenaje],
      ["Transporte Lima", d.transporteLima],
      ["Descarga", d.descarga],
      ["Manipuleo", d.manipuleo],
      ["Otros G. Loc.", d.otrosGastosLoc],
    ];
    localRows.forEach((r, i) => {
      const row = ws.addRow([...r, "", "", ""]);
      dataRow(row, [...r, "", "", ""], i % 2 === 0);
    });

    ws.addRow([]);

    // === RESULTADOS DEL COSTEO ===
    const resTitle = ws.addRow([]);
    sectionHeader(resTitle, "RESULTADOS DEL COSTEO", 5);
    ws.mergeCells(resTitle.number, 1, resTitle.number, 5);

    const resHeader = ws.addRow(["Concepto", "", "USD", "", "PEN"]);
    subHeader(resHeader, ["Concepto", "", "USD", "", "PEN"]);

    const resRows: [string, number][] = [
      ["Costo EXW", calc.costoEXW],
      ["Costo FOB", calc.costoFOB],
      ["Costo CIF", calc.costoCIF],
      ["Base Imponible", calc.baseImponible],
      ["Derechos Arancelarios", calc.derechosArancel],
      ["IGV", calc.igv],
      ["IPM", calc.ipm],
      ["Percepcion", calc.percepcion],
      ["Tributos Totales", calc.tributos],
      ["Gastos Internacionales", calc.gastosInt],
      ["Gastos Locales", calc.gastosLoc],
    ];
    resRows.forEach((r, i) => {
      const row = ws.addRow([r[0], "", r[1], "", r[1] * d.tipoCambio]);
      dataRow(row, [r[0], "", r[1], "", r[1] * d.tipoCambio], i % 2 === 0);
      // Format currency columns
      row.getCell(3).numFmt = "$#,##0.00";
      row.getCell(5).numFmt = "S/ #,##0.00";
    });

    ws.addRow([]);

    // === RESUMEN ===
    const sumTitle = ws.addRow([]);
    sectionHeader(sumTitle, "RESUMEN", 5);
    ws.mergeCells(sumTitle.number, 1, sumTitle.number, 5);

    const sumRows: [string, number][] = [
      ["COSTO PUESTO EN LIMA", calc.costoPuestoLima],
      ["COSTO POR UNIDAD", calc.costoUnitario],
      ["CAPITAL NECESARIO", calc.capitalNecesario],
    ];
    sumRows.forEach((r, i) => {
      const row = ws.addRow([r[0], "", r[1], "", r[1] * d.tipoCambio]);
      row.getCell(1).font = { bold: true, size: 11, color: { argb: BLUE } };
      row.getCell(3).numFmt = "$#,##0.00";
      row.getCell(5).numFmt = "S/ #,##0.00";
      row.getCell(3).font = { bold: true, size: 11 };
      row.getCell(5).font = { bold: true, size: 11, color: { argb: GOLD.replace("#", "") } };
      dataRow(row, [r[0], "", r[1], "", r[1] * d.tipoCambio], i % 2 === 0);
      row.getCell(1).font = { bold: true, size: 11, color: { argb: BLUE } };
      row.getCell(3).font = { bold: true, size: 11 };
      row.getCell(5).font = { bold: true, size: 11, color: { argb: GOLD.replace("#", "") } };
    });

    ws.addRow([]);

    // === DISTRIBUCION ===
    const distTitle = ws.addRow([]);
    sectionHeader(distTitle, "DISTRIBUCION DEL COSTO", 5);
    ws.mergeCells(distTitle.number, 1, distTitle.number, 5);

    const distHeader = ws.addRow(["Concepto", "", "USD", "", "%"]);
    subHeader(distHeader, ["Concepto", "", "USD", "", "%"]);

    const distData: [string, number][] = [
      ["Producto", calc.costoProducto],
      ["Impuestos", calc.tributos],
      ["Logistica", calc.gastosInt + calc.gastosLoc],
    ];
    distData.forEach((r, i) => {
      const pct = calc.costoPuestoLima > 0 ? r[1] / calc.costoPuestoLima * 100 : 0;
      const row = ws.addRow([r[0], "", r[1], "", `${pct.toFixed(1)}%`]);
      dataRow(row, [r[0], "", r[1], "", `${pct.toFixed(1)}%`], i % 2 === 0);
      row.getCell(3).numFmt = "$#,##0.00";
    });

    // Footer
    ws.addRow([]);
    const footerRow = ws.addRow(["RRS IMPORT Academy - Simulador de Importacion"]);
    footerRow.getCell(1).font = { italic: true, color: { argb: "999999" }, size: 8 };
    ws.mergeCells(footerRow.number, 1, footerRow.number, 5);

    // ============ FINANCIERO SHEET ============
    const ws2 = wb.addWorksheet("Financiero", { properties: { defaultColWidth: 18 } });
    ws2.columns = [
      { width: 30 }, { width: 22 }, { width: 22 },
    ];

    // Title
    const fTitle = ws2.addRow(["SIMULADOR FINANCIERO - MONEDA: PEN (SOLES)"]);
    fTitle.getCell(1).font = { bold: true, color: { argb: WHITE }, size: 14 };
    fTitle.getCell(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE } };
    fTitle.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
    fTitle.height = 32;
    for (let c = 1; c <= 3; c++) {
      fTitle.getCell(c).fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE } };
      fTitle.getCell(c).border = thinBorder;
    }
    ws2.mergeCells(1, 1, 1, 3);

    // Date
    const fDate = ws2.addRow([`Fecha: ${new Date().toLocaleDateString("es-PE")}  |  Tipo Cambio: S/ ${d.tipoCambio}`]);
    fDate.getCell(1).font = { italic: true, color: { argb: "666666" }, size: 9 };
    fDate.getCell(1).alignment = { horizontal: "center" };
    ws2.mergeCells(2, 1, 2, 3);

    ws2.addRow([]);

    // === DATOS DE VENTAS ===
    const vTitle = ws2.addRow([]);
    sectionHeader(vTitle, "DATOS DE VENTAS", 3);
    ws2.mergeCells(vTitle.number, 1, vTitle.number, 3);

    const vRows = [
      ["Precio Venta Unitario", d.precioVenta * d.tipoCambio],
      ["Cantidad a Vender", d.cantidadVender || d.cantidad],
    ];
    vRows.forEach((r, i) => {
      const row = ws2.addRow([r[0], r[1], ""]);
      dataRow(row, [r[0], r[1], ""], i % 2 === 0);
      row.getCell(2).numFmt = "S/ #,##0.00";
    });

    ws2.addRow([]);

    // === GASTOS OPERATIVOS ===
    const gTitle = ws2.addRow([]);
    sectionHeader(gTitle, "GASTOS OPERATIVOS (PEN)", 3);
    ws2.mergeCells(gTitle.number, 1, gTitle.number, 3);

    const gRows = [
      ["Inversion Inicial", d.inversionInicial * d.tipoCambio],
      ["Publicidad", d.publicidad * d.tipoCambio],
      ["Marketing", d.marketing * d.tipoCambio],
      ["Sueldos", d.sueldos * d.tipoCambio],
      ["Alquiler", d.alquiler * d.tipoCambio],
      ["Servicios", d.servicios * d.tipoCambio],
      ["Otros", d.otrosGastosOp * d.tipoCambio],
    ];
    gRows.forEach((r, i) => {
      const row = ws2.addRow([r[0], r[1], ""]);
      dataRow(row, [r[0], r[1], ""], i % 2 === 0);
      row.getCell(2).numFmt = "S/ #,##0.00";
    });

    ws2.addRow([]);

    // === RESULTADOS FINANCIEROS ===
    const rfTitle = ws2.addRow([]);
    sectionHeader(rfTitle, "RESULTADOS FINANCIEROS (PEN)", 3);
    ws2.mergeCells(rfTitle.number, 1, rfTitle.number, 3);

    const rfHeader = ws2.addRow(["Concepto", "Monto (PEN)", ""]);
    subHeader(rfHeader, ["Concepto", "Monto (PEN)", ""]);

    const rfRows: [string, number][] = [
      ["Ventas Totales", calc.ventasTotales * d.tipoCambio],
      ["Costo Mercaderia", calc.costoPuestoLima * d.tipoCambio],
      ["Utilidad Bruta", calc.utilidadBruta * d.tipoCambio],
      ["Gastos Operativos", calc.gastosOp * d.tipoCambio],
      ["Utilidad Neta", calc.utilidadNeta * d.tipoCambio],
    ];
    rfRows.forEach((r, i) => {
      const row = ws2.addRow([r[0], r[1], ""]);
      dataRow(row, [r[0], r[1], ""], i % 2 === 0);
      row.getCell(2).numFmt = "S/ #,##0.00";
    });

    ws2.addRow([]);

    // === INDICADORES ===
    const indTitle = ws2.addRow([]);
    sectionHeader(indTitle, "INDICADORES", 3);
    ws2.mergeCells(indTitle.number, 1, indTitle.number, 3);

    const indRows: [string, string | number][] = [
      ["Margen", `${calc.margen.toFixed(1)}%`],
      ["ROI", `${calc.roi.toFixed(1)}%`],
      ["Ganancia/Unidad (PEN)", calc.gananciaUnidad * d.tipoCambio],
      ["Punto Equilibrio (PEN)", calc.puntoEquilibrio * d.tipoCambio],
    ];
    indRows.forEach((r, i) => {
      const row = ws2.addRow([r[0], r[1], ""]);
      dataRow(row, [r[0], r[1], ""], i % 2 === 0);
      row.getCell(1).font = { bold: true };
      if (typeof r[1] === "number") row.getCell(2).numFmt = "S/ #,##0.00";
    });

    ws2.addRow([]);

    // === DISTRIBUCION ===
    const dTitle = ws2.addRow([]);
    sectionHeader(dTitle, "DISTRIBUCION DEL COSTO (PEN)", 3);
    ws2.mergeCells(dTitle.number, 1, dTitle.number, 3);

    const dDistHeader = ws2.addRow(["Concepto", "Monto (PEN)", "%"]);
    subHeader(dDistHeader, ["Concepto", "Monto (PEN)", "%"]);

    const dDistData: [string, number][] = [
      ["Producto", calc.costoProducto * d.tipoCambio],
      ["Impuestos", calc.tributos * d.tipoCambio],
      ["Logistica", (calc.gastosInt + calc.gastosLoc) * d.tipoCambio],
    ];
    dDistData.forEach((r, i) => {
      const pct = calc.costoPuestoLima > 0 ? r[1] / (calc.costoPuestoLima * d.tipoCambio) * 100 : 0;
      const row = ws2.addRow([r[0], r[1], `${pct.toFixed(1)}%`]);
      dataRow(row, [r[0], r[1], `${pct.toFixed(1)}%`], i % 2 === 0);
      row.getCell(2).numFmt = "S/ #,##0.00";
    });

    // Footer
    ws2.addRow([]);
    const fFooter = ws2.addRow(["RRS IMPORT Academy - Simulador Financiero"]);
    fFooter.getCell(1).font = { italic: true, color: { argb: "999999" }, size: 8 };
    ws2.mergeCells(fFooter.number, 1, fFooter.number, 3);

    // Generate and save
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "simulacion-importacion.xlsx";
    a.click();
    URL.revokeObjectURL(url);
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
                  <ResultCard label="EXW" value={fmtUsd(calc.costoEXW)} secondary={fmtPen(calc.costoEXW * d.tipoCambio)} icon={<Package size={12} className="text-blue-500" />} />
                  <ResultCard label="FOB" value={fmtUsd(calc.costoFOB)} secondary={fmtPen(calc.costoFOB * d.tipoCambio)} icon={<Globe size={12} className="text-purple-500" />} />
                  <ResultCard label="CIF" value={fmtUsd(calc.costoCIF)} secondary={fmtPen(calc.costoCIF * d.tipoCambio)} icon={<FileText size={12} className="text-emerald-500" />} />
                  <ResultCard label="Base Imp." value={fmtUsd(calc.baseImponible)} secondary={fmtPen(calc.baseImponible * d.tipoCambio)} />
                  <ResultCard label="Arancel" value={fmtUsd(calc.derechosArancel)} secondary={fmtPen(calc.derechosArancel * d.tipoCambio)} color="text-orange-500" />
                  <ResultCard label="IGV" value={fmtUsd(calc.igv)} secondary={fmtPen(calc.igv * d.tipoCambio)} color="text-red-500" />
                  <ResultCard label="IPM" value={fmtUsd(calc.ipm)} secondary={fmtPen(calc.ipm * d.tipoCambio)} color="text-yellow-600" />
                  <ResultCard label="Percep." value={fmtUsd(calc.percepcion)} secondary={fmtPen(calc.percepcion * d.tipoCambio)} color="text-pink-500" />
                  <ResultCard label="Tributos" value={fmtUsd(calc.tributos)} secondary={fmtPen(calc.tributos * d.tipoCambio)} color="text-red-600" icon={<AlertCircle size={12} />} />
                  <ResultCard label="G. Int." value={fmtUsd(calc.gastosInt)} secondary={fmtPen(calc.gastosInt * d.tipoCambio)} />
                  <ResultCard label="G. Loc." value={fmtUsd(calc.gastosLoc)} secondary={fmtPen(calc.gastosLoc * d.tipoCambio)} />
                  <ResultCard label="Peso" value={`${calc.pesoTotal.toFixed(1)} kg`} color="text-gray-500" />
                </div>
                <div className="mt-3 p-4 bg-gradient-to-r from-primary to-primary-light rounded-xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div>
                      <div className="text-[9px] text-white/60 uppercase font-bold">Puesto en Lima</div>
                      <div className="text-lg md:text-xl font-extrabold text-white">{fmtUsd(calc.costoPuestoLima)}</div>
                      <div className="flex items-center justify-center gap-1 mt-1"><span className="text-[7px] px-1 py-0.5 bg-accent rounded text-white font-bold">S/</span><span className="text-xs text-accent font-bold">{fmtPen(calc.costoPuestoLima * d.tipoCambio).replace("S/", "").trim()}</span></div>
                    </div>
                    <div>
                      <div className="text-[9px] text-white/60 uppercase font-bold">Por Unidad</div>
                      <div className="text-lg md:text-xl font-extrabold text-accent">{fmtUsd(calc.costoUnitario)}</div>
                      <div className="flex items-center justify-center gap-1 mt-1"><span className="text-[7px] px-1 py-0.5 bg-white/20 rounded text-white font-bold">S/</span><span className="text-xs text-white/80 font-bold">{fmtPen(calc.costoUnitario * d.tipoCambio).replace("S/", "").trim()}</span></div>
                    </div>
                    <div>
                      <div className="text-[9px] text-white/60 uppercase font-bold">Capital</div>
                      <div className="text-lg md:text-xl font-extrabold text-white">{fmtUsd(calc.capitalNecesario)}</div>
                      <div className="flex items-center justify-center gap-1 mt-1"><span className="text-[7px] px-1 py-0.5 bg-accent rounded text-white font-bold">S/</span><span className="text-xs text-accent font-bold">{fmtPen(calc.capitalNecesario * d.tipoCambio).replace("S/", "").trim()}</span></div>
                    </div>
                    <div>
                      <div className="text-[9px] text-white/60 uppercase font-bold">Total</div>
                      <div className="text-lg md:text-xl font-extrabold text-accent">{fmtUsd(calc.costoPuestoLima)}</div>
                      <div className="flex items-center justify-center gap-1 mt-1"><span className="text-[7px] px-1 py-0.5 bg-white/20 rounded text-white font-bold">S/</span><span className="text-xs text-white/80 font-bold">{fmtPen(calc.costoPuestoLima * d.tipoCambio).replace("S/", "").trim()}</span></div>
                    </div>
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
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary dark:text-white">{fmtUsd(item.value)}</span>
                          <span className="text-[8px] px-1 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded font-bold">S/{(item.value * d.tipoCambio).toFixed(0)}</span>
                          <span className="text-gray-400 text-[10px]">({item.pct.toFixed(1)}%)</span>
                        </div>
                      </div>
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
                  <ResultCard label="Ventas" value={fmtPen(calc.ventasTotales * d.tipoCambio)} color="text-blue-600" />
                  <ResultCard label="Costo Merc." value={fmtPen(calc.costoPuestoLima * d.tipoCambio)} color="text-orange-500" />
                  <ResultCard label="Utilidad Bruta" value={fmtPen(calc.utilidadBruta * d.tipoCambio)} color={calc.utilidadBruta >= 0 ? "text-emerald-600" : "text-red-600"} />
                  <ResultCard label="G. Operativos" value={fmtPen(calc.gastosOp * d.tipoCambio)} color="text-red-500" />
                  <ResultCard label="Utilidad Neta" value={fmtPen(calc.utilidadNeta * d.tipoCambio)} color={calc.utilidadNeta >= 0 ? "text-emerald-600" : "text-red-600"} />
                  <ResultCard label="Margen" value={`${calc.margen.toFixed(1)}%`} color={calc.margen >= 0 ? "text-emerald-600" : "text-red-600"} />
                  <ResultCard label="ROI" value={`${calc.roi.toFixed(1)}%`} color="text-accent" />
                  <ResultCard label="Ganancia/Unid" value={fmtPen(calc.gananciaUnidad * d.tipoCambio)} color={calc.gananciaUnidad >= 0 ? "text-emerald-600" : "text-red-600"} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center border border-blue-100 dark:border-blue-500/20">
                  <div className="text-[9px] text-blue-600 dark:text-blue-400 font-bold uppercase">P. Equilibrio</div>
                  <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{fmtPen(calc.puntoEquilibrio * d.tipoCambio)}</div>
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
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded font-bold">PEN</span>
                          <span className="font-bold text-primary dark:text-white">{fmtPen(item.value * d.tipoCambio)}</span>
                          <span className="text-gray-400 text-[10px]">({item.pct.toFixed(1)}%)</span>
                        </div>
                      </div>
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
