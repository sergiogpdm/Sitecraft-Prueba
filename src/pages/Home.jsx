import Container from "../components/Container.jsx";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle.jsx";
import GlassCard from "../components/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import { Flame, Timer, Star, Truck, BadgeCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * i },
  }),
};

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        </div>

        <Container className="relative py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Recién hechas • Ingredientes top • Mucho “wow”
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="text-4xl sm:text-5xl font-semibold tracking-tight"
              >
                La pizza que <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">entra por los ojos</span>{" "}
                y se queda por el sabor.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="text-zinc-300 leading-relaxed"
              >
                Masa fermentada, horno a tope y combinaciones pensadas para que te apetezca pedir
                antes de terminar de bajar.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  as="a"
                  href="https://wa.me/34000000000"
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Pedir por WhatsApp
                </Button>
                <Button as="a" href="/carta" variant="default">
                  Ver carta
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={4}
                className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3"
              >
                <MiniStat icon={<Star size={16} />} title="4.8/5" desc="Reseñas" />
                <MiniStat icon={<Timer size={16} />} title="Rápida" desc="Pedido ágil" />
                <MiniStat icon={<BadgeCheck size={16} />} title="Calidad" desc="Ingredientes" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.55)] overflow-hidden">
                {/* “Hero image” sin assets: patrón visual */}
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.35),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(249,115,22,0.30),transparent_55%)]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-7xl">🍕</div>
                    <div className="mt-3 text-sm text-zinc-200">
                      Aquí luego puedes poner una foto real brutal
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden sm:block">
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10">
                      <Flame size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Horno fuerte</div>
                      <div className="text-xs text-zinc-400">
                        Bordes crujientes, centro perfecto
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              <div className="absolute -top-6 -right-6 hidden sm:block">
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10">
                      <Truck size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Recoge o envío</div>
                      <div className="text-xs text-zinc-400">Como te venga mejor</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionTitle
            kicker="Diseñado para abrir y pedir"
            title="Una web que vende sin parecer “agresiva”"
            desc="Secciones tipo ecommerce: producto, confianza, urgencia y CTA claro."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Feature
              icon={<Flame size={18} />}
              title="Sensación premium"
              desc="Tipografía grande, contraste y cards glass para ese efecto “wow”."
            />
            <Feature
              icon={<Star size={18} />}
              title="Confianza (social proof)"
              desc="Reseñas, sellos y mensajes cortos que bajan la fricción."
            />
            <Feature
              icon={<Timer size={18} />}
              title="Acción inmediata"
              desc="CTA fijo + WhatsApp para convertir rápido desde móvil."
            />
          </div>
        </Container>
      </section>

      {/* BEST SELLERS (mock) */}
      <section className="py-16 sm:py-20 border-y border-white/10 bg-white/[0.02]">
        <Container>
          <SectionTitle
            kicker="Top de la casa"
            title="Lo que más se pide (preview)"
            desc="Esto luego lo alimentas desde tu BBDD. De momento, es un escaparate."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <ProductTeaser name="Margarita Pro" price="8,50€" desc="Clásica, pero con presencia." />
            <ProductTeaser name="Diavola" price="10,50€" desc="Picantita, adictiva." />
            <ProductTeaser name="Trufa & Setas" price="12,90€" desc="La “cara” que enamora." />
          </div>

          <div className="mt-8 flex justify-center">
            <Button as="a" href="/carta" variant="default">Ver carta completa</Button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <Container>
          <GlassCard className="p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="text-xs text-zinc-300/80">
                  Promoción de lanzamiento (editable)
                </div>
                <h3 className="mt-2 text-2xl sm:text-3xl font-semibold">
                  ¿Te apetece una ahora mismo?
                </h3>
                <p className="mt-3 text-zinc-300 leading-relaxed">
                  Entra, mira dos pizzas… y cuando te des cuenta ya has abierto WhatsApp.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <Button
                  as="a"
                  href="https://wa.me/34000000000"
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Pedir ahora
                </Button>
                <Button as="a" href="/contacto" variant="default">
                  Ver ubicación
                </Button>
              </div>
            </div>
          </GlassCard>
        </Container>
      </section>
    </div>
  );
}

function MiniStat({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-2 text-zinc-200">
        <span className="text-amber-300">{icon}</span>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className="mt-1 text-xs text-zinc-400">{desc}</div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-sm text-zinc-400 leading-relaxed">{desc}</div>
        </div>
      </div>
    </GlassCard>
  );
}

function ProductTeaser({ name, price, desc }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="mt-1 text-sm text-zinc-400">{desc}</div>
        </div>
        <div className="text-sm font-semibold text-amber-300">{price}</div>
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-zinc-300">
        Foto real aquí + etiquetas (🔥, ⭐, “nuevo”)
      </div>
    </GlassCard>
  );
}
