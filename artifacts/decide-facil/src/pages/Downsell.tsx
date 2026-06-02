import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Lock,
  X,
  GitFork,
  AlertTriangle,
  Zap,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
        data-testid="checkout-modal-downsell"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
          data-testid="button-close-modal-downsell"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
            <Lock className="h-6 w-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Checkout Express — $9.99</h3>
          <p className="text-slate-400 text-sm">Te estamos redirigiendo de forma segura para completar tu acceso al Pack Premium completo por $9.99...</p>
          <Button
            className="w-full mt-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all"
            size="lg"
            onClick={onClose}
            data-testid="button-go-to-checkout-downsell"
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
    title: "El Caminito de Decisiones Simples",
    desc: "Crea rutas decisionales simples para el día a día",
    badge: "Guía paso a paso",
    badgeColor: "bg-blue-500/10 text-sky-400 border-blue-500/20"
  },
  {
    title: "La Caja de Herramientas Mentales",
    desc: "Estrategias para relajarte en situaciones de alta presión",
    badge: "Checklist interactiva",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  {
    title: "Estableciendo Límites Decisionales",
    desc: "Aprende a poner límites en la toma de decisiones",
    badge: "Workbook",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  {
    title: "El Jugador de Energía Mental",
    desc: "Gestiona tu energía y pide apoyo sin culpa",
    badge: "Hoja de ruta",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  },
  {
    title: "Reingeniería de Hábitos Decisionales",
    desc: "Transforma hábitos perjudiciales en sostenibles",
    badge: "Plan de acción",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20"
  },
  {
    title: "Rutas de Decisión en Comunidad",
    desc: "Crea lazos de apoyo para decisiones complejas",
    badge: "Guía paso a paso",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20"
  }
];

const comparisons = [
  { emoji: "☕", label: "2 cafés de especialidad", price: "$10" },
  { emoji: "🍕", label: "1 pizza mediana", price: "$12" },
  { emoji: "📺", label: "1 mes de streaming", price: "$15" }
];

export default function Downsell() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCheckout = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/[0.05] bg-background/80 backdrop-blur-md px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <a href="/" className="font-bold tracking-tight text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <GitFork className="w-4 h-4 text-primary-foreground" />
          </div>
          DECIDE FÁCIL
        </a>
        <Button
          onClick={openCheckout}
          size="sm"
          className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-4 rounded-lg text-xs shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all"
          data-testid="button-header-cta-downsell"
        >
          Pack por $9.99 →
        </Button>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 space-y-16">

        {/* 1. Hero — Empatía */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-5"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            ¿El dinero fue un problema?{" "}
            <span className="text-primary">Te entiendo perfectamente</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Sé lo que es querer mejorar pero sentir que el presupuesto no alcanza. Por eso preparé algo especial para ti. No quiero que el dinero sea la razón por la que sigas paralizado.
          </p>
        </motion.div>

        {/* 2. Tarjeta de oferta 50% */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-black/40 border border-white/10 rounded-3xl p-6 md:p-10 text-center space-y-5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-orange-500/8 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-primary/8 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-block bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
            OFERTA ESPECIAL — 50% DE DESCUENTO
          </div>

          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
            El Pack Premium Completo por la mitad del precio
          </h2>

          <div className="flex items-center justify-center gap-3">
            <span className="text-slate-500 text-lg font-medium line-through">$19.99</span>
            <span className="text-5xl font-black text-orange-500 tracking-tight">$9.99</span>
          </div>

          <div className="text-xs text-slate-400 space-y-0.5">
            <p>Pago único — Acceso de por vida — Mismo contenido completo</p>
            <p className="text-primary font-medium">Las mismas 6 herramientas premium que otros pagan $19.99</p>
          </div>

          <Button
            onClick={openCheckout}
            size="lg"
            className="w-full max-w-md mx-auto bg-orange-500 hover:bg-orange-400 text-white font-black text-sm rounded-2xl h-13 shadow-[0_0_40px_rgba(249,115,22,0.35)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all uppercase tracking-wide"
            data-testid="button-main-cta-downsell"
          >
            Sí, Quiero el Pack Premium por $9.99 <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        {/* 3. Perspectiva de precio */}
        <div className="space-y-4 text-center">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Ponlo en perspectiva</h3>

          <div className="grid grid-cols-3 gap-3">
            {comparisons.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center space-y-1"
              >
                <span className="text-2xl block">{c.emoji}</span>
                <span className="text-xs font-bold text-white block leading-tight">{c.label}</span>
                <span className="text-xs text-slate-500 font-mono">{c.price}</span>
              </motion.div>
            ))}
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-sm text-slate-400 leading-relaxed">
            Por menos que cualquiera de esas cosas, obtienes:<br />
            <span className="text-primary font-bold">6 herramientas que transforman tu capacidad de decisión para siempre</span>
          </div>
        </div>

        {/* 4. Lista de los 6 módulos */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white text-center uppercase tracking-wider">Todo lo que incluye el Pack Premium</h3>

          <div className="space-y-2">
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between gap-4"
                data-testid={`row-module-${i}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <div className="min-w-0">
                    <span className="font-bold text-white text-sm block truncate">{mod.title}</span>
                    <span className="text-xs text-slate-400">{mod.desc}</span>
                  </div>
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border shrink-0 hidden sm:inline ${mod.badgeColor}`}>
                  {mod.badge}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. Bloques de cierre */}
        <div className="space-y-5 pt-4 border-t border-white/[0.05]">

          {/* Garantía */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Garantía de 7 Días — Cero Riesgo
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
              Si no te convence, te devolvemos cada centavo. Sin preguntas, sin formularios largos, sin complicaciones. Tu satisfacción es lo primero.
            </p>
          </motion.div>

          {/* Urgencia */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-orange-500/[0.04] border border-orange-500/10 rounded-2xl p-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-orange-400 font-semibold text-xs mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Esta oferta solo está disponible en esta página
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Si cierras esta ventana, el precio vuelve a $19.99. Esta es tu única oportunidad de obtener el Pack Premium completo por $9.99.
            </p>
          </motion.div>

          {/* CTA final */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 pt-2"
          >
            <h4 className="text-lg font-bold text-white tracking-tight">
              Tu claridad mental vale más que $9.99
            </h4>

            <Button
              onClick={openCheckout}
              size="lg"
              className="w-full max-w-md mx-auto bg-orange-500 hover:bg-orange-400 text-white font-black text-sm rounded-2xl h-14 shadow-[0_0_40px_rgba(249,115,22,0.35)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all uppercase tracking-wide"
              data-testid="button-final-cta-downsell"
            >
              Quiero el Pack Premium por $9.99 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <p className="text-xs text-slate-500 italic">
              "Porque mi paz mental no tiene precio, pero $9.99 es una ganga"
            </p>

            <a href="/" className="block text-xs text-slate-600 hover:text-slate-400 underline transition-colors">
              No gracias, continuar sin el Pack Premium →
            </a>
          </motion.div>

          {/* Badges de confianza */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 text-xs pt-2">
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Garantía 7 días</div>
            <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Acceso inmediato</div>
            <div className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Pago único</div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-black/40 py-10 px-6 mt-10">
        <div className="max-w-3xl mx-auto">
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
