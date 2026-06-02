import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitFork, ArrowLeft, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type Page = "home" | "p1" | "p2" | "p3" | "p4" | "p5" | "p6";

// ── Utility ──────────────────────────────────────────────────────────────────
function dlText(filename: string, content: string) {
  const a = document.createElement("a");
  a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
  a.download = filename;
  a.click();
}

// ── NumBar ───────────────────────────────────────────────────────────────────
function NumBar({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex rounded overflow-hidden h-8 bg-black/30 border border-white/[0.06]">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`flex-1 text-[10px] font-semibold border-r border-white/[0.04] last:border-r-0 transition-colors ${
            value === n
              ? "bg-amber-400 text-black font-bold"
              : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

// ── ScoreBar (labelled) ──────────────────────────────────────────────────────
function ScoreBar({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs text-slate-400">{label}</div>
      <NumBar value={value} onChange={onChange} />
    </div>
  );
}

// ── EvalPanel ────────────────────────────────────────────────────────────────
function EvalPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 space-y-4 lg:sticky lg:top-20">
      <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-white/[0.05] pb-3">Evaluación</h3>
      {children}
    </div>
  );
}

function EvalStat({ label, value, sub, status }: { label: string; value: string | number; sub?: string; status?: string }) {
  return (
    <div className="bg-black/30 border border-white/[0.05] rounded-xl p-3 space-y-0.5">
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-2xl font-black text-amber-400">{value}</div>
      {sub && <div className="text-[10px] text-slate-600">{sub}</div>}
      {status && <div className="text-xs text-slate-400 mt-1">{status}</div>}
    </div>
  );
}

