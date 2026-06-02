import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  AlertCircle,
  Inbox,
  ShieldAlert,
  Tag,
  RefreshCw,
  FolderArchive,
  Mail,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ExternalLink,
  GitFork
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Mail,
    badgeLabel: "Paso 1",
    badgeColor: "bg-blue-500/10 text-sky-400 border-blue-500/20",
    title: "Revisa tu email",
    desc: "En los próximos minutos recibirás un correo de Decide Fácil con tu usuario y contraseña de acceso."
  },
  {
    icon: ArrowRight,
    badgeLabel: "Paso 2",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    title: "Inicia sesión",
    desc: "Usa las credenciales del email para acceder a tu cuenta. Todo está listo para ti."
  },
  {
    icon: Sparkles,
    badgeLabel: "Paso 3",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    title: "Empieza a decidir con claridad",
    desc: "Accede a todas tus herramientas y comienza a experimentar la libertad de decidir sin parálisis."
  }
];

const emailFolders = [
  { icon: Inbox, color: "text-primary", label: "Bandeja de entrada principal" },
  { icon: ShieldAlert, color: "text-orange-400", label: "Carpeta de SPAM / Correo no deseado" },
  { icon: Tag, color: "text-purple-400", label: "Carpeta de PROMOCIONES (Gmail)" },
  { icon: RefreshCw, color: "text-blue-400", label: "Carpeta de ACTUALIZACIONES (Gmail)" },
  { icon: FolderArchive, color: "text-slate-500", label: "Pestaña 'Otros' (Outlook/Hotmail)" }
];

export default function Gracias() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col selection:bg-primary/30">
      <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/[0.05] bg-background/80 backdrop-blur-md px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <GitFork className="w-4 h-4 text-primary-foreground" />
          </div>
          DECIDE FÁCIL
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 space-y-14 flex-grow w-full">

        {/* 1. Hero — Éxito */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-5"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10"
          >
            <Check className="w-7 h-7 text-emerald-400" />
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
            ¡Felicidades! Tu decisión más importante ya está tomada
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Acabas de dar el paso más difícil: decidir que mereces claridad mental. A partir de ahora, cada decisión será más fácil.
          </p>

          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Tu compra se ha procesado exitosamente
          </div>
        </motion.div>

        {/* 2. Alerta credenciales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-orange-500/[0.04] border border-orange-500/20 rounded-3xl p-6 md:p-8 space-y-5 max-w-2xl mx-auto shadow-xl"
        >
          <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider border-b border-white/[0.05] pb-3">
            <AlertCircle className="w-4 h-4" />
            MUY IMPORTANTE — Lee esto ahora
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            En los próximos minutos recibirás un email con tus{" "}
            <span className="text-white font-medium">credenciales de acceso</span>{" "}
            (usuario y contraseña). Este email puede tardar hasta 5 minutos en llegar.
          </p>

          <div className="bg-black/30 border border-white/[0.05] rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold text-amber-400 block uppercase tracking-wide">Revisa estas carpetas:</span>
            <ul className="space-y-2.5">
              {emailFolders.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <f.icon className={`w-3.5 h-3.5 shrink-0 ${f.color}`} />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 3. ¿Qué sigue? */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h3 className="text-sm font-bold text-white text-center uppercase tracking-widest">¿Qué sigue ahora?</h3>

          <div className="space-y-2.5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors"
                data-testid={`step-${i + 1}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 shrink-0">
                  <step.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border ${step.badgeColor}`}>
                      {step.badgeLabel}
                    </span>
                    <span className="font-bold text-white text-sm">{step.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. ¿No encuentras el email? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-black/40 border border-white/10 rounded-3xl p-6 text-center space-y-4 shadow-xl"
        >
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <HelpCircle className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white tracking-tight">¿No encuentras el email?</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Si después de 10 minutos no has recibido el email, revisa tu carpeta de spam. Si aún no lo encuentras, contáctanos y te ayudaremos de inmediato.
            </p>
          </div>
          <Button
            onClick={() => window.open("https://mail.google.com/", "_blank")}
            className="max-w-xs w-full mx-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs rounded-xl uppercase tracking-wider shadow-lg shadow-primary/10 transition-all"
            data-testid="button-open-email"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-2" />
            Abrir mi Email Ahora
          </Button>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-6 mt-8">
        <div className="max-w-3xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold tracking-tight text-white flex items-center gap-2 text-sm">
            <GitFork className="w-3.5 h-3.5 text-primary" />
            DECIDE FÁCIL
          </div>
          <p className="text-xs text-slate-600">© 2026 Decide Fácil. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Soporte</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
