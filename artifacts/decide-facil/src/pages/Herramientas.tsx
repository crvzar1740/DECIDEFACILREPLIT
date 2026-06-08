import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Columns, RefreshCw, BookOpen, ArrowLeft, Download,
  Target, Calendar, PieChart, CheckSquare, Sliders, AlertCircle,
  Dices, EyeOff, ShieldCheck, BatteryCharging, CheckCircle, ExternalLink,
  Lock, Sparkles, Map, ShieldAlert, HeartHandshake, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Tab = "home" | "asistente" | "frameworks" | "automatizacion" | "educativo";
type AsisCat = "" | "comida" | "tiempo" | "ocio" | "fast";

// ── helpers ─────────────────────────────────────────────────────────────────
const MEAL_MENU: Record<string, { meta: string; almuerzo: string; cena: string }> = {
  Lunes:     { meta: "Inicio de semana - Energía", almuerzo: "Pechuga de pollo a la plancha con puré de calabaza y ensalada de espinaca.", cena: "Pescado al horno con espárragos y quinoa." },
  Martes:    { meta: "Vegetariano - Antioxidantes", almuerzo: "Salteado de tofu con brócoli, pimientos y arroz integral.", cena: "Crema de verduras con semillas de calabaza." },
  Miércoles: { meta: "Proteína magra y legumbres", almuerzo: "Lentejas guisadas con vegetales y huevo duro.", cena: "Ensalada mediterránea con pollo desmenuzado." },
  Jueves:    { meta: "Salud cerebral / Omega-3", almuerzo: "Salmón al vapor con batata al horno.", cena: "Ensalada de hojas verdes, nueces, palta y aceite de oliva." },
  Viernes:   { meta: "Práctico", almuerzo: "Pasta integral con salsa de tomate natural y carne magra.", cena: "Tortilla de espinaca y cebolla con ensalada de rúcula." },
  Sábado:    { meta: "Flexible / Social", almuerzo: "Wrap de pollo con vegetales y hummus.", cena: "Pizza de masa madre con vegetales y proteína magra." },
  Domingo:   { meta: "Preparación y Comfort", almuerzo: "Bife de carne roja magra con ensalada y papas al horno.", cena: "Sopa de pollo desmenuzado con fideos integrales." },
};

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const DIAS_SHORT = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

// ── NumBar ───────────────────────────────────────────────────────────────────
function NumBar({ value, onChange, color = "amber" }: { value: number; onChange: (v: number) => void; color?: string }) {
  const accent = color === "amber" ? "bg-amber-400 text-black" : color === "blue" ? "bg-sky-400 text-black" : color === "purple" ? "bg-purple-400 text-black" : "bg-emerald-400 text-black";
  return (
    <div className="flex rounded overflow-hidden h-8 bg-black/30 border border-white/[0.06]">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`flex-1 text-[10px] font-semibold border-r border-white/[0.04] last:border-r-0 transition-colors ${value === n ? accent : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"}`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

// ── EvalBox ───────────────────────────────────────────────────────────────────
function EvalBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 space-y-4 lg:sticky lg:top-20">
      <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/[0.05] pb-3">Evaluación</h3>
      {children}
    </div>
  );
}

