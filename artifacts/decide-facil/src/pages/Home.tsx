import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  BatteryLow,
  ShieldAlert,
  Cpu,
  GitFork,
  Layers,
  Terminal,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Database,
  Lock,
  X,
  Sliders,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mockupImg from "@assets/Mockup04_1780280421469.png";
import heroMockupImg from "@assets/new-project_1780281624708.png";

const CheckoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        data-testid="modal-backdrop"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card border border-white/10 p-6 shadow-2xl z-10"
        data-testid="checkout-modal"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
          data-testid="button-close-modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold text-white">Redirección Segura</h3>
          
          <p className="text-slate-400 text-sm">
            Te estamos redirigiendo a Hotmart de forma segura para completar tu acceso...
          </p>

          <Button 
            className="w-full mt-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all"
            size="lg"
            onClick={onClose}
            data-testid="button-go-to-checkout"
          >
            Ir a la página de pago
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openCheckout = () => setIsModalOpen(true);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Glow effects */}
      <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Navigation / Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 max-w-7xl mx-auto w-full">
        <div className="font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <GitFork className="w-4 h-4 text-primary-foreground" />
          </div>
          DECIDE FÁCIL
        </div>
      </header>

      <main>
        {/* 1. Hero Section */}
        <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-amber-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6"
          >
            Para personas mentalmente saturadas que quieren recuperar claridad mental
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
          >
            Cómo tomar decisiones sin paralizarte,{" "}
            <span className="text-amber-400">sin culpa</span>{" "}
            y sin sentir que el destino del mundo depende de ello
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mb-10"
          >
            Decide Fácil es la herramienta que reduce tus opciones, elimina la parálisis y te
            devuelve la confianza en tu propio juicio. En minutos, no en horas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <Button 
              onClick={openCheckout}
              size="lg" 
              className="bg-orange-500 hover:bg-orange-400 text-white text-lg px-8 h-14 rounded-xl font-bold shadow-[0_0_40px_rgba(249,115,22,0.35)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all"
              data-testid="button-hero-cta"
            >
              Quiero Decidir con Claridad Ahora <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-slate-400 text-sm italic">
              "Porque estoy listo para dejar de darle vueltas a todo"
            </p>
          </motion.div>

          {/* Product Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-primary/5 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
            <img
              src={heroMockupImg}
              alt="Decide Fácil en múltiples dispositivos"
              className="w-full h-auto object-cover"
              data-testid="img-hero-mockup"
            />
          </motion.div>
        </section>

        {/* 2. Metrics Bar */}
        <section className="border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="pt-4 md:pt-0">
                <div className="text-3xl font-bold text-white mb-1"><span className="text-primary">2-3</span></div>
                <div className="text-sm text-slate-400 font-medium">Opciones máximas recomendadas</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-3xl font-bold text-white mb-1"><span className="text-primary">&lt; 5 min</span></div>
                <div className="text-sm text-slate-400 font-medium">Para resolver cualquier dilema</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-3xl font-bold text-white mb-1"><span className="text-primary">100%</span></div>
                <div className="text-sm text-slate-400 font-medium">Enfoque práctico y sin rodeos</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Problem Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">¿Te identificas con alguna de estas situaciones?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Parálisis por Análisis",
                desc: "Pasas horas dando vueltas a una elección simple, buscando la opción perfecta que no existe.",
                icon: GitFork
              },
              {
                title: "Fatiga Mental Acumulada",
                desc: "Llegas al final del día exhausto, incapaz de decidir algo tan sencillo como qué cenar.",
                icon: BatteryLow
              },
              {
                title: "Arrepentimiento Constante",
                desc: "Incluso después de elegir, te persigue la duda de si deberías haber optado por el otro camino.",
                icon: ShieldAlert
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.08] p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                  <item.icon className="w-32 h-32 text-primary" />
                </div>
                <item.icon className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Failed Methods Section */}
        <section className="py-24 px-6 bg-black/40 border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Por qué los métodos tradicionales no funcionan</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Las listas de pros y contras",
                  desc: "Aumentan el ruido mental en lugar de simplificarlo.",
                  icon: Layers
                },
                {
                  title: "Los libros de productividad",
                  desc: "Te llenan de teoría pero te dejan solo ante el problema.",
                  icon: Database
                },
                {
                  title: "Las aplicaciones complejas",
                  desc: "Te exigen aprender un nuevo sistema, sumando más estrés.",
                  icon: Terminal
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-background border border-white/10 p-6 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. 4 Tools Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Todo lo que necesitas para recuperar el control</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Asistente de Filtrado de Opciones",
                desc: "Elimina el ruido exterior y reduce tus alternativas a un máximo manejable de 2 o 3 opciones viables.",
                benefit: "Reduce el tiempo de decisión de horas a minutos.",
                icon: Sliders
              },
              {
                title: "Frameworks de Elección Estructurada",
                desc: "Aplica modelos de ponderación lógica para decisiones complejas.",
                benefit: "Mitiga el miedo a equivocarte en momentos clave.",
                icon: Cpu
              },
              {
                title: "Automatización de Decisiones Diarias",
                desc: "Estandariza las elecciones repetitivas para guardar tu energía mental.",
                benefit: "Evita el desgaste mental acumulado en el día.",
                icon: Activity
              },
              {
                title: "Módulo de Validación sin Culpa",
                desc: "Soporte psicológico que te ayuda a confiar en tu elección y cerrar el ciclo.",
                benefit: "Elimina el arrepentimiento y la duda posterior.",
                icon: ShieldCheck
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.08] p-8 rounded-2xl hover:border-primary transition-all duration-300"
              >
                <item.icon className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 mb-6">{item.desc}</p>
                <div className="pt-4 border-t border-white/10">
                  <span className="text-sm font-semibold text-primary">Beneficio: </span>
                  <span className="text-sm text-slate-300">{item.benefit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Mockup Section */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl shadow-primary/5"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
            <img
              src={mockupImg}
              alt="Decide Fácil en múltiples dispositivos"
              className="w-full h-auto object-cover"
              data-testid="img-mockup-devices"
            />
          </motion.div>
        </section>

        {/* 7. Testimonials Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">Resultados Reales</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Lo que dicen quienes ya decidieron cambiar
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Andrea M.",
                age: "32 años",
                quote: "Antes tardaba 40 minutos en decidir qué almorzar. Ahora uso el framework y en 2 minutos ya estoy comiendo. Mi energía mental cambió completamente.",
                result: "De 40 min a 2 min para decidir"
              },
              {
                name: "Roberto L.",
                age: "38 años",
                quote: "La saturación mental me tenía paralizado. No podía ni elegir qué serie ver sin sentir ansiedad. Decide Fácil me devolvió la confianza en mis propias decisiones.",
                result: "Recuperó confianza en su juicio"
              },
              {
                name: "Valentina S.",
                age: "28 años",
                quote: "La automatización de decisiones diarias fue un game changer. Ya no gasto energía en lo trivial y llego al final del día con claridad mental.",
                result: "Energía mental hasta el final del día"
              },
              {
                name: "Diego P.",
                age: "41 años",
                quote: "Pensé que necesitaba terapia costosa. Lo que necesitaba era un sistema práctico. En una semana ya estaba decidiendo sin culpa.",
                result: "Resultados en 1 semana"
              },
              {
                name: "Camila R.",
                age: "35 años",
                quote: "Lo mejor es que normaliza el problema. No estoy rota, solo necesitaba las herramientas correctas. Ahora decido y sigo adelante sin mirar atrás.",
                result: "Dejó de sentirse culpable"
              },
              {
                name: "Martín G.",
                age: "29 años",
                quote: "Mi pareja notó el cambio antes que yo. Dejé de pedir validación para cada decisión pequeña. Eso mejoró nuestra relación enormemente.",
                result: "Mejoró su relación de pareja"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors duration-300"
                data-testid={`card-testimonial-${i}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.age}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>

                <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-primary text-xs font-medium">{t.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. FAQ Accordion */}
        <section className="py-24 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Cómo funciona la reducción de opciones?",
                a: "El sistema utiliza un enfoque estructurado para descartar las variables secundarias que saturan tu mente. Al enfocarte únicamente en los criterios esenciales, el camino correcto se vuelve evidente por sí mismo."
              },
              {
                q: "¿Cuánto tiempo tardaré en ver resultados?",
                a: "Los resultados son inmediatos. Desde el primer uso del asistente podrás destrabar ese dilema que te quita el sueño en menos de 5 minutos."
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              >
                <button 
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-bold text-white">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4 text-slate-400"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Final CTA Section */}
        <section className="py-32 px-6 max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Recupera la claridad mental hoy mismo</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Cada minuto que pasas dudando es energía que le restas a tu vida.
          </p>
          <Button 
            onClick={openCheckout}
            size="lg" 
            className="bg-orange-500 hover:bg-orange-400 text-white text-lg px-8 h-14 rounded-xl font-bold shadow-[0_0_40px_rgba(249,115,22,0.35)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all mb-8"
            data-testid="button-final-cta"
          >
            ¡Quiero Decidir Sin Estrés Ahora!
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Garantía de 7 Días
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Database className="w-5 h-5 text-primary" />
              Acceso de por vida
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold tracking-tight text-white flex items-center gap-2 mb-2">
              <GitFork className="w-4 h-4 text-primary" />
              DECIDE FÁCIL
            </div>
            <p className="text-slate-500 text-sm">Simplificando tus elecciones diarias.</p>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos del Servicio</a>
          </div>

          <div className="text-slate-500 text-sm">
            © 2026 Decide Fácil. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* 9. Checkout Modal */}
      <AnimatePresence>
        <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </AnimatePresence>
    </div>
  );
}