function LegendTable({ title, items }: { title: string; items: { range: string; label: string; desc: string }[] }) {
  return (
    <div className="pt-3">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">{title}</div>
      <div className="divide-y divide-white/[0.04]">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between py-1.5">
            <span className="text-xs font-bold text-amber-400 min-w-[50px]">{item.range}</span>
            <span className="text-xs text-slate-400 text-right"><strong className="text-slate-300 block">{item.label}</strong>{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoldenRule({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-amber-400/[0.05] border border-amber-400/20 rounded-xl p-3">
      <div className="text-[10px] font-bold uppercase tracking-wide text-amber-400 mb-1">{title}</div>
      <div className="text-xs text-slate-400 leading-relaxed">{children}</div>
    </div>
  );
}

function ToolHead({ badge, title, desc }: { badge: string; title: string; desc: string }) {
  return (
    <div className="mb-8">
      <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">{badge}</div>
      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">{title}</h2>
      <p className="text-sm text-slate-400 max-w-xl">{desc}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// P1 – Protocolo Anti-Arrepentimiento
// ─────────────────────────────────────────────────────────────────────────────
const P1_CHECKS = [
  "¿Tengo toda la información relevante?",
  "¿Consideré el peor escenario realista?",
  "¿Esta decisión es coherente con mis valores?",
  "¿Estoy decidiendo desde la calma, no el miedo?",
  "¿Consulté a alguien con experiencia?",
  "¿Puedo vivir con las consecuencias a 5 años?",
  "¿Mi yo futuro me agradecería esta decisión?",
  "¿Estoy eligiendo, o solo evitando otra opción?",
];

function P1({ onBack }: { onBack: () => void }) {
  const [decision, setDecision] = useState("");
  const [checks, setChecks] = useState(Array(8).fill(false));
  const [scores, setScores] = useState([5, 5, 5, 5, 5]);

  const toggleCheck = (i: number) => setChecks(prev => { const c = [...prev]; c[i] = !c[i]; return c; });
  const setScore = (i: number) => (v: number) => setScores(prev => { const s = [...prev]; s[i] = v; return s; });

  const count = checks.filter(Boolean).length;
  const conf = scores.reduce((a, b) => a + b, 0);

  const chkStatus = count === 8 ? "✅ Luz verde. Decidí con total confianza."
    : count >= 6 ? "🟡 Luz amarilla. Atendé los puntos débiles."
    : count >= 4 ? "⏸ Pausa. No decidás hoy."
    : "🛑 Stop. Necesitás más información o calma.";

  const confStatus = conf >= 40 ? "Confianza alta. Actuá."
    : conf >= 30 ? "Confianza moderada. Revisá dudas."
    : conf >= 20 ? "Confianza baja. Esperá."
    : "No decidís hoy.";

  const download = () => {
    let txt = `DECIDE FÁCIL VIP – PROTOCOLO ANTI-ARREPENTIMIENTO\n${"=".repeat(52)}\n\nDecisión: ${decision || "(sin especificar)"}\n\nCHECKPOINTS (${count}/8):\n`;
    P1_CHECKS.forEach((c, i) => txt += `[${checks[i] ? "✓" : " "}] ${c}\n`);
    txt += `\nÍNDICE DE CONFIANZA: ${conf}/50\nClaridad(${scores[0]}) Valores(${scores[1]}) Info(${scores[2]}) Calma(${scores[3]}) Riesgo(${scores[4]})\n`;
    dlText("DecideFacil_AntiArrepentimiento.txt", txt);
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <ToolHead badge="Herramienta 1 de 6 · Pack Premium VIP" title="Protocolo Anti-Arrepentimiento" desc="Antes de decidir, completá estos 8 checkpoints. Si pasás todos, decidí sin mirar atrás." />
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-2">¿Sobre qué decisión trabajamos?</div>
            <input type="text" value={decision} onChange={e => setDecision(e.target.value)} placeholder="Describí la decisión que estás evaluando..." className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">8 Checkpoints</div>
            <div className="flex gap-1 mb-3">
              {checks.map((c, i) => <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${c ? "bg-amber-400" : "bg-white/[0.07]"}`} />)}
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {P1_CHECKS.map((label, i) => (
                <button key={i} onClick={() => toggleCheck(i)} className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${checks[i] ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.06] bg-black/20 hover:border-white/10"}`}>
                  <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${checks[i] ? "bg-emerald-500 border-emerald-500" : "border-white/20"}`}>
                    {checks[i] && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <span className={`text-xs leading-relaxed ${checks[i] ? "text-white" : "text-slate-400"}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-5">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-4">Índice de Confianza Decisional — 1 al 10</div>
            <div className="space-y-3">
              {["Claridad de la situación", "Alineación con valores", "Nivel de información", "Calma emocional", "Aceptación del riesgo"].map((label, i) => (
                <ScoreBar key={i} label={label} value={scores[i]} onChange={setScore(i)} />
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-600 text-center border-t border-white/[0.04] pt-4">Herramienta 1 de 6 · Pack Premium VIP · Decide Fácil</div>
        </div>
        <EvalPanel>
          <EvalStat label="Checkpoints completados" value={`${count} / 8`} status={chkStatus} />
          <EvalStat label="Índice de Confianza" value={conf} sub="/ 50 puntos" status={confStatus} />
          <LegendTable title="Checkpoints" items={[
            { range: "8/8", label: "Luz verde.", desc: "Decidí con total confianza." },
            { range: "6–7", label: "Luz amarilla.", desc: "Atendé los puntos débiles." },
            { range: "4–5", label: "Pausa.", desc: "No decidás hoy." },
            { range: "0–3", label: "Stop.", desc: "Necesitás más información o calma." },
          ]} />
          <LegendTable title="Índice de Confianza" items={[
            { range: "40–50", label: "Alta.", desc: "Actuá." },
            { range: "30–39", label: "Moderada.", desc: "Revisá dudas." },
            { range: "20–29", label: "Baja.", desc: "Esperá." },
            { range: "10–19", label: "No decidís hoy.", desc: "" },
          ]} />
          <Button onClick={download} variant="outline" className="w-full border-amber-400/30 text-amber-400 hover:bg-amber-400/10 text-xs gap-2">
            <Download className="w-3.5 h-3.5" /> Descargar Resultados
          </Button>
        </EvalPanel>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// P2 – Plantillas de Decisión Rápida
// ─────────────────────────────────────────────────────────────────────────────
const P2_TEMPLATES = [
  { title: "¿Acepto este trabajo?", criteria: [{ n: "Salario", w: 3 }, { n: "Crecimiento", w: 4 }, { n: "Balance", w: 3 }] },
  { title: "¿Cambio de ciudad?", criteria: [{ n: "Oportunidad", w: 4 }, { n: "Red social", w: 3 }, { n: "Costo", w: 3 }] },
  { title: "¿Inicio este proyecto?", criteria: [{ n: "Pasión", w: 4 }, { n: "Viabilidad", w: 3 }, { n: "Tiempo", w: 3 }] },
  { title: "¿Termino esta relación?", criteria: [{ n: "Bienestar", w: 4 }, { n: "Valores", w: 4 }, { n: "Futuro", w: 2 }] },
  { title: "¿Invierto en esto?", criteria: [{ n: "Retorno", w: 4 }, { n: "Riesgo", w: 3 }, { n: "Liquidez", w: 3 }] },
  { title: "¿Renuncio hoy?", criteria: [{ n: "Salud mental", w: 4 }, { n: "Finanzas", w: 3 }, { n: "Plan B", w: 3 }] },
  { title: "¿Estudio esto?", criteria: [{ n: "Interés", w: 3 }, { n: "ROI", w: 4 }, { n: "Tiempo", w: 3 }] },
  { title: "¿Digo que sí?", criteria: [{ n: "Energía", w: 4 }, { n: "Alineación", w: 3 }, { n: "Costo", w: 3 }] },
  { title: "¿Compro esto?", criteria: [{ n: "Necesidad", w: 4 }, { n: "Presupuesto", w: 3 }, { n: "Uso real", w: 3 }] },
  { title: "¿Delego esta tarea?", criteria: [{ n: "Mi tiempo", w: 4 }, { n: "Calidad", w: 3 }, { n: "Costo", w: 3 }] },
  { title: "¿Pido ese aumento?", criteria: [{ n: "Mérito", w: 4 }, { n: "Timing", w: 3 }, { n: "Alternativa", w: 3 }] },
  { title: "¿Lanzo ahora?", criteria: [{ n: "Preparación", w: 4 }, { n: "Mercado", w: 3 }, { n: "Recursos", w: 3 }] },
];

function P2({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState(-1);
  const [scores, setScores] = useState<number[]>([5, 5, 5]);

  const t = selected >= 0 ? P2_TEMPLATES[selected] : null;
  const total = t ? t.criteria.reduce((sum, c, i) => sum + (scores[i] || 5) * c.w, 0) : 0;
  const maxP = t ? t.criteria.reduce((sum, c) => sum + 10 * c.w, 0) : 100;
  const pct = t ? Math.round((total / maxP) * 100) : 0;

  const scoreStatus = pct >= 80 ? "Decisión clara. Hacelo."
    : pct >= 60 ? "Buena opción. Validá un criterio más."
    : pct >= 40 ? "Dudoso. Necesitás más información."
    : "No es el momento. Esperá.";

  const selectTemplate = (idx: number) => { setSelected(idx); setScores([5, 5, 5]); };

  const download = () => {
    if (!t) return;
    let txt = `DECIDE FÁCIL VIP – PLANTILLA DECISIÓN RÁPIDA\n${"=".repeat(48)}\n\nEscenario: ${t.title}\n\n`;
    t.criteria.forEach((c, i) => txt += `${c.n} (×${c.w}): ${scores[i] || 5} → ${(scores[i] || 5) * c.w} pts\n`);
    txt += `\nTotal: ${total}/${maxP} (${pct}%)\n`;
    dlText("DecideFacil_PlantillaRapida.txt", txt);
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <ToolHead badge="Herramienta 2 de 6 · Pack Premium VIP" title="Plantillas de Decisión Rápida" desc="12 escenarios comunes con scoring ponderado. Elegí el escenario, puntúa los criterios y obtenés tu resultado." />
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">1. Elegí tu escenario</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {P2_TEMPLATES.map((tmpl, i) => (
                <button key={i} onClick={() => selectTemplate(i)} className={`text-left p-3 rounded-xl border transition-all ${selected === i ? "border-amber-400/40 bg-amber-400/[0.06]" : "border-white/[0.06] bg-black/20 hover:border-white/10"}`}>
                  <div className="text-[9px] font-bold uppercase tracking-wide text-amber-400 mb-1">Escenario {i + 1}</div>
                  <div className="text-xs font-bold text-white">{tmpl.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{tmpl.criteria.map(c => `${c.n}(×${c.w})`).join(" · ")}</div>
                </button>
              ))}
            </div>
          </div>
          {t && (
            <div className="border-t border-white/[0.05] pt-5">
              <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">2. Puntúa cada criterio (1–10)</div>
              <div className="bg-black/30 border border-white/[0.06] rounded-xl p-4 space-y-4">
                <div className="text-sm font-bold text-white">{t.title}</div>
                {t.criteria.map((c, i) => (
                  <div key={i} className="grid grid-cols-[130px_1fr_40px] gap-3 items-center">
                    <span className="text-xs text-slate-400">{c.n}</span>
                    <NumBar value={scores[i] || 5} onChange={v => { const s = [...scores]; s[i] = v; setScores(s); }} />
                    <span className="text-xs font-bold text-amber-400 text-right">×{c.w}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-[10px] text-slate-600 text-center border-t border-white/[0.04] pt-4">Herramienta 2 de 6 · Pack Premium VIP · Decide Fácil</div>
        </div>
        <EvalPanel>
          {!t ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-xs text-slate-500">Elegí un escenario para ver tu puntuación.</div>
            </div>
          ) : (
            <>
              <EvalStat label="Escenario" value={t.title} />
              <EvalStat label="Puntuación total" value={pct} sub="/ 100 puntos" status={scoreStatus} />
              {t.criteria.map((c, i) => (
                <div key={i} className="bg-black/30 border border-white/[0.05] rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-500">{c.n} (×{c.w})</div>
                  <div className="text-sm font-bold text-amber-400">{scores[i] || 5} × {c.w} = {(scores[i] || 5) * c.w} pts</div>
                </div>
              ))}
              <Button onClick={download} variant="outline" className="w-full border-amber-400/30 text-amber-400 hover:bg-amber-400/10 text-xs gap-2 mt-2">
                <Download className="w-3.5 h-3.5" /> Descargar Resultados
              </Button>
            </>
          )}
          <LegendTable title="Interpretación" items={[
            { range: "80–100", label: "Decisión clara.", desc: "Hacelo." },
            { range: "60–79", label: "Buena opción.", desc: "Validá un criterio más." },
            { range: "40–59", label: "Dudoso.", desc: "Necesitás más información." },
            { range: "<40", label: "No es el momento.", desc: "Esperá." },
          ]} />
          <GoldenRule title="Regla rápida">Si tardás más de 10 min en decidir algo reversible, estás sobreanalizando. Decidí y ajustá.</GoldenRule>
        </EvalPanel>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// P3 – Diario de Claridad Mental
// ─────────────────────────────────────────────────────────────────────────────
const P3_QUESTIONS = [
  "¿Cuál fue la decisión más importante que tomaste hoy?",
  "¿Qué emoción dominó tu proceso de decisión?",
  "¿Decidiste desde tus valores o desde la presión externa?",
  "¿Qué harías diferente si pudieras repetir el día?",
  "¿Qué aprendiste sobre vos mismo hoy?",
];

function P3({ onBack }: { onBack: () => void }) {
  const today = new Date().toISOString().split("T")[0];
  const [day, setDay] = useState(1);
  const [date, setDate] = useState(today);
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [scores, setScores] = useState([5, 5, 5]);

  const setAnswer = (i: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const a = [...answers]; a[i] = e.target.value; setAnswers(a);
  };
  const setScore = (i: number) => (v: number) => { const s = [...scores]; s[i] = v; setScores(s); };

  const avg = (scores.reduce((a, b) => a + b, 0) / 3).toFixed(1);
  const done = answers.filter(a => a.trim().length > 5).length;
  const avgStatus = +avg >= 8 ? "Claridad excepcional. Estás en tu mejor momento decisional."
    : +avg >= 6 ? "Buena claridad. Identificá qué días bajan y por qué."
    : +avg >= 4 ? "Claridad media. Revisá tu rutina y descanso."
    : "Alerta. Reducí decisiones importantes y priorizá autocuidado.";

  const download = () => {
    let txt = `DECIDE FÁCIL VIP – DIARIO DE CLARIDAD MENTAL\n${"=".repeat(48)}\n\nDía: ${day} | Fecha: ${date}\n\n`;
    P3_QUESTIONS.forEach((q, i) => txt += `${i + 1}. ${q}\n${answers[i] || "(sin respuesta)"}\n\n`);
    txt += `CLARITY SCORE:\nClaridad: ${scores[0]}/10\nConfianza: ${scores[1]}/10\nAlineación: ${scores[2]}/10\nPromedio: ${avg}/10\n`;
    dlText(`DecideFacil_Diario_Dia${day}.txt`, txt);
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <ToolHead badge="Herramienta 3 de 6 · Pack Premium VIP" title="Diario de Claridad Mental" desc="30 días de reflexión diaria. Respondé cada pregunta con honestidad y puntúa tu claridad al final del día." />
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-2">Día (1–30)</div>
              <input type="number" min={1} max={30} value={day} onChange={e => setDay(+e.target.value)} className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-400/40 transition-colors" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-2">Fecha</div>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-400/40 transition-colors" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400">Registro diario</div>
            {P3_QUESTIONS.map((q, i) => (
              <div key={i}>
                <label className="block text-sm font-semibold text-white mb-1.5">{i + 1}. {q}</label>
                <textarea value={answers[i]} onChange={setAnswer(i)} placeholder="Escribí tu reflexión..." rows={3} className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors resize-y" />
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.05] pt-5">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">Clarity Score del Día</div>
            <div className="space-y-3">
              {["Claridad mental", "Confianza en mis decisiones", "Alineación con valores"].map((label, i) => (
                <ScoreBar key={i} label={label} value={scores[i]} onChange={setScore(i)} />
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-600 text-center border-t border-white/[0.04] pt-4">Herramienta 3 de 6 · Pack Premium VIP · Decide Fácil</div>
        </div>
        <EvalPanel>
          <EvalStat label="Promedio diario" value={avg} sub="/ 10" status={avgStatus} />
          <EvalStat label="Reflexiones completadas" value={`${done} / 5`} />
          <LegendTable title="Tracker 30 días" items={[
            { range: "8–10", label: "Excepcional.", desc: "Mejor momento decisional." },
            { range: "6–7", label: "Buena.", desc: "Identificá qué días bajan." },
            { range: "4–5", label: "Media.", desc: "Revisá rutina y descanso." },
            { range: "1–3", label: "Alerta.", desc: "Priorizá autocuidado." },
          ]} />
          <Button onClick={download} variant="outline" className="w-full border-amber-400/30 text-amber-400 hover:bg-amber-400/10 text-xs gap-2">
            <Download className="w-3.5 h-3.5" /> Descargar Entrada del Día
          </Button>
        </EvalPanel>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// P4 – Mapa de Valores Personales
// ─────────────────────────────────────────────────────────────────────────────
const ALL_VALUES = ["Libertad", "Seguridad", "Familia", "Crecimiento", "Salud", "Creatividad", "Honestidad", "Impacto", "Aventura", "Conexión", "Liderazgo", "Equilibrio", "Autonomía", "Excelencia", "Propósito", "Disfrute"];

function P4({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [alignScores, setAlignScores] = useState<number[]>([5, 5, 5, 5, 5]);

  const toggle = (v: string) => setSelected(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  const top5 = selected.slice(0, 5);
  const alignTotal = top5.reduce((s, _, i) => s + alignScores[i], 0);

  const alignStatus = alignTotal >= 45 ? "Vida altamente alineada. Tus decisiones reflejan quién sos."
    : alignTotal >= 35 ? "Buena alineación. Identificá los gaps."
    : alignTotal >= 25 ? "Desalineación moderada. Hay valores que no estás honrando."
    : "Desconexión significativa. Priorizá cambios.";

  const gaps = top5.filter((_, i) => alignScores[i] <= 5);

  const download = () => {
    let txt = `DECIDE FÁCIL VIP – MAPA DE VALORES PERSONALES\n${"=".repeat(50)}\n\nVALORES SELECCIONADOS:\n`;
    selected.forEach(v => txt += `· ${v}\n`);
    txt += "\nTOP 5 PRINCIPALES:\n";
    top5.forEach((v, i) => txt += `#${i + 1} ${v} — Alineación actual: ${alignScores[i]}/10\n`);
    txt += `\nÍndice de Alineación: ${alignTotal}/50\n`;
    dlText("DecideFacil_MapaValores.txt", txt);
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <ToolHead badge="Herramienta 4 de 6 · Pack Premium VIP" title="Mapa de Valores Personales" desc="Identificá y priorizás tus valores fundamentales. Tu brújula para cada decisión importante." />
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">Paso 1 — Elegí tus valores (seleccioná los que resuenen)</div>
            <div className="flex flex-wrap gap-2">
              {ALL_VALUES.map(v => (
                <button key={v} onClick={() => toggle(v)} className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${selected.includes(v) ? "border-amber-400/50 bg-amber-400/10 text-amber-400 font-bold" : "border-white/[0.06] bg-black/20 text-slate-400 hover:border-white/10 hover:text-slate-300"}`}>{v}</button>
              ))}
            </div>
          </div>
          {selected.length >= 5 && (
            <>
              <div className="border-t border-white/[0.05] pt-5">
                <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">Paso 2 — Tus 5 valores principales</div>
                <div className="space-y-2">
                  {top5.map((v, i) => (
                    <div key={v} className="flex items-center gap-3 bg-black/30 border border-white/[0.05] rounded-xl px-4 py-2.5">
                      <span className="text-xs font-black text-amber-400 min-w-[24px]">#{i + 1}</span>
                      <span className="font-semibold text-white">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/[0.05] pt-5">
                <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">Paso 3 — ¿Cuánto vivís cada valor hoy? (1–10)</div>
                <div className="space-y-3">
                  {top5.map((v, i) => (
                    <ScoreBar key={v} label={v} value={alignScores[i]} onChange={val => { const s = [...alignScores]; s[i] = val; setAlignScores(s); }} />
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="text-[10px] text-slate-600 text-center border-t border-white/[0.04] pt-4">Herramienta 4 de 6 · Pack Premium VIP · Decide Fácil</div>
        </div>
        <EvalPanel>
          <EvalStat label="Valores seleccionados" value={selected.length} status={selected.length < 5 ? `Seleccioná al menos ${5 - selected.length} más.` : "¡Listo! Ahora ordená tus 5 principales."} />
          {selected.length >= 5 && (
            <>
              <EvalStat label="Índice de Alineación" value={alignTotal} sub="/ 50 puntos" status={alignStatus} />
              {gaps.length > 0 && (
                <GoldenRule title="Valores a reforzar">{gaps.join(", ")}</GoldenRule>
              )}
            </>
          )}
          <LegendTable title="Índice de Alineación" items={[
            { range: "45–50", label: "Alta alineación.", desc: "Tus decisiones reflejan quién sos." },
            { range: "35–44", label: "Buena.", desc: "Identificá los gaps." },
            { range: "25–34", label: "Moderada.", desc: "Hay valores que no honrás." },
            { range: "5–24", label: "Desconexión.", desc: "Priorizá cambios." },
          ]} />
          <GoldenRule title="Cómo usar este mapa">Antes de cada decisión importante preguntate: ¿Esta opción honra mis valores #1 y #2? Si la respuesta es no, probablemente no es la decisión correcta para vos.</GoldenRule>
          {selected.length >= 5 && (
            <Button onClick={download} variant="outline" className="w-full border-amber-400/30 text-amber-400 hover:bg-amber-400/10 text-xs gap-2">
              <Download className="w-3.5 h-3.5" /> Descargar Mapa de Valores
            </Button>
          )}
        </EvalPanel>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// P5 – Plan de Energía Decisional
// ─────────────────────────────────────────────────────────────────────────────
const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const SLOTS = ["6–10h", "10–13h", "13–17h", "17–21h"];
const P5_RULES = [
  "Decisiones irreversibles: solo en tu franja de máxima energía",
  "Decisiones reversibles: cualquier franja media o alta",
  "Decisiones rutinarias: automatizar (no gastar energía)",
  "Nunca decidir cuando estés cansado, hambriento o emocional",
];

function P5({ onBack }: { onBack: () => void }) {
  const initGrid = () => {
    const g: Record<string, number> = {};
    SLOTS.forEach((_, si) => DAYS.forEach((_, di) => { g[`${si}-${di}`] = 5; }));
    return g;
  };
  const [grid, setGrid] = useState<Record<string, number>>(initGrid);
  const [rules, setRules] = useState([false, false, false, false]);
  const [optDay, setOptDay] = useState("");
  const [optHour, setOptHour] = useState("");
  const [reserved, setReserved] = useState(["", "", ""]);

  const setCell = (si: number, di: number) => (v: number) => setGrid(prev => ({ ...prev, [`${si}-${di}`]: v }));
  const toggleRule = (i: number) => setRules(prev => { const r = [...prev]; r[i] = !r[i]; return r; });

  const totalScore = DAYS.reduce((s, _, di) => {
    const dayMax = Math.max(...SLOTS.map((_, si) => grid[`${si}-${di}`] || 5));
    return s + dayMax;
  }, 0);

  const slotAvgs = SLOTS.map((_, si) => DAYS.reduce((s, _, di) => s + (grid[`${si}-${di}`] || 5), 0) / 7);
  const bestSlotIdx = slotAvgs.indexOf(Math.max(...slotAvgs));

  const scoreStatus = totalScore >= 60 ? "Excelente. Aprovechá tus picos."
    : totalScore >= 45 ? "Buena. Protegé ventanas óptimas."
    : totalScore >= 30 ? "Moderada. Reducí decisiones no esenciales."
    : "Baja. Priorizá descanso antes de decidir.";

  const download = () => {
    let txt = `DECIDE FÁCIL VIP – PLAN DE ENERGÍA DECISIONAL\n${"=".repeat(50)}\n\nMapa semanal:\n\n`;
    SLOTS.forEach((slot, si) => { txt += `${slot}: `; txt += DAYS.map((_, di) => grid[`${si}-${di}`] || 5).join(" | ") + "\n"; });
    txt += `\nVentana óptima: ${optDay || "—"} · ${optHour || "—"}\nDecisiones reservadas:\n`;
    reserved.forEach((r, i) => txt += `${i + 1}. ${r || "—"}\n`);
    dlText("DecideFacil_PlanEnergia.txt", txt);
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <ToolHead badge="Herramienta 5 de 6 · Pack Premium VIP" title="Plan de Energía Decisional" desc="Optimizá cuándo tomás decisiones importantes. Tu energía mental fluctúa — usala a tu favor." />
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">Mapa de Energía Semanal (1–10 por franja)</div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[500px]">
                <thead>
                  <tr>
                    <th className="text-left py-2 pr-3 text-amber-400 font-bold uppercase tracking-wide">Franja</th>
                    {DAYS.map(d => <th key={d} className="py-2 px-1 text-center text-amber-400 font-bold">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {SLOTS.map((slot, si) => (
                    <tr key={si} className="border-t border-white/[0.04]">
                      <td className="py-2 pr-3 text-amber-400 font-bold whitespace-nowrap">{slot}</td>
                      {DAYS.map((_, di) => (
                        <td key={di} className="py-1 px-0.5">
                          <select value={grid[`${si}-${di}`] || 5} onChange={e => setCell(si, di)(+e.target.value)} className="w-full bg-black/30 border border-white/[0.06] rounded text-center text-[11px] text-white py-1 outline-none focus:border-amber-400/40 cursor-pointer">
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-5">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">Reglas de Timing Decisional</div>
            <div className="space-y-2">
              {P5_RULES.map((rule, i) => (
                <button key={i} onClick={() => toggleRule(i)} className={`w-full flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${rules[i] ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.06] bg-black/20 hover:border-white/10"}`}>
                  <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${rules[i] ? "bg-emerald-500 border-emerald-500" : "border-white/20"}`}>
                    {rules[i] && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <span className={`text-xs ${rules[i] ? "text-white" : "text-slate-400"}`}>{rule}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-5">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">Mi Ventana Óptima de Decisión</div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-xs text-slate-400 mb-1.5">Día</div>
                <input value={optDay} onChange={e => setOptDay(e.target.value)} placeholder="Ej: Martes" className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors" />
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1.5">Hora</div>
                <input value={optHour} onChange={e => setOptHour(e.target.value)} placeholder="Ej: 10–13h" className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors" />
              </div>
            </div>
            <div className="text-xs text-slate-400 mb-2">Decisiones que reservo para esa ventana:</div>
            <div className="space-y-2">
              {reserved.map((r, i) => (
                <input key={i} value={r} onChange={e => { const arr = [...reserved]; arr[i] = e.target.value; setReserved(arr); }} placeholder={`${i + 1}.`} className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors" />
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-600 text-center border-t border-white/[0.04] pt-4">Herramienta 5 de 6 · Pack Premium VIP · Decide Fácil</div>
        </div>
        <EvalPanel>
          <EvalStat label="Scoring de Energía Semanal" value={totalScore} sub="/ 70 puntos" status={scoreStatus} />
          <EvalStat label="Franja de mayor energía detectada" value={SLOTS[bestSlotIdx]} status={`Promedio ${slotAvgs[bestSlotIdx].toFixed(1)}/10. Reservá esta ventana para decisiones importantes.`} />
          <LegendTable title="Scoring de Energía" items={[
            { range: "60–70", label: "Excelente.", desc: "Aprovechá tus picos." },
            { range: "45–59", label: "Buena.", desc: "Protegé ventanas óptimas." },
            { range: "30–44", label: "Moderada.", desc: "Reducí decisiones no esenciales." },
            { range: "<30", label: "Baja.", desc: "Priorizá descanso." },
          ]} />
          <GoldenRule title="Optimización">Dormir 7–8h → +2 puntos<br />Ejercicio matutino → +1.5<br />Ayuno de decisiones triviales → +1</GoldenRule>
          <Button onClick={download} variant="outline" className="w-full border-amber-400/30 text-amber-400 hover:bg-amber-400/10 text-xs gap-2">
            <Download className="w-3.5 h-3.5" /> Descargar Plan de Energía
          </Button>
        </EvalPanel>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// P6 – Kit de Comunicación
// ─────────────────────────────────────────────────────────────────────────────
const P6_SCRIPTS = [
  { title: "Decir NO a un proyecto", fields: ["nombre_proyecto", "razón_principal"], template: "Agradezco la oportunidad con [nombre_proyecto]. Después de evaluarlo con mis prioridades actuales, no puedo comprometerme al nivel que merece. [razón_principal]. Prefiero ser honesto/a ahora que fallar después." },
  { title: "Comunicar un cambio de rumbo", fields: ["cambio", "reflexión"], template: "He tomado la decisión de [cambio]. Sé que puede sorprender, pero después de reflexionar sobre mis valores y objetivos, es lo más coherente para mí. [reflexión]" },
  { title: "Pedir tiempo para decidir", fields: ["plazo", "impacto"], template: "Necesito [plazo] para tomar esta decisión con la claridad que merece. No es indecisión, es respeto por el impacto que tiene: [impacto]." },
  { title: "Establecer un límite", fields: ["límite", "valor_protegido"], template: "Valoro nuestra relación, y por eso necesito ser directo/a: [límite]. No es negociable porque protege [valor_protegido], algo fundamental para mí." },
  { title: "Comunicar una decisión impopular", fields: ["decisión", "criterios"], template: "Entiendo que esto no es lo que esperabas. Tomé esta decisión considerando [criterios]. Estoy abierto/a a escuchar tu perspectiva, pero la decisión está tomada." },
  { title: "Renegociar un compromiso", fields: ["tema", "alternativa"], template: "Necesito ajustar nuestro acuerdo sobre [tema]. Las circunstancias cambiaron y quiero ser transparente contigo. Propongo [alternativa] como solución." },
];

const P6_CHECKLIST = ["¿Estoy calmado/a?", "¿Tengo claros mis motivos?", "¿Elegí el momento adecuado?", "¿Estoy preparado/a para preguntas?", "¿Mi tono es firme pero respetuoso?"];

function P6({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState(-1);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [checks, setChecks] = useState(Array(5).fill(false));

  const s = selected >= 0 ? P6_SCRIPTS[selected] : null;

  const getPreview = () => {
    if (!s) return "";
    let text = s.template;
    s.fields.forEach(f => { text = text.replace(`[${f}]`, fields[f]?.trim() ? `**${fields[f]}**` : `[${f.replace(/_/g, " ")}]`); });
    return text;
  };

  const toggleCheck = (i: number) => setChecks(prev => { const c = [...prev]; c[i] = !c[i]; return c; });
  const checkCount = checks.filter(Boolean).length;
  const checkStatus = checkCount === 5 ? "✅ Comunicá ahora. Estás listo/a." : checkCount >= 3 ? "🟡 Casi listo/a. Trabajá los puntos pendientes." : "⏸ Esperá. No es el momento.";

  const selectScript = (idx: number) => { setSelected(idx); setFields({}); setChecks(Array(5).fill(false)); };

  const download = () => {
    if (!s) return;
    let script = s.template;
    s.fields.forEach(f => { script = script.replace(`[${f}]`, fields[f] || `[${f}]`); });
    let txt = `DECIDE FÁCIL VIP – KIT DE COMUNICACIÓN\n${"=".repeat(42)}\n\nEscenario: ${s.title}\n\nSCRIPT FINAL:\n"${script}"\n\nChecklist pre-comunicación: ${checkCount}/5\n`;
    dlText("DecideFacil_KitComunicacion.txt", txt);
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 text-sm mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Inicio</button>
      <ToolHead badge="Herramienta 6 de 6 · Pack Premium VIP" title="Kit de Comunicación de Decisiones" desc="Scripts probados para comunicar decisiones difíciles con claridad y respeto. Elegí el escenario y personalizá el guión." />
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">1. Elegí el escenario</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {P6_SCRIPTS.map((sc, i) => (
                <button key={i} onClick={() => selectScript(i)} className={`text-left p-3 rounded-xl border transition-all ${selected === i ? "border-amber-400/40 bg-amber-400/[0.06]" : "border-white/[0.06] bg-black/20 hover:border-white/10"}`}>
                  <div className="text-[9px] font-bold uppercase tracking-wide text-amber-400 mb-1">Escenario {i + 1}</div>
                  <div className="text-sm font-bold text-white">{sc.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1 italic">"{sc.template.substring(0, 55)}..."</div>
                </button>
              ))}
            </div>
          </div>
          {s && (
            <>
              <div className="border-t border-white/[0.05] pt-5">
                <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">2. Personalizá tu mensaje</div>
                <div className="bg-black/30 border border-white/[0.06] rounded-xl p-4 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-amber-400 mb-2">Tu script personalizado</div>
                  <p className="text-sm text-slate-300 italic leading-relaxed whitespace-pre-wrap">{getPreview()}</p>
                </div>
                <div className="space-y-3">
                  {s.fields.map(f => (
                    <div key={f}>
                      <div className="text-xs text-slate-400 mb-1 capitalize">{f.replace(/_/g, " ")}</div>
                      <input type="text" value={fields[f] || ""} onChange={e => setFields(prev => ({ ...prev, [f]: e.target.value }))} placeholder="Completá este campo..." className="w-full bg-black/30 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/[0.05] pt-5">
                <div className="text-xs font-bold uppercase tracking-wide text-amber-400 mb-3">3. Checklist pre-comunicación</div>
                <div className="divide-y divide-white/[0.04]">
                  {P6_CHECKLIST.map((item, i) => (
                    <button key={i} onClick={() => toggleCheck(i)} className={`w-full flex items-center gap-2.5 py-2.5 text-left transition-colors ${checks[i] ? "text-emerald-400" : "text-slate-400 hover:text-slate-300"}`}>
                      <div className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center ${checks[i] ? "bg-emerald-500 border-emerald-500" : "border-white/20"}`}>
                        {checks[i] && <Check className="w-3 h-3 text-black" />}
                      </div>
                      <span className="text-sm">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="text-[10px] text-slate-600 text-center border-t border-white/[0.04] pt-4">Herramienta 6 de 6 · Pack Premium VIP · Decide Fácil</div>
        </div>
        <EvalPanel>
          {!s ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">💬</div>
              <div className="text-xs text-slate-500">Elegí un escenario para ver tu evaluación.</div>
            </div>
          ) : (
            <>
              <EvalStat label="Escenario elegido" value={s.title} />
              <EvalStat label="Scoring de comunicación" value={`${checkCount} / 5`} status={checkStatus} />
              <Button onClick={download} variant="outline" className="w-full border-amber-400/30 text-amber-400 hover:bg-amber-400/10 text-xs gap-2">
                <Download className="w-3.5 h-3.5" /> Descargar Script
              </Button>
            </>
          )}
          <LegendTable title="Scoring de Comunicación" items={[
            { range: "5/5", label: "Comunicá ahora.", desc: "Estás listo/a." },
            { range: "3–4", label: "Casi listo/a.", desc: "Trabajá los puntos pendientes." },
            { range: "1–2", label: "Esperá.", desc: "No es el momento." },
          ]} />
          <GoldenRule title="Cómo usar los scripts">1. Elegí el escenario<br />2. Completá los campos<br />3. Practicá en voz alta antes<br />4. Comunicá en persona cuando sea posible</GoldenRule>
        </EvalPanel>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────────────────────
const TOOLS = [
  { id: "p1" as Page, emoji: "🛡️", title: "Protocolo Anti-Arrepentimiento", desc: "8 checkpoints antes de decidir + Índice de Confianza Decisional. Si pasás todos, decidí sin mirar atrás." },
  { id: "p2" as Page, emoji: "⚡", title: "Plantillas de Decisión Rápida", desc: "12 escenarios comunes con scoring ponderado. Trabajo, inversión, relaciones, lanzamientos y más." },
  { id: "p3" as Page, emoji: "📓", title: "Diario de Claridad Mental", desc: "30 días de reflexión diaria con tracker semanal. Entrenás tu criterio decisional con consistencia." },
  { id: "p4" as Page, emoji: "🧭", title: "Mapa de Valores Personales", desc: "Identificá y priorizás tus valores fundamentales. Tu brújula para cada decisión importante." },
  { id: "p5" as Page, emoji: "🔋", title: "Plan de Energía Decisional", desc: "Mapeá tu energía mental por franja horaria. Decidí cosas importantes solo en tu ventana óptima." },
  { id: "p6" as Page, emoji: "💬", title: "Kit de Comunicación", desc: "6 scripts probados para comunicar decisiones difíciles con claridad, firmeza y respeto." },
];

function Home({ onSelect }: { onSelect: (p: Page) => void }) {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 space-y-4">
        <div className="inline-block bg-gradient-to-r from-amber-400 to-yellow-300 text-black text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">✦ Pack Premium VIP</div>
        <h1 className="text-4xl md:text-5xl font-black text-amber-400 tracking-tight">Decide Fácil</h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">Seis herramientas avanzadas para decisiones importantes. Cada una diseñada para eliminar el arrepentimiento, la parálisis y la fatiga decisional.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
        {TOOLS.map((tool, i) => (
          <motion.button
            key={tool.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => onSelect(tool.id)}
            className="group text-left bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-amber-400/30 hover:bg-amber-400/[0.02] transition-all duration-300"
            data-testid={`card-tool-${tool.id}`}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2">Herramienta {i + 1} de 6 · Premium</div>
            <h3 className="font-bold text-white mb-2">{tool.emoji} {tool.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
            <div className="mt-4 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">Abrir →</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV TABS
// ─────────────────────────────────────────────────────────────────────────────
const NAV_TABS: { id: Page; label: string }[] = [
  { id: "home", label: "Inicio" },
  { id: "p1", label: "🛡️ Anti-Arrep." },
  { id: "p2", label: "⚡ Decisión" },
  { id: "p3", label: "📓 Diario" },
  { id: "p4", label: "🧭 Valores" },
  { id: "p5", label: "🔋 Energía" },
  { id: "p6", label: "💬 Comunicación" },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function PackVIP() {
  const [page, setPage] = useState<Page>("home");

  const goTo = useCallback((p: Page) => { setPage(p); window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-amber-400/20">
      <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-amber-400/[0.03] blur-[120px] pointer-events-none" />

      {/* NAV */}
      <nav className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-white/[0.06] overflow-x-auto">
        <div className="flex items-center gap-0 px-4 max-w-7xl mx-auto">
          <a href="/" className="font-black text-amber-400 text-base pr-4 border-r border-white/[0.08] mr-1 flex items-center gap-2 shrink-0 py-4 hover:opacity-80 transition-opacity">
            <GitFork className="w-4 h-4" />
            DECIDE FÁCIL
            <span className="text-[9px] font-black bg-amber-400 text-black px-1.5 py-0.5 rounded tracking-widest">VIP</span>
          </a>
          {NAV_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => goTo(tab.id)}
              className={`px-3 py-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                page === tab.id
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {page === "home" && <Home onSelect={goTo} />}
            {page === "p1" && <P1 onBack={() => goTo("home")} />}
            {page === "p2" && <P2 onBack={() => goTo("home")} />}
            {page === "p3" && <P3 onBack={() => goTo("home")} />}
            {page === "p4" && <P4 onBack={() => goTo("home")} />}
            {page === "p5" && <P5 onBack={() => goTo("home")} />}
            {page === "p6" && <P6 onBack={() => goTo("home")} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/[0.05] py-6 mt-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-slate-600">
          © 2026 Decide Fácil VIP. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