function EvalStat({ label, value, sub, note, color = "text-amber-400" }: { label: string; value: string | number; sub?: string; note?: string; color?: string }) {
  return (
    <div className="bg-black/30 border border-white/[0.05] rounded-xl p-3">
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">{label}</div>
      <div className={`text-2xl font-black ${color}`}>{value}</div>
      {sub && <div className="text-[10px] text-slate-600">{sub}</div>}
      {note && <div className="text-xs text-slate-400 mt-1 leading-relaxed">{note}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOL 1 — ASISTENTE DE DECISIONES
// ─────────────────────────────────────────────────────────────────────────────
function Asistente({ onBack }: { onBack: () => void }) {
  const [cat, setCat] = useState<AsisCat>("");
  const [evalContent, setEvalContent] = useState<React.ReactNode>(
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400"><Target className="w-6 h-6" /></div>
      <p className="text-xs text-slate-400 max-w-[200px]">Elige una categoría e interactúa para ver el veredicto.</p>
    </div>
  );

  // Comida state
  const [diaMenu, setDiaMenu] = useState<string>("");
  const [veg, setVeg] = useState(""); 
  const [prot, setProt] = useState(""); 
  const [carb, setCarb] = useState("");
  const [audProt, setAudProt] = useState(false); 
  const [audVeg, setAudVeg] = useState(false); 
  const [audCarb, setAudCarb] = useState(false);

  // Tiempo state
  const [matutino, setMatutino] = useState(""); 
  const [gestion, setGestion] = useState(""); 
  const [deep, setDeep] = useState("");
  const [dosmin, setDosmin] = useState(""); 
  const [pareto, setPareto] = useState("");

  // FAST state
  const [fatidica, setFatidica] = useState(""); 
  const [alinea, setAlinea] = useState(""); 
  const [solucion, setSolucion] = useState(""); 
  const [tranquilidad, setTranquilidad] = useState("");

  const selectCat = (c: AsisCat) => {
    setCat(c);
    if (c === "comida") setEvalContent(
      <div className="space-y-3">
        <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
          <p className="text-[10px] font-bold text-amber-400 uppercase mb-1">💡 Filosofía Nutricional</p>
          <p className="text-xs text-slate-300 leading-relaxed">Implementá un <strong>Menú Rotativo</strong> o la <strong>Fórmula del Plato Inteligente</strong> para eliminar la fatiga por decisión nutritional.</p>
        </div>
        <div className="p-3 bg-sky-500/5 border border-sky-500/10 rounded-xl text-xs text-slate-400">Seleccioná un día o configurá tu alacena a la izquierda.</div>
      </div>
    );
    if (c === "tiempo") updateBloques(matutino, gestion, deep);
    if (c === "ocio") setEvalContent(<div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl"><p className="text-[10px] font-bold text-amber-400 uppercase">💡 Regla de Oro</p><p className="text-xs text-slate-300 mt-1 leading-relaxed">Limita tu búsqueda de streaming a máximo 5 minutos. Si superás el límite, usá las herramientas lógicas de la izquierda.</p></div>);
    if (c === "fast") setEvalContent(<div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-xs text-slate-400">Completá los 4 filtros para obtener tu veredicto F.A.S.T.</div>);
  };

  const cargarDia = (dia: string) => {
    setDiaMenu(dia);
    const info = MEAL_MENU[dia];
    setEvalContent(
      <div className="space-y-3">
        <div className="text-[10px] font-bold text-amber-400 uppercase">{dia} — {info.meta}</div>
        <div className="p-3 bg-black/30 border border-white/[0.05] rounded-xl"><span className="text-[10px] font-bold text-sky-400 block">🌞 ALMUERZO</span><p className="text-xs text-white mt-1">{info.almuerzo}</p></div>
        <div className="p-3 bg-black/30 border border-white/[0.05] rounded-xl"><span className="text-[10px] font-bold text-purple-400 block">🌙 CENA</span><p className="text-xs text-white mt-1">{info.cena}</p></div>
        <p className="text-[10px] text-slate-500">Ante dudas de salud, consultá un nutricionista matriculado.</p>
      </div>
    );
  };

  const auditarPlato = (v: string, p: string, c: string) => {
    if (!v && !p && !c) return;
    setEvalContent(
      <div className="space-y-3">
        <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl space-y-2">
          {[
            { label: "🥗 Vegetales (50%):", val: v, col: "text-emerald-400" },
            { label: "🍗 Proteínas (25%):", val: p, col: "text-orange-400" },
            { label: "🥔 Carbohidratos (25%):", val: c, col: "text-sky-400" }
          ].map((item) => (
            <div key={item.label} className="flex justify-between text-xs">
              <span className={item.col}>{item.label}</span>
              <span className="text-white">{item.val ? "Asignado ✓" : "Faltante ✗"}</span>
            </div>
          ))}
        </div>
        <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl"><span className="text-[10px] font-bold text-amber-400 block">🧠 EL EXTRA MENTAL</span><p className="text-xs text-slate-300 mt-0.5">Añadí aceite de oliva virgen extra, palta o nueces. Son vitales para tu concentración.</p></div>
      </div>
    );
  };

  const updateBloques = (m: string, g: string, d: string) => {
    setEvalContent(
      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-2">Cronograma de Bloques</div>
        {[
          { label: "🌅 Matutino", val: m, col: "text-orange-400" },
          { label: "📊 Gestión", val: g, col: "text-sky-400" },
          { label: "🚀 Deep Work", val: d, col: "text-purple-400" }
        ].map((block) => (
          <div key={block.label} className="p-2.5 bg-black/30 border border-white/[0.05] rounded-xl">
            <span className={`text-[10px] font-bold ${block.col}`}>{block.label}</span>
            <p className="text-xs text-white mt-0.5">{block.val || "—"}</p>
          </div>
        ))}
      </div>
    );
  };

  const calcFast = (f: string, a: string, s: string, t: string) => {
    if (!f && !a && !s && !t) return;
    let msg = "Completá todos los filtros."; let color = "text-slate-400"; let bg = "bg-white/[0.02] border-white/[0.05]";
    if (s === "si") { msg = "✅ APLICA REGLA O DELEGA. Existe una solución predeterminada."; color = "text-emerald-400"; bg = "bg-emerald-500/5 border-emerald-500/10"; }
    else if (f === "no" && a === "si" && t === "tranquilidad") { msg = "🟢 LUZ VERDE. Decisión alineada, reversible y generadora de tranquilidad."; color = "text-emerald-400"; bg = "bg-emerald-500/5 border-emerald-500/10"; }
    else if (f === "si") { msg = "⚠️ DECISIÓN CRÍTICA. Irreversible. Necesitás los Frameworks de Decisión avanzados."; color = "text-amber-400"; bg = "bg-amber-500/5 border-amber-500/10"; }
    else if (t === "tension") { msg = "⏸ PAUSA. Tu intuición detecta tensión. Analizá antes de actuar."; color = "text-red-400"; bg = "bg-red-500/5 border-red-500/10"; }
    setEvalContent(<div className={`p-4 rounded-xl border ${bg}`}><p className={`text-xs font-bold ${color} mb-1`}>Protocolo F.A.S.T.</p><p className="text-xs text-slate-300 leading-relaxed">{msg}</p></div>);
  };

  const generos = ["🎭 Comedia ligera", "👻 Terror o Suspenso", "💥 Acción o Aventura", "🎬 Drama Histórico", "🚀 Ciencia Ficción"];

  const CATS: { id: AsisCat; emoji: string; title: string; sub: string }[] = [
    { id: "comida", emoji: "🍽️", title: "¿Qué comer?", sub: "Variables de ingredientes, energía y plato estructurado." },
    { id: "tiempo", emoji: "🔮", title: "Gestión del tiempo", sub: "Sistemas de productividad e imprevistos." },
    { id: "ocio", emoji: "🎬", title: "Ocio y entertainment", sub: "Estrategias anti-scroll y gamificación." },
    { id: "fast", emoji: "✏️", title: "Otra decisión", sub: "Protocolo F.A.S.T. de filtrado rápido." },
  ];

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-orange-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Herramienta 1 · Decide Fácil</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">Asistente de Decisiones</h2>
        <p className="text-sm text-slate-400">Configura tus filtros o gamifica tus elecciones diarias para mitigar el sobreanálisis.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">1. ¿En qué área necesitás decidir hoy?</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {CATS.map(c => (
                <button key={c.id} onClick={() => selectCat(c.id)} className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${cat === c.id ? "border-amber-400/40 bg-amber-400/[0.04]" : "border-white/[0.06] bg-black/20 hover:border-white/10"}`}>
                  <span className="text-2xl">{c.emoji}</span>
                  <div><p className="text-sm font-semibold text-white">{c.title}</p><p className="text-[11px] text-slate-500 mt-0.5">{c.sub}</p></div>
                </button>
              ))}
            </div>
          </div>

          {/* COMIDA */}
          {cat === "comida" && (
            <div className="space-y-5 pt-4 border-t border-white/[0.05]">
              <div>
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 mb-2"><Calendar className="w-3.5 h-3.5 text-amber-400" /> 1. Menú Rotativo Semanal</h4>
                <div className="flex flex-wrap gap-1.5">
                  {DIAS.map((d, i) => (
                    <button key={d} onClick={() => cargarDia(d)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${diaMenu === d ? "bg-amber-400 text-black border-amber-400" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}>{DIAS_SHORT[i]}</button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 mb-2"><PieChart className="w-3.5 h-3.5 text-sky-400" /> 2. Constructor de Plato Inteligente</h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: "50% VEGETALES", col: "text-emerald-400", val: veg, setter: setVeg, opts: [["Hojas verdes", "Hojas verdes (Espinaca, rúcula)"], ["Fibrosos", "Vegetales fibrosos (Brócoli, coliflor)"]] },
                    { label: "25% PROTEÍNAS", col: "text-orange-400", val: prot, setter: setProt, opts: [["Pollo / Pavo", "Pollo / Pavo magro"], ["Pescado", "Pescado (Salmón/Atún)"], ["Huevos", "Huevos"], ["Legumbres", "Legumbres / Tofu"]] },
                    { label: "25% CARBOHIDRATOS", col: "text-sky-400", val: carb, setter: setCarb, opts: [["Arroz / Quinoa", "Arroz integral / Quinoa"], ["Papa / Batata", "Papa / Batata al horno"], ["Avena", "Avena / Legumbres"]] }
                  ].map((block) => (
                    <div key={block.label} className="p-3 bg-black/40 border border-white/[0.05] rounded-xl space-y-2">
                      <span className={`text-[10px] font-bold block ${block.col}`}>{block.label}</span>
                      <select
                        value={block.val}
                        onChange={e => {
                          block.setter(e.target.value);
                          auditarPlato(
                            block.label.includes("VEG") ? e.target.value : veg,
                            block.label.includes("PROT") ? e.target.value : prot,
                            block.label.includes("CARB") ? e.target.value : carb
                          );
                        }}
                        className="w-full bg-[#0A0F1D] text-xs text-slate-200 border border-white/10 rounded p-1.5 outline-none"
                      >
                        <option value="">-- Selecciona --</option>
                        {block.opts.map(([k, v]) => <option key={k} value={v}>{k}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 mb-2"><CheckSquare className="w-3.5 h-3.5 text-purple-400" /> 3. Auditoría de Supervivencia</h4>
                <div className="grid sm:grid-cols-3 gap-2">
                  {[
                    { id: "prot", label: "Tengo una Proteína", state: audProt, setter: setAudProt },
                    { id: "veg", label: "Tengo Vegetales", state: audVeg, setter: setAudVeg },
                    { id: "carb", label: "Tengo Carbohidratos", state: audCarb, setter: setAudCarb }
                  ].map((item) => (
                    <label key={item.id} className="flex items-center gap-2.5 p-2.5 bg-black/30 border border-white/[0.05] rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={e => {
                          item.setter(e.target.checked);
                          const np = item.id === "prot" ? e.target.checked : audProt;
                          const nv = item.id === "veg" ? e.target.checked : audVeg;
                          const nc = item.id === "carb" ? e.target.checked : audCarb;
                          if (np && nv && nc) setEvalContent(
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-2">
                              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs"><CheckCircle className="w-4 h-4" /> Criterio Mínimo Cubierto</div>
                              <p className="text-xs text-slate-300 leading-relaxed">Combinalos con la <strong>Técnica del Bowl</strong> o el <strong>Plato Único</strong>. Añadí aceite de oliva y almorzá sin fatiga mental.</p>
                            </div>
                          );
                        }}
                        className="w-4 h-4 accent-amber-400"
                      />
                      <span className="text-xs text-slate-300">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/[0.05] pt-3 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">¿Bloqueo total? Evitá pensar con un clic:</span>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <button onClick={() => setEvalContent(<div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl"><p className="text-[10px] font-bold text-amber-400 uppercase">🍕 Menú Ruleta</p><p className="text-xs text-slate-300 mt-1">El azar ha dictaminado: Salteado rápido de Pollo/Tofu con vegetales. Cerrá aplicaciones de delivery.</p></div>)} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-between transition-all"><span>🍕 Ruleta de Menú Rotativo</span><span className="text-[10px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded">Azar</span></button>
                  <button onClick={() => setEvalContent(<div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"><p className="text-[10px] font-bold text-emerald-400 uppercase">🥗 Regla Geométrica</p><p className="text-xs text-slate-300 mt-1">Dividí el plato: 50% vegetales verdes, 25% proteína magra, 25% carbohidratos complejos.</p></div>)} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-between transition-all"><span>🥗 Regla Geométrica del Plato</span><span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Estructura</span></button>
                </div>
              </div>
            </div>
          )}

          {/* TIEMPO */}
          {cat === "tiempo" && (
            <div className="space-y-5 pt-4 border-t border-white/[0.05]">
              <div>
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 mb-2"><Sliders className="w-3.5 h-3.5 text-amber-400" /> 1. Selector de Sistemas de Productividad</h4>
                <div className="grid sm:grid-cols-3 gap-2">
                  {[
                    { label: "Matriz Eisenhower", title: "📊 MATRIZ EISENHOWER", desc: "1. Urgente+Importante (Haz ya). 2. Importante No Urgente (Agenda). 3. Urgente No Importante (Delega). 4. Elimina distractores.", col: "text-sky-400", bg: "bg-sky-500/5 border-sky-500/10" },
                    { label: "Método Ivy Lee", title: "📝 MÉTODO IVY LEE", desc: "Escribe estrictamente 6 tareas cruciales para mañana. Trabaja en la #1 de forma exclusiva.", col: "text-purple-400", bg: "bg-purple-500/5 border-purple-500/10" },
                    { label: "Comerse el Sapo", title: "🐸 COMERSE EL SAPO", desc: "Identifica la tarea más pesada del día y ejecútala a primera hora de la mañana.", col: "text-orange-400", bg: "bg-orange-500/5 border-orange-500/10" }
                  ].map((sys) => (
                    <button key={sys.label} onClick={() => setEvalContent(<div className={`p-4 rounded-xl border ${sys.bg}`}><p className={`text-[10px] font-bold uppercase ${sys.col}`}>{sys.title}</p><p className="text-xs text-slate-300 mt-1 leading-relaxed">{sys.desc}</p></div>)} className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-all">{sys.label}</button>
                  ))}
                </div>
              </div>
              <div className="bg-black/20 border border-white/[0.05] rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-sky-400" /> 2. Bloques Estrictos de Tiempo</h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "bloque-matutino", ph: "🌅 Matutino / Acción Profunda...", val: matutino, setter: setMatutino },
                    { id: "bloque-gestion", ph: "📊 Gestión / Reactivo...", val: gestion, setter: setGestion },
                    { id: "bloque-deep", ph: "🚀 Deep Work de Cierre...", val: deep, setter: setDeep }
                  ].map((block) => (
                    <input
                      key={block.id}
                      type="text"
                      value={block.val}
                      onChange={e => {
                        block.setter(e.target.value);
                        updateBloques(
                          block.id === "bloque-matutino" ? e.target.value : matutino,
                          block.id === "bloque-gestion" ? e.target.value : gestion,
                          block.id === "bloque-deep" ? e.target.value : deep
                        );
                      }}
                      placeholder={block.ph}
                      className="w-full bg-[#0A0F1D] border border-white/10 text-xs rounded px-3 py-2 text-slate-200 outline-none focus:border-amber-400/40 transition-colors"
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 mb-2"><AlertCircle className="w-3.5 h-3.5 text-red-400" /> 3. Filtro de Imprevistos y Urgencias</h4>
                <div className="bg-black/30 border border-white/[0.05] rounded-xl p-4 space-y-3">
                  {[
                    { id: "dosmin", label: "¿Toma menos de 2 minutos?", val: dosmin, setter: setDosmin, opts: [["si", "Sí, de inmediato (< 2 min)"], ["no", "No, requiere más tiempo"]] },
                    { id: "pareto", label: "¿Pertenece al 20% estratégico? (Pareto)", val: pareto, setter: setPareto, opts: [["si", "Sí, es estratégico (80/20)"], ["no", "No, es secundario operativo"]] }
                  ].map((filter) => (
                    <div key={filter.id} className="grid grid-cols-3 items-center gap-2">
                      <label className="col-span-2 text-xs text-slate-300"><strong>{filter.label}</strong></label>
                      <select
                        value={filter.val}
                        onChange={e => {
                          filter.setter(e.target.value);
                          const nd = filter.id === "dosmin" ? e.target.value : dosmin;
                          const np = filter.id === "pareto" ? e.target.value : pareto;
                          if (nd === "si") setEvalContent(<div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"><p className="text-[10px] font-bold text-emerald-400 uppercase">⚡ Acción Inmediata</p><p className="text-xs text-slate-300 mt-1">Toma menos de 2 minutos. Ejecútalo ya sin agendar.</p></div>);
                          else if (np === "si") setEvalContent(<div className="p-4 bg-sky-500/5 border border-sky-500/10 rounded-xl"><p className="text-[10px] font-bold text-sky-400 uppercase">🎯 Actividad 80/20</p><p className="text-xs text-slate-300 mt-1">Pertenece al 20% estratégico. Muévelo al próximo bloque Deep Work.</p></div>);
                          else if (nd === "no" && np === "no") setEvalContent(<div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl"><p className="text-[10px] font-bold text-purple-400 uppercase">⏳ Rechazado al Bloque Reactivo</p><p className="text-xs text-slate-300 mt-1">No es estratégico ni rápido. Agenda para el bloque reactivo de la tarde.</p></div>);
                        }}
                        className="bg-[#0A0F1D] text-xs border border-white/10 text-slate-200 rounded p-1.5 outline-none"
                      >
                        <option value="">-- Seleccionar --</option>
                        {filter.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* OCIO */}
          {cat === "ocio" && (
            <div className="space-y-5 pt-4 border-t border-white/[0.05]">
              <div>
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 mb-2"><Dices className="w-3.5 h-3.5 text-amber-400" /> Métodos de Selección Rápida</h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <button onClick={() => { const r = generos[Math.floor(Math.random() * generos.length)]; setEvalContent(<div className="p-4 bg-white/5 border border-white/10 rounded-xl"><p className="text-[10px] font-bold text-amber-400 uppercase">🎲 Dado de Géneros</p><p className="text-xs text-slate-300 mt-1">El azar ha dictaminado: <strong>{r}</strong>. Abre tu catálogo, filtra ese género y poné la primera opción.</p></div>); }} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-between transition-all"><span>🎲 Lanzar el Dado de Géneros</span><span className="bg-amber-400/20 text-amber-400 text-[10px] px-2 py-0.5 rounded">Azar</span></button>
                  <button onClick={() => setEvalContent(<div className="p-4 bg-sky-500/5 border border-sky-500/10 rounded-xl"><p className="text-[10px] font-bold text-sky-400 uppercase">✌️ Segunda Opción</p><p className="text-xs text-slate-300 mt-1">Quando dudes entre opciones, descartá instantáneamente tu primera alternativa y ve a la segunda.</p></div>)} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-between transition-all"><span>✌️ Regla de la "Segunda Opción"</span><span className="bg-sky-500/20 text-sky-400 text-[10px] px-2 py-0.5 rounded">Algoritmo</span></button>
                  <button onClick={() => setEvalContent(<div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl"><p className="text-[10px] font-bold text-purple-400 uppercase">⏳ Filtro de 3 Opciones</p><p className="text-xs text-slate-300 mt-1">Buscá únicamente 3 opciones. Si en 5 minutos no convencen, descartá en bloque y buscá 3 nuevas.</p></div>)} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-between transition-all"><span>⏳ El Filtro de las 3 Opciones</span><span className="bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded">Tiempo</span></button>
                  <a href="https://wheelofnames.com/es/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-between transition-all"><span>🎡 Ruleta Aleatoria Externa</span><ExternalLink className="w-3.5 h-3.5 text-slate-500" /></a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 mb-2 mt-1">Atajos de Catálogo Estructurado</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[["https://www.netflix.com/tudum/top10", "🔴 Netflix Top 10", "hover:border-red-500/40"], ["https://www.imdb.com/chart/top/", "🟡 IMDb Top 250", "hover:border-amber-500/40"], ["https://letterboxd.com/films/by/rating/", "🟢 Letterboxd", "hover:border-emerald-500/40"]].map(([url, label, hov]) => (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={`p-2 bg-black/40 border border-white/[0.05] ${hov} rounded-xl text-xs flex items-center justify-center text-slate-300 transition-colors`}>{label}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 mb-2"><EyeOff className="w-3.5 h-3.5 text-purple-400" /> Desconexión Analógica</h4>
                <button onClick={() => { const acts = ["📖 Lee un capítulo completo de un libro físico.", "🎙️ Escucha un pódcast temático haciendo estiramientos manuales.", "🃏 Juega una partida rápida analógica de solitario de cartas."]; setEvalContent(<div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl"><p className="text-[10px] font-bold text-purple-400 uppercase">🌲 Actividad Analógica</p><p className="text-xs text-slate-300 mt-1">{acts[Math.floor(Math.random() * acts.length)]}</p></div>); }} className="w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-xl text-xs font-bold text-purple-300 transition-colors">🌲 Sugerir Actividad Analógica Aleatoria</button>
              </div>
            </div>
          )}

          {/* F.A.S.T */}
          {cat === "fast" && (
            <div className="space-y-4 pt-4 border-t border-white/[0.05]">
              <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Protocolo de los 4 Filtros (F.A.S.T.)</h4>
              <div className="bg-black/30 border border-white/[0.05] rounded-xl p-4 space-y-3">
                {[
                  { id: "fatidica", label: "1. ¿Es Fatídica?", hint: "Irreversible/Alto riesgo", val: fatidica, setter: setFatidica, opts: [["no", "No, es reversible"], ["si", "Sí, es irreversible"]] },
                  { id: "alinea", label: "2. ¿Se Alinea a largo plazo?", hint: "", val: alinea, setter: setAlinea, opts: [["si", "Sí, apoya mis metas"], ["no", "No, es distracción"]] },
                  { id: "solucion", label: "3. ¿Existe solución predeterminada?", hint: "", val: solucion, setter: setSolucion, opts: [["no", "No, requiere decisión"], ["si", "Sí, aplicar regla/delegar"]] },
                  { id: "tranquilidad", label: "4. ¿Trae Tranquilidad o Tensión?", hint: "", val: tranquilidad, setter: setTranquilidad, opts: [["tranquilidad", "Tranquilidad / Alivio"], ["tension", "Tensión / Incomodidad"]] }
                ].map((filter) => (
                  <div key={filter.id} className="grid grid-cols-3 items-center gap-2 pt-2 first:pt-0 border-t border-white/[0.03] first:border-0">
                    <label className="col-span-2 text-xs text-slate-300"><strong>{filter.label}</strong>{filter.hint && <span className="text-slate-500 font-normal"> ({filter.hint})</span>}</label>
                    <select
                      value={filter.val}
                      onChange={e => {
                        filter.setter(e.target.value);
                        calcFast(
                          filter.id === "fatidica" ? e.target.value : fatidica,
                          filter.id === "alinea" ? e.target.value : alinea,
                          filter.id === "solucion" ? e.target.value : solucion,
                          filter.id === "tranquilidad" ? e.target.value : tranquilidad
                        );
                      }}
                      className="bg-[#0A0F1D] text-xs border border-white/10 text-slate-200 rounded p-1.5 outline-none"
                    >
                      <option value="">-- Seleccionar --</option>
                      {filter.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <EvalBox>{evalContent}</EvalBox>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOL 2 — FRAMEWORKS DE DECISIÓN
// ─────────────────────────────────────────────────────────────────────────────
const CRITERIA_DEF = [{ label: "Crecimiento", w: 3 }, { label: "Libertad", w: 3 }, { label: "Estabilidad", w: 3 }, { label: "Impacto", w: 3 }];

function Frameworks({ onBack }: { onBack: () => void }) {
  const [sub, setSub] = useState<"matriz" | "ebdm">("matriz");

  // Matriz
  const [criteria, setCriteria] = useState(CRITERIA_DEF);
  const [options, setOptions] = useState(["Opción A", "Opción B", "Opción C"]);
  const [scores, setScores] = useState<number[][][]>(Array(4).fill(0).map(() => Array(3).fill(0).map(() => [5])));

  const getScore = (ci: number, oi: number) => scores[ci]?.[oi]?.[0] ?? 5;
  const setScore = (ci: number, oi: number, v: number) => {
    const s = scores.map(r => r.map(c => [...c]));
    if (!s[ci]) s[ci] = Array(3).fill(0).map(() => [5]);
    s[ci][oi] = [v];
    setScores(s);
  };

  const totals = options.map((_, oi) => criteria.reduce((sum, c, ci) => sum + getScore(ci, oi) * c.w, 0));
  const maxPossible = criteria.reduce((s, c) => s + 10 * c.w, 0);

  const renderCard = (name: string, pts: number) => {
    const pct = Math.round((pts / maxPossible) * 100);
    const [color, label] = pts >= 150 ? ["text-emerald-400", "Decisión excelente."] : pts >= 100 ? ["text-sky-400", "Buena opción."] : pts >= 50 ? ["text-amber-400", "Opción mediocre."] : ["text-red-400", "Descarta."];
    return <div key={name} className="p-3 bg-black/30 border border-white/[0.05] rounded-xl"><div className="flex justify-between items-center mb-0.5"><span className="text-xs font-semibold text-white">{name}</span><span className={`text-xs font-black ${color}`}>{pts} pts ({pct}%)</span></div><span className={`text-[10px] ${color}`}>{label}</span></div>;
  };

  // EBDM
  const [ebdmP1, setEbdmP1] = useState("");
  const [ebdmDatos, setEbdmDatos] = useState(""); 
  const [ebdmExp, setEbdmExp] = useState(""); 
  const [ebdmVal, setEbdmVal] = useState("");
  const [ebdmAlts, setEbdmAlts] = useState(["Opción Obvia / Tradicional", "Opción Alternativa Disruptiva", "No hacer absolutamente nada"]);
  const [ebdmT, setEbdmT] = useState(["", "", ""]);

  const ebdmScore = !ebdmP1 || !ebdmDatos ? 0 : 50 + (ebdmExp ? 25 : 0) + (ebdmVal ? 25 : 0);

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-sky-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-1">Herramienta 2 · Decide Fácil</p>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">Frameworks de Decisión</h2>
          <p className="text-sm text-slate-400">Estructuras analíticas para pausar el Sistema 1 intuitivo y forzar el Sistema 2 analítico.</p>
        </div>
        <div className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-xl shrink-0">
          <button onClick={() => setSub("matriz")} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${sub === "matriz" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}>Matriz Ponderada</button>
          <button onClick={() => setSub("ebdm")} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${sub === "ebdm" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}>Modelo EBDM</button>
        </div>
      </div>

      {sub === "matriz" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-3">1. Define tus criterios (máx 4)</div>
              <div className="space-y-2">
                {criteria.map((c, ci) => (
                  <div key={ci} className="grid grid-cols-4 gap-2 items-center">
                    <input value={c.label} onChange={e => { const cr = [...criteria]; cr[ci] = { ...cr[ci], label: e.target.value }; setCriteria(cr); }} className="col-span-3 bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-400/40 transition-colors" />
                    <select value={c.w} onChange={e => { const cr = [...criteria]; cr[ci] = { ...cr[ci], w: +e.target.value }; setCriteria(cr); }} className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-slate-300 outline-none">
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>Peso {n}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-3">2. Opciones a evaluar</div>
              <div className="grid grid-cols-3 gap-3">
                {options.map((o, i) => <input key={i} value={o} onChange={e => { const op = [...options]; op[i] = e.target.value; setOptions(op); }} className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-400/40 transition-colors" />)}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-3">3. Puntúa cada opción por criterio (1–10)</div>
              <div className="overflow-x-auto border border-white/[0.05] rounded-xl bg-black/20">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[10px] font-bold text-slate-500 uppercase bg-black/40">
                      <th className="p-3">Criterio / Peso</th>
                      {options.map((o, i) => <th key={i} className="p-3 text-center">{o}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {criteria.map((c, ci) => (
                      <tr key={ci} className="border-t border-white/[0.04]">
                        <td className="p-3 text-slate-300">{c.label} <span className="text-amber-400 font-bold">×{c.w}</span></td>
                        {options.map((_, oi) => (
                          <td key={oi} className="p-2">
                            <select value={getScore(ci, oi)} onChange={e => setScore(ci, oi, +e.target.value)} className="w-full bg-[#0A0F1D] border border-white/10 rounded p-1.5 text-xs text-white text-center outline-none">
                              {Array.from({ length: 10 }, (_, k) => k + 1).map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <EvalBox>
            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Resultado ponderado</div>
            <div className="space-y-2">{options.map((o, i) => renderCard(o, totals[i]))}</div>
            <div className="pt-3 border-t border-white/[0.05]">
              {[["≥150", "Excelente. Alta alineación.", "text-emerald-400"], ["100–149", "Buena opción. Revisá criterios.", "text-sky-400"], ["50–99", "Mediocre. Reconsiderá.", "text-amber-400"], ["<50", "Descarta. No alineada.", "text-red-400"]].map(([r, l, c]) => (
                <div key={r} className="flex justify-between py-1.5 border-b border-white/[0.04] last:border-0"><span className={`text-xs font-bold ${c}`}>{r}</span><span className="text-xs text-slate-400">{l}</span></div>
              ))}
            </div>
          </EvalBox>
        </div>
      )}

      {sub === "ebdm" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
            <div>
              <label className="text-xs font-bold text-white uppercase block mb-2">1. Definir el problema</label>
              <input type="text" value={ebdmP1} onChange={e => setEbdmP1(e.target.value)} placeholder="Describe el problema en una sola oración objetiva. Separa hechos de emociones..." className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-sky-400/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-white uppercase block mb-2">2. Recopilar evidencia disponible (Los 3 Pilares)</label>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { ph: "Datos objetivos / Métricas...", val: ebdmDatos, setter: setEbdmDatos },
                  { ph: "Experiencia profesional previa...", val: ebdmExp, setter: setEbdmExp },
                  { ph: "Valores, prioridades y límites reales...", val: ebdmVal, setter: setEbdmVal }
                ].map((pilar) => (
                  <textarea key={pilar.ph} value={pilar.val} onChange={e => pilar.setter(e.target.value)} placeholder={pilar.ph} rows={4} className="w-full bg-[#0A0F1D] border border-white/10 rounded-lg p-2 text-xs text-white resize-none outline-none focus:border-sky-400/40 transition-colors" />
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-white uppercase block mb-2">3. Generar al menos tres alternativas estructurales</label>
              <div className="space-y-2">
                {ebdmAlts.map((a, i) => <input key={i} value={a} onChange={e => { const al = [...ebdmAlts]; al[i] = e.target.value; setEbdmAlts(al); }} className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-sky-400/40 transition-colors" />)}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-white uppercase block mb-2">4. Análisis Temporal 10-10-10</label>
              <div className="grid sm:grid-cols-3 gap-3">
                {["¿En 10 minutos?", "¿En 10 meses?", "¿En 10 años?"].map((ph, i) => (
                  <input key={i} value={ebdmT[i]} onChange={e => { const t = [...ebdmT]; t[i] = e.target.value; setEbdmT(t); }} placeholder={ph} className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white outline-none focus:border-sky-400/40 transition-colors" />
                ))}
              </div>
            </div>
          </div>
          <EvalBox>
            <div className="text-xs font-bold text-white uppercase mb-2">Veredicto Racional</div>
            {ebdmScore === 0 ? (
              <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                <p className="text-[10px] font-bold text-amber-400 uppercase">📊 Diagnóstico en Espera</p>
                <p className="text-xs text-slate-400 mt-1">Completá la definición del problema y los datos objetivos.</p>
              </div>
            ) : (
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-2">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-emerald-400">Robustez Cognitiva</span><span className="font-mono text-white text-sm font-black">{ebdmScore}%</span></div>
                <p className="text-[11px] text-slate-300 leading-relaxed">Lógica activa. Has pausado el Sistema 1 intuitivo. Tus alternativas y el análisis 10-10-10 están mitigando sesgos adaptativos.</p>
              </div>
            )}
            <Button onClick={() => alert("Plan EBDM compilado")} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs gap-2 mt-2">
              <CheckSquare className="w-3.5 h-3.5" /> 5. Decidir y Evaluar Plan
            </Button>
          </EvalBox>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOL 3 — AUTOMATIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────
type AutoFieldKey = "desayuno" | "ropa" | "tarea" | "almuerzo" | "filtro" | "reunion" | "cena" | "pantalla" | "preparar";
type AutoRow = { label: string; key: AutoFieldKey; ph: string; type?: "select" };
type AutoSection = { emoji: string; name: string; colCls: string; tag: string; tagCls: string; rows: AutoRow[] };

const AUTO_SECTIONS: AutoSection[] = [
  {
    emoji: "🌅 Mañana", name: "manana", colCls: "text-orange-400",
    tag: "Ask & Acquire", tagCls: "bg-orange-500/10 border-orange-500/20 text-orange-400 font-mono",
    rows: [
      { label: "¿Qué desayunar?", key: "desayuno", ph: "Café negro + Huevos..." },
      { label: "¿Qué ropa usar?", key: "ropa", ph: "Ej: Uniforme de stock..." },
      { label: "¿Qué tarea priorizar?", key: "tarea", ph: "Ej: Intervención más efectiva..." },
    ],
  },
  {
    emoji: "☀️ Tarde", name: "tarde", colCls: "text-sky-400",
    tag: "Appraise & Apply", tagCls: "bg-sky-500/10 border-sky-500/20 text-sky-400 font-mono",
    rows: [
      { label: "¿Qué almorzar?", key: "almuerzo", ph: "Ej: Menú estructural guardado..." },
      { label: "¿Seguir o cambiar?", key: "filtro", ph: "", type: "select" },
      { label: "¿Reunión o profundo?", key: "reunion", ph: "Ej: Bloque Fijo de Cierre..." },
    ],
  },
  {
    emoji: "🌙 Noche", name: "noche", colCls: "text-purple-400",
    tag: "Assess & Cierre", tagCls: "bg-purple-500/10 border-purple-500/20 text-purple-400 font-mono",
    rows: [
      { label: "¿Qué cenar?", key: "cena", ph: "Ej: Proteína magra limpia..." },
      { label: "¿Pantalla o descanso?", key: "pantalla", ph: "Desconexión analógica..." },
      { label: "¿Preparar mañana?", key: "preparar", ph: "Ej: Listar 6 tareas Ivy Lee..." },
    ],
  },
];

function Automatizacion({ onBack }: { onBack: () => void }) {
  const [fields, setFields] = useState<Record<AutoFieldKey, string>>({
    desayuno: "Café negro + Huevos revueltos (Fijo)",
    ropa: "",
    tarea: "",
    almuerzo: "",
    filtro: "",
    reunion: "",
    cena: "",
    pantalla: "Desconexión analógica sugerida aleatoria",
    preparar: ""
  });
  const [energy, setEnergy] = useState(7);
  
  const setF = (k: AutoFieldKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFields(prev => ({ ...prev, [k]: e.target.value }));

  const FIELD_KEYS: AutoFieldKey[] = ["desayuno", "ropa", "tarea", "almuerzo", "filtro", "reunion", "cena", "pantalla", "preparar"];
  const filled = FIELD_KEYS.filter(k => fields[k].trim() !== "").length;

  const scoreLabel = filled === 9 ? "Nivel Experto. Piloto automático." : filled >= 6 ? "Buen nivel. Optimizá 1-2 áreas." : "Alerta. La fatiga decisional te está frenando.";
  const scoreColor = filled === 9 ? "text-purple-400" : filled >= 6 ? "text-sky-400" : "text-red-400";
  const energyLabel = energy >= 8 ? "Día de decisiones grandes. Lóbulo óptimo." : energy >= 5 ? "Mantené rutinas, evitá lo nuevo." : "Solo esencial. Delegá o posponé.";
  const energyColor = energy >= 8 ? "text-emerald-400" : energy >= 5 ? "text-purple-400" : "text-red-400";

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-purple-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">Herramienta 3 · Decide Fácil</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">Automatización Diaria (Modelo EBP)</h2>
        <p className="text-sm text-slate-400">Reducí la fatiga decisional del lóbulo frontal. Pre-decidí tus rutinas para no gastar energía mental en lo cotidiano.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          {AUTO_SECTIONS.map(section => (
            <div key={section.name} className="space-y-3">
              <h3 className={`text-xs font-bold ${section.colCls} uppercase tracking-wider flex items-center gap-2`}>
                {section.emoji}
                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${section.tagCls}`}>{section.tag}</span>
              </h3>
              <div className="space-y-2">
                {section.rows.map(row => (
                  <div key={row.key} className="grid grid-cols-3 items-center gap-2">
                    <label className="text-xs text-slate-300">{row.label}</label>
                    {row.type === "select" ? (
                      <select value={fields[row.key]} onChange={setF(row.key)} className="col-span-2 bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 outline-none">
                        <option value="">-- Seleccionar Protocolo --</option>
                        <option value="cochrane">Filtrar con Metaanálisis Centro Cochrane (Appraise)</option>
                        <option value="epistemonikos">Estructurar con Epistemonikos (Apply)</option>
                      </select>
                    ) : (
                      <input type="text" value={fields[row.key]} placeholder={row.ph} onChange={setF(row.key)} className="col-span-2 bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-purple-400/40 transition-colors" />
                    )}
                  </div>
                ))}
              </div>
              <hr className="border-white/[0.05]" />
            </div>
          ))}
          <div className="bg-black/20 border border-white/[0.05] p-4 rounded-xl">
            <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 mb-3"><BatteryCharging className="w-4 h-4 text-amber-400" /> Check-in de Energía</h4>
            <NumBar value={energy} onChange={setEnergy} color="purple" />
          </div>
        </div>
        <EvalBox>
          <EvalStat label="Nivel de Automatización" value={`${filled} / 9`} note={scoreLabel} color={scoreColor} />
          <EvalStat label="Tu Energía Hoy" value={`${energy} / 10`} note={energyLabel} color={energyColor} />
          <div className="pt-2 border-t border-white/[0.05]">
            {[["9/9", "Nivel Experto.", "text-purple-400"], ["6–8", "Buen nivel.", "text-sky-400"], ["3–5", "Nivel medio.", "text-amber-400"], ["0–2", "Alerta fatiga.", "text-red-400"]].map(([r, l, c]) => (
              <div key={r} className="flex justify-between py-1.5 border-b border-white/[0.04] last:border-0"><span className={`text-xs font-bold ${c}`}>{r}</span><span className="text-xs text-slate-400">{l}</span></div>
            ))}
          </div>
          <Button onClick={() => alert("Políticas consolidadas.")} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs gap-2 mt-2">
            <Download className="w-3.5 h-3.5" /> Descargar Resultados
          </Button>
        </EvalBox>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOL 4 — CONTENIDO EDUCATIVO
// ─────────────────────────────────────────────────────────────────────────────
function Educativo({ onBack }: { onBack: () => void }) {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [clarity, setClarity] = useState(7);

  const setA = (i: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); };
  const totalChars = answers.reduce((s, a) => s + a.trim().length, 0);

  const feedbackTxt = clarity >= 8
    ? (totalChars > 50 ? "Alta autoconciencia. Criterio analítico claro (Sistema 2 activo)." : "Alta autoconciencia. Criterio claro. Se recomienda escribir más.")
    : clarity >= 5 ? "Nivel funcional. Identificá tus patrones bajo presión y trabajá en ellos."
    : "Baja claridad decisional. Alerta de fatiga frontal detectada. Necesitás estructura.";
  const feedbackColor = clarity >= 8 ? "text-emerald-400" : clarity >= 5 ? "text-sky-400" : "text-red-400";

  const QUESTIONS = [
    "¿Cuál fue la mejor decisión que tomaste este mes? ¿Por qué funcionó?",
    "¿Qué patrón repetís cuando estás bajo presión? (postergar, impulsividad, delegar)",
    "¿Qué decisión estás evitando ahora mismo? ¿Qué te frena?",
    "Si pudieras mejorar UNA cosa de cómo decidís, ¿cuál sería?",
  ];

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Herramienta 4 · Decide Fácil</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">Contenido Educativo</h2>
        <p className="text-sm text-slate-400">Reflexiones guiadas para fortalecer tu criterio decisional. Respondé con honestidad.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          {QUESTIONS.map((q, i) => (
            <div key={i}>
              <label className="text-xs font-bold text-white uppercase block mb-2">{i + 1}. {q}</label>
              <textarea value={answers[i]} onChange={setA(i)} placeholder="Escribí tu reflexión..." rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white resize-none outline-none focus:border-emerald-400/40 transition-colors" />
            </div>
          ))}
          <div>
            <label className="text-xs font-bold text-white uppercase block mb-3">5. Autoevaluá tu claridad decisional hoy (1–10)</label>
            <NumBar value={clarity} onChange={setClarity} color="emerald" />
          </div>
        </div>
        <EvalBox>
          <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Tu Nivel de Autoconciencia</span>
            <div className="text-4xl font-black text-amber-400">{clarity}</div>
            <span className="text-[10px] text-slate-500">claridad / 10</span>
            <p className={`text-xs font-medium mt-2 leading-relaxed ${feedbackColor}`}>{feedbackTxt}</p>
          </div>
          <div className="border-t border-white/[0.05] pt-3">
            {[["8–10", "Alta autoconciencia.", "Criterio claro.", "text-emerald-400"], ["5–7", "Nivel funcional.", "Trabajá tus patrones.", "text-sky-400"], ["1–4", "Baja claridad.", "Necesitás estructura.", "text-red-400"]].map(([r, l, s, c]) => (
              <div key={r} className="flex justify-between items-start py-2 border-b border-white/[0.04] last:border-0"><span className={`text-xs font-bold ${c} w-10`}>{r}</span><span className="text-xs text-slate-400 text-right"><strong className="text-slate-300 block">{l}</strong>{s}</span></div>
            ))}
          </div>
          <div className="p-3 bg-amber-500/5 border border-amber-400/10 rounded-xl">
            <span className="text-[10px] font-bold text-amber-400 block uppercase mb-1">Señales de Alerta</span>
            <ul className="space-y-1 list-disc pl-4 text-[11px] text-slate-400"><li>No podés nombrar tu patrón.</li><li>Llevás semanas evitando una decisión.</li><li>No recordás tu última buena decisión.</li></ul>
          </div>
          <Button onClick={() => alert("Bitácora guardada")} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs gap-2">
            <Download className="w-3.5 h-3.5" /> Descargar Resultados
          </Button>
        </EvalBox>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA PARA LAS SECCIONES DE INICIO
// ─────────────────────────────────────────────────────────────────────────────
const TOOLS_HOME = [
  { id: "asistente" as Tab, icon: Zap, border: "hover:border-orange-500/50", iconBg: "bg-orange-500/10 text-orange-400", badge: "text-orange-400", num: "Herramienta 1", title: "Asistente Dinámico", desc: "Filtros interactivos para comidas, rutinas, ocio y decisiones imprevistas de forma inmediata. Protocolos F.A.S.T., menú rotativo y gamificación.", cta: "Abrir Asistente", ctaColor: "text-orange-400 group-hover:text-orange-300" },
  { id: "frameworks" as Tab, icon: Columns, border: "hover:border-sky-400/50", iconBg: "bg-sky-500/10 text-sky-400", badge: "text-sky-400", num: "Herramienta 2", title: "Frameworks de Decisión", desc: "Estructuras analíticas avanzadas: Matriz de Decisión Ponderada y Modelo Racional basado en Evidencia (EBDM) con análisis temporal 10-10-10.", cta: "Ver Frameworks", ctaColor: "text-sky-400 group-hover:text-sky-300" },
  { id: "automatizacion" as Tab, icon: RefreshCw, border: "hover:border-purple-400/50", iconBg: "bg-purple-500/10 text-purple-400", badge: "text-purple-400", num: "Herramienta 3", title: "Automatización Diaria", desc: "Reglas fijas preestablecidas para eliminar decisiones repetitivas de tu rutina. Modelo EBP con check-in de energía y piloto automático.", cta: "Configurar", ctaColor: "text-purple-400 group-hover:text-purple-300" },
  { id: "educativo" as Tab, icon: BookOpen, border: "hover:border-emerald-400/50", iconBg: "bg-emerald-500/10 text-emerald-400", badge: "text-emerald-400", num: "Herramienta 4", title: "Contenido Educativo", desc: "Reflexiones guiadas y bitácora clínica adaptada para fortalecer tu autoconciencia decisional. Identifica patrones y refuerza el Sistema 2 analítico.", cta: "Explorar", ctaColor: "text-emerald-400 group-hover:text-emerald-300" },
];

const PREMIUM_TOOLS = [
  { icon: Map, badge: "GUÍA PASO A PASO", title: "El Caminito de Decisiones Simples", resolve: "Recaídas en la parálisis por análisis", desc: "Un framework interactivo diseñado para trazar rutas decisionales cotidianas ultra-efectivas. Automatiza elecciones repetitivas para que nunca vuelvas a congelarte.", img: "/api/placeholder/400/250" },
  { icon: Layers, badge: "CHECKLIST INTERACTIVO", title: "La Caja de Herramientas Mentales", resolve: "Estrés por sobrecarga mental", desc: "Colección modular de estrategias ejecutivas y ejercicios de descompresión para momentos de alta presión. Tu kit de primeros auxilios mentales.", img: "/api/placeholder/400/250" },
  { icon: ShieldAlert, badge: "WORKBOOK", title: "Estableciendo Límites Decisionales", resolve: "Dificultades para establecer límites", desc: "Cuaderno analítico para auditar y segmentar las fronteras de tu buffer. Aprende a decir 'esto no es mi decisión' sin culpa.", img: "/api/placeholder/400/250" },
  { icon: Sparkles, badge: "HOJA DE RUTA", title: "El Jugador de Energía Mental", resolve: "Culpa al pedir ayuda en decisiones", desc: "Estructura cartográfica que redefine el apalancamiento de opiniones externas. Delegar y recolectar perspectivas no es vulnerabilidad; es estrategia.", img: "/api/placeholder/400/250" },
  { icon: RefreshCw, badge: "PLAN DE ACCIÓN", title: "Reingeniería de Hábitos Decisionales", resolve: "Mantenimiento de energía mental", desc: "Plan secuencial enfocado en el rediseño de tus conductas diarias automáticas. Migración hacia sistemas de bajo desgaste cognitivo y alta durabilidad.", img: "/api/placeholder/400/250" },
  { icon: HeartHandshake, badge: "GUÍA PASO A PASO", title: "Rutas de Decisión en Comunidad", resolve: "Soporte para decisiones complejas", desc: "La guía para crear lazos con otros, compartiendo experiencias de decisiones y apoyándose mutuamente. No tienes que hacerlo solo.", img: "/api/placeholder/400/250" },
];

function Home({ onSelect }: { onSelect: (t: Tab) => void }) {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6 space-y-4">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">Decide Fácil</h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Optimizá tu energía cognitiva. Un entorno diseñado para filtrar la indecisión diaria,<br className="hidden md:block" /> activar el Sistema 2 analítico y recuperar tu tiempo libre.
        </p>
      </motion.div>

      {/* SECCIÓN GRATUITA */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="border-b border-white/[0.06] pb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Herramientas Base del Sistema</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {TOOLS_HOME.map((tool, i) => (
            <motion.button
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => onSelect(tool.id)}
              className={`group text-left bg-white/[0.03] border border-white/[0.08] ${tool.border} rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 min-h-[240px]`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-2xl ${tool.iconBg} flex items-center justify-center`}>
                  <tool.icon className="w-7 h-7" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${tool.badge}`}>{tool.num}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white mb-2">{tool.title}</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{tool.desc}</p>
              </div>
              <span className={`text-sm font-semibold inline-flex items-center gap-1.5 ${tool.ctaColor} transition-colors`}>
                {tool.cta} <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* SECCIÓN PREMIUM BLOQUEADA */}
      <div className="relative max-w-5xl mx-auto pt-4">
        
        {/* Banner de Control / Bloqueo */}
        <div className="absolute inset-x-0 top-36 z-10 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Pack Premium: Claridad Mental Estructural</h3>
          <p className="text-xs text-slate-400 mb-5">Desbloquea los 6 módulos avanzados para erradicar el desgaste adaptativo y blindar tu enfoque mental de forma definitiva.</p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button disabled className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/10 text-slate-400 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
              <Lock className="w-3.5 h-3.5" /> SECCIÓN BLOQUEADA
            </button>
            <a 
              href="https://pay.hotmart.com/K106051077A" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-purple-900/20 transition-all transform hover:-translate-y-0.5"
            >
              DESBLOQUEAR AHORA →
            </a>
          </div>
        </div>

        {/* Cabecera de la Sección */}
        <div className="border-b border-white/[0.06] pb-3 mb-6 flex justify-between items-center opacity-40">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
            <span>🚀 Módulos de Optimización Profunda (Premium)</span>
          </h2>
        </div>

        {/* Cuadrícula de Contenido Premium Con Filtro Blur */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 select-none pointer-events-none opacity-20 blur-[3px]">
          {PREMIUM_TOOLS.map((item, i) => (
            <div 
              key={i} 
              className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden flex flex-col h-full"
            >
              {/* Contenedor de Imagen de la Tarjeta */}
              <div className="aspect-[16/10] bg-black/40 relative overflow-hidden border-b border-white/[0.05]">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="object-cover w-full h-full filter grayscale contrast-125"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                  <item.icon className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[9px] font-bold text-slate-300 font-mono">{item.badge}</span>
                </div>
              </div>

              {/* Cuerpo de la Tarjeta */}
              <div className="p-5 flex-1 flex flex-col gap-2.5">
                <div>
                  <h4 className="text-sm font-black text-white tracking-tight leading-snug">{item.title}</h4>
                  <p className="text-[10px] text-orange-400/90 font-medium mt-1">
                    <span className="text-slate-500 font-bold uppercase text-[9px] mr-1">Resuelve:</span> 
                    {item.resolve}
                  </p>
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed flex-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home" as Tab, label: "Inicio" },
  { id: "asistente" as Tab, label: "Asistente", icon: Zap, color: "text-orange-400" },
  { id: "frameworks" as Tab, label: "Frameworks", icon: Columns, color: "text-sky-400" },
  { id: "automatizacion" as Tab, label: "Automatización", icon: RefreshCw, color: "text-purple-400" },
  { id: "educativo" as Tab, label: "Educativo", icon: BookOpen, color: "text-emerald-400" },
];

export default function Herramientas() {
  const [tab, setTab] = useState<Tab>("home");
  const goTo = (t: Tab) => { setTab(t); window.scrollTo(0, 0); };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-sky-400/20">
      <div className="fixed top-0 left-[10%] w-[40vw] h-[40vw] rounded-full bg-sky-400/[0.02] blur-[120px] pointer-events-none" />

      {/* NAV */}
      <nav className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-b-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => goTo("home")} className="text-amber-400 font-black tracking-tight text-xl hover:opacity-80 transition-opacity">Decide Fácil</button>
          <div className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => goTo(item.id)} className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${tab === item.id ? "bg-white/[0.06] text-white" : "text-slate-400 hover:text-white"}`}>
                {item.icon && <item.icon className={`w-3.5 h-3.5 ${item.color}`} />}
                {item.label}
              </button>
            ))}
          </div>
          {/* Mobile tabs */}
          <div className="md:hidden flex items-center gap-1">
            {NAV_ITEMS.slice(1).map(item => (
              <button key={item.id} onClick={() => goTo(item.id)} className={`p-2 rounded-lg transition-all ${tab === item.id ? "bg-white/[0.06]" : ""}`}>
                {item.icon && <item.icon className={`w-4 h-4 ${item.color}`} />}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
            {tab === "home" && <Home onSelect={goTo} />}
            {tab === "asistente" && <Asistente onBack={() => goTo("home")} />}
            {tab === "frameworks" && <Frameworks onBack={() => goTo("home")} />}
            {tab === "automatizacion" && <Automatizacion onBack={() => goTo("home")} />}
            {tab === "educativo" && <Educativo onBack={() => goTo("home")} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/[0.04] py-6 mt-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-600">© 2026 Decide Fácil. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
}
