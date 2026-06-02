import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Lock,
  X,
  GitFork,
  Zap,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";

import imgCaminito from "@assets/elcaminito_de_decisiones_simples_1780419720513.png";
import imgCaja from "@assets/La_caja_de_herramientas_mentales_1780419720514.png";
import imgLimites from "@assets/Estableciendo_limites_decisionales_1780419720513.png";
import imgJugador from "@assets/El_jugador_de_energia_mental_1780419720512.png";
import imgReingenieria from "@assets/Reingenieria_de_habitos_decisionales_1780419720514.png";
import imgRutas from "@assets/Rutas_de_decision_en_comunidad_1780419720515.png";

const CheckoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md rounded-2xl bg-[#0D1527] border border-white/10 p-8 shadow-2xl z-10"
        data-testid="checkout-modal-upsell"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors" data-testid="button-close-modal-upsell">
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
            <Lock className="h-6 w-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Redirección Segura</h3>
          <p className="text-slate-400 text-sm">Te estamos redirigiendo a Hotmart de forma segura para completar tu acceso al Pack Premium...</p>
          <Button
            className="w-full mt-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all"
            size="lg"
            onClick={onClose}
            data-testid="button-go-to-checkout-upsell"
          >
            Ir a la página de pago
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const modules = [
  {
    img: imgCaminito,
    alt: "El Caminito de Decisiones Simples",
    badge: "Guía paso a paso",
    badgeColor: "bg-blue-500/10 text-sky-400 border-blue-500/20",
    hoverBorder: "hover:border-sky-500/30",
    title: "El Caminito de Decisiones Simples",
    problem: "Resuelve: Recaídas en la parálisis por análisis",
    desc: "Un framework interactivo diseñado para trazar rutas decisionales cotidianas ultra-efectivas. Automatiza elecciones repetitivas para que nunca vuelvas a congelarte."
  },
  {
    img: imgCaja,
    alt: "La Caja de Herramientas Mentales",
    badge: "Checklist interactivo",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    hoverBorder: "hover:border-amber-500/30",
    title: "La Caja de Herramientas Mentales",
    problem: "Resuelve: Estrés por sobrecarga mental",
    desc: "Colección modular de estrategias ejecutivas y ejercicios de descompresión para momentos de alta presión. Tu kit de primeros auxilios mentales."
  },
  {
    img: imgLimites,
    alt: "Estableciendo Límites Decisionales",
    badge: "Workbook",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    hoverBorder: "hover:border-purple-500/30",
    title: "Estableciendo Límites Decisionales",
    problem: "Resuelve: Dificultades para establecer límites",
    desc: "Cuaderno analítico para auditar y segmentar las fronteras de tu buffer. Aprende a decir 'esto no es mi decisión' sin culpa."
  },
  {
    img: imgJugador,
    alt: "El Jugador de Energía Mental",
    badge: "Hoja de ruta",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/30",
    title: "El Jugador de Energía Mental",
    problem: "Resuelve: Culpa al pedir ayuda en decisiones",
    desc: "Estructura cartográfica que redefine el apalancamiento de opiniones externas. Delegar y recolectar perspectivas no es vulnerabilidad; es estrategia."
  },
  {
    img: imgReingenieria,
    alt: "Reingeniería de Hábitos Decisionales",
    badge: "Plan de acción",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    hoverBorder: "hover:border-orange-500/30",
    title: "Reingeniería de Hábitos Decisionales",
    problem: "Resuelve: Mantenimiento de energía mental",
    desc: "Plan secuencial enfocado en el rediseño de tus conductas diarias automáticas. Migración hacia sistemas de bajo desgaste cognitivo y alta durabilidad."
  },
  {
    img: imgRutas,
    alt: "Rutas de Decisión en Comunidad",
    badge: "Guía paso a paso",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    hoverBorder: "hover:border-pink-500/30",
    title: "Rutas de Decisión en Comunidad",
    problem: "Resuelve: Soporte para decisiones complejas",
    desc: "La guía para crear lazos con otros, compartiendo experiencias de decisiones y apoyándose mutuamente. No tienes que hacerlo solo."
  }
];

const reasons = [
  "Sin estas herramientas, el 70% de las personas vuelve a la parálisis en 3-6 meses.",
  "La energía mental es un recurso finito — necesitas un sistema para mantenerla.",
  "Las decisiones complejas seguirán apareciendo — necesitas estar preparado.",
  "Pedir ayuda sin culpa es una habilidad que se entrena, no viene sola.",
  "Los hábitos decisionales saludables requieren un plan estructurado."
];

const symptoms = [
  { title: "Recaídas en la parálisis por análisis", desc: "al enfrentar nuevas decisiones complejas de la rutina." },
  { title: "Estrés por sobrecarga mental", desc: "en situaciones cotidianas o no críticas bajo presión." },
  { title: "Dificultades para establecer límites", desc: "claros en tu buffer de toma de elecciones." },
  { title: "Sentimiento de culpa innecesario", desc: "al requerir soporte en decisiones simples." }
];

export default function Upsell() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/[0.05] bg-background/80 backdrop-blur-md px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <a href="/" className="font-bold tracking-tight text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <GitFork className="w-4 h-4 text-primary-foreground" />
          </div>
          DECIDE FÁCIL
        </a>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="sm"
          className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-4 rounded-lg text-xs shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all"
          data-testid="button-header-cta"
        >
          Sí, Quiero el Pack →
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 space-y-20">

        {/* 1. Hero — Advertencia */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full text-xs font-bold text-orange-400 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            ESPERA — Lee esto antes de continuar
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
            El 70% de las personas que superan la parálisis decisional enfrentan{" "}
            <span className="text-orange-500">un nuevo problema</span>
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
            Resuelven la parálisis de decisión... pero no saben cómo mantener su{" "}
            <span className="text-white font-medium">energía mental</span>. Y terminan volviendo al mismo lugar.
          </p>
        </motion.div>

        {/* 2. Síntomas de recaída */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {symptoms.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3"
              data-testid={`card-relapse-${i}`}
            >
              <span className="text-orange-500 font-black text-sm mt-0.5 shrink-0">✕</span>
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="text-white font-medium block mb-0.5">{s.title}</span>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 3. Header de la solución */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2"
        >
          <p className="text-amber-400 font-bold text-xs uppercase tracking-widest">Herramientas Avanzadas Incorporadas</p>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Pack Premium: Mantén tu Claridad Mental para Siempre
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            6 módulos diseñados estratégicamente para erradicar el desgaste adaptativo y blindar tu energía mental.
          </p>
        </motion.div>

        {/* 4. Grid de 6 módulos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-4 transition-all duration-300 ${mod.hoverBorder}`}
              data-testid={`card-module-${i}`}
            >
              <div className="overflow-hidden rounded-xl border border-white/5 bg-black/20 aspect-[4/3]">
                <img
                  src={mod.img}
                  alt={mod.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border ${mod.badgeColor}`}>
                  {mod.badge}
                </span>
                <h4 className="text-sm font-bold text-white tracking-tight leading-snug">{mod.title}</h4>
                <p className="text-[11px] text-orange-400 font-medium">{mod.problem}</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{mod.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 5. Por qué necesitas el Pack */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-white text-center tracking-tight">Por qué necesitas el Pack Premium</h3>
          <div className="space-y-2.5">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">{r}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 6. Caja de precio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-black/40 border border-white/10 rounded-3xl p-8 text-center space-y-5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-1 relative">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Precio especial solo en esta página</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-slate-500 text-xl font-medium line-through">$39.99</span>
              <span className="text-5xl font-black text-orange-500 tracking-tight">$19.99</span>
            </div>
            <p className="text-sm text-slate-300 font-medium pt-1">Pago único — Acceso de por vida</p>
            <p className="text-xs text-primary">6 herramientas premium + Actualizaciones futuras incluidas</p>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-black text-sm rounded-2xl h-14 shadow-[0_0_40px_rgba(249,115,22,0.35)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all uppercase tracking-wide"
            data-testid="button-price-cta"
          >
            Sí, Quiero el Pack Premium Completo <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <p className="text-xs text-slate-500 italic">"Porque quiero mantener mi claridad mental para siempre"</p>

          <a href="/" className="block text-xs text-slate-600 hover:text-slate-400 underline transition-colors">
            No gracias, solo quiero el acceso básico →
          </a>
        </motion.div>

        {/* 7. Garantía */}
        <div className="text-center max-w-md mx-auto space-y-3 border-t border-white/[0.05] pt-10">
          <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Garantía de 7 Días
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Si el Pack Premium no cumple tus expectativas, te devolvemos el 100% de tu inversión. Sin preguntas, sin complicaciones. Cero riesgo para ti.
          </p>
          <div className="flex items-center justify-center gap-6 text-slate-600 text-xs pt-2">
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Garantía 7 días</div>
            <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Acceso inmediato</div>
            <div className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Pago único</div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-black/40 py-10 px-6 mt-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="font-bold tracking-tight text-white flex items-center gap-2 mb-1">
                <GitFork className="w-4 h-4 text-primary" />
                DECIDE FÁCIL
              </div>
              <p className="text-slate-500 text-sm">Tu Asistente Personal de Decisiones</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">Soporte</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Términos</a>
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-5 text-center text-slate-600 text-xs">
            © 2026 Decide Fácil. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <AnimatePresence>
        <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </AnimatePresence>
    </div>
  );
}
