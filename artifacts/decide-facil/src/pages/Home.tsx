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
  CheckCircle2,
  Zap,
  CreditCard,
  Shield
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

        {/* 3. Síntomas Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em] mb-3">¿Te suena familiar?</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              La parálisis decisional te está robando la vida
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Si experimentas alguno de estos síntomas, no estás solo. La fatiga de decisión afecta a millones de personas cada día.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🤯", title: "Parálisis total", desc: "Te quedas congelado al intentar decidir entre opciones simples. Incluso elegir qué cenar se siente imposible." },
              { emoji: "🧠", title: "Agotamiento mental", desc: "Antes del mediodía ya estás drenado mentalmente por la carga de decisiones acumuladas." },
              { emoji: "😔", title: "Desconfianza en tu juicio", desc: "La saturación mental te ha hecho dudar de cada decisión que tomas. Ya no confías en ti mismo." },
              { emoji: "⚡", title: "Carga mental invisible", desc: "Sientes un peso constante que nadie ve pero que afecta tu energía diaria y tus relaciones." },
              { emoji: "💥", title: "Impulsividad y arrepentimiento", desc: "Cuando la fatiga gana, decides impulsivamente y luego te arrepientes durante días." },
              { emoji: "🔄", title: "Procrastinación paralizante", desc: "El miedo a decidir incorrectamente te hace postergar todo. Las decisiones se acumulan." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl hover:border-orange-500/30 transition-colors duration-300"
                data-testid={`card-symptom-${i}`}
              >
                <span className="text-3xl mb-4 block">{item.emoji}</span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Soluciones Fallidas Section */}
        <section className="py-24 px-6 bg-black/40 border-y border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Ya intentaste estas soluciones...{" "}
                <span className="text-orange-500">y no funcionaron</span>
              </h2>
              <p className="text-slate-400">
                No es tu culpa. Estas herramientas no están diseñadas para resolver la parálisis decisional.
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                { title: "Apps de listas de tareas", desc: "No te ayudan a priorizar decisiones importantes. Solo agregan más ítems a tu carga mental." },
                { title: "Cursos de productividad", desc: "Generan más opciones y expectativas. Terminas con más opciones, no menos." },
                { title: "Libros de autoayuda", desc: "Se sienten irrelevantes cuando la fatiga mental es extrema. No puedes concentrarte para leerlos." },
                { title: "Terapia tradicional", desc: "Puede ser costosa y no siempre aborda la toma de decisiones de forma práctica e inmediata." },
                { title: "Meditación", desc: "Si bien es útil, no ofrece soluciones concretas para los problemas de decisión del día a día." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 bg-white/[0.02] border border-white/[0.06] p-5 rounded-xl"
                  data-testid={`row-failed-solution-${i}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <span className="text-white font-semibold">{item.title}:</span>{" "}
                    <span className="text-slate-400">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Mecanismo Único Section */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">El mecanismo único</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Por qué{" "}
              <span className="text-primary">Decide Fácil</span>{" "}
              funciona cuando todo lo demás falla
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-10"
          >
            <p className="text-lg md:text-xl text-white leading-relaxed mb-6">
              Decide Fácil aborda el problema de la parálisis decisional desde la raíz:{" "}
              <span className="text-orange-500 font-semibold">el agotamiento del sistema nervioso.</span>
            </p>
            <p className="text-slate-400 leading-relaxed mb-10">
              En lugar de simplemente brindarte más información (que puede resultar abrumadora) o darte un manual (que puede ser ignorado), Decide Fácil te proporciona un conjunto de herramientas prácticas que limitan tus opciones y te permiten tomar decisiones rápidas y efectivas.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              {[
                { value: "2-3", label: "Opciones máximas por decisión" },
                { value: "< 5 min", label: "Para decidir con confianza" },
                { value: "100%", label: "Práctico y accionable" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-primary mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. 4 Tools Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Todo lo que necesitas para recuperar el control</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Asistente de Decisiones",
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
                title: "Contenido Educativo Normalizador",
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

        {/* FAQ Accordion */}
        <section className="py-24 px-6 bg-black/30 border-y border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Preguntas Frecuentes</h2>
            </motion.div>
            <div className="space-y-3">
              {[
                {
                  q: "¿Esto realmente funciona para alguien con saturación mental severa?",
                  a: "Sí. Decide Fácil fue diseñado específicamente para personas con alta carga mental. Las herramientas no requieren concentración prolongada — cada módulo está pensado para ser usado en 5 minutos o menos, incluso en tus peores días."
                },
                {
                  q: "¿Cuánto tiempo necesito dedicarle al día?",
                  a: "Menos de 5 minutos por decisión. El sistema está diseñado para encajar en tu rutina sin agregar más carga. Muchos usuarios lo usan entre reuniones o en momentos de bloqueo."
                },
                {
                  q: "¿Qué pasa si tengo una recaída y vuelvo a paralizarme?",
                  a: "Es completamente normal. El acceso es de por vida, así que siempre tendrás el sistema disponible cuando lo necesites. Además, el Contenido Educativo Normalizador te explica por qué ocurren las recaídas y cómo salir de ellas rápidamente."
                },
                {
                  q: "¿Es diferente a una app de productividad?",
                  a: "Completamente. Las apps de productividad agregan más listas y tareas. Decide Fácil reduce tus opciones y te ayuda a actuar con lo que ya tienes. Es una herramienta de claridad, no de organización."
                },
                {
                  q: "¿Necesito conocimientos técnicos para usarlo?",
                  a: "No. Todo está diseñado para ser usado de inmediato, sin curva de aprendizaje. Si puedes leer este párrafo, puedes usar Decide Fácil."
                },
                {
                  q: "¿Qué pasa si no me funciona?",
                  a: "Tienes 7 días de garantía de devolución total. Sin preguntas, sin complicaciones. Simplemente escríbenos y te devolvemos el 100% de tu inversión."
                },
                {
                  q: "¿Tengo acceso de por vida?",
                  a: "Sí. Es un pago único. Una vez que accedes, el contenido y las herramientas son tuyas para siempre, incluyendo todas las actualizaciones futuras."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-toggle-${i}`}
                  >
                    <span className="font-semibold text-white pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/[0.05] pt-4">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Garantía Section */}
        <section className="py-20 px-6 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Garantía de 7 Días — Cero Riesgo
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Prueba Decide Fácil durante 7 días completos. Si no sientes que tu capacidad de decisión ha mejorado, si no notas menos ansiedad al elegir, o simplemente no te gusta, te devolvemos el 100% de tu dinero. Sin preguntas, sin complicaciones.
            </p>
            <p className="text-primary font-semibold text-sm italic">
              Tu única decisión difícil hoy es no intentarlo.
            </p>
          </motion.div>
        </section>

        {/* Final CTA Section */}
        <section className="py-28 px-6 max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-orange-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              ¿Listo para dejar de darle vueltas a todo?
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Cada día que pasa sin un sistema es un día más de parálisis, culpa y agotamiento mental. Decide Fácil te da las herramientas para cambiar eso hoy.
            </p>
            <Button
              onClick={openCheckout}
              size="lg"
              className="bg-orange-500 hover:bg-orange-400 text-white text-lg px-10 h-14 rounded-xl font-bold shadow-[0_0_40px_rgba(249,115,22,0.35)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all mb-4"
              data-testid="button-final-cta"
            >
              Sí, Quiero Decidir con Claridad <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-slate-500 text-sm italic mb-10">
              *Porque mi paz mental no puede esperar más*
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                Garantía 7 días
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-slate-500" />
                Acceso inmediato
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-slate-500" />
                Pago único
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-black/40 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
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
          <div className="border-t border-white/[0.05] pt-6 text-center text-slate-600 text-xs">
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
