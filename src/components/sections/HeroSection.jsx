import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import Button from "../ui/Button.jsx";
import { motion } from "framer-motion";
import { BadgeCheck, Star, Timer, Flame, Truck } from "lucide-react";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * i },
  }),
};

export default function HeroSection() {
  const { config } = useSiteConfig();
  const c = config.copy.hero;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full" style={{ background: "var(--glowA)", filter: "blur(64px)" }} />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full" style={{ background: "var(--glowB)", filter: "blur(64px)" }} />
        <div className="absolute inset-0" style={{ background: "var(--heroPattern)" }} />
      </div>


      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs text-zinc-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accentA)]" />
              {c.badge}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              {c.titleA}{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, var(--accentA), var(--accentB))" }}
              >
                {c.titleHighlight}
              </span>{" "}
              {c.titleB}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-zinc-300 leading-relaxed"
            >
              {c.subtitle}
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
                href={config.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                variant="primary"
              >
                {c.primaryCta}
              </Button>

              {config.pages.menu?.enabled ? (
                <Button as="a" href="/carta" variant="default">
                  {c.secondaryCta}
                </Button>
              ) : null}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3"
            >
              <MiniStat icon={<Star size={16} />} title={c.stats?.[0]?.title ?? "4.8/5"} desc={c.stats?.[0]?.desc ?? "Reseñas"} />
              <MiniStat icon={<Timer size={16} />} title={c.stats?.[1]?.title ?? "Rápida"} desc={c.stats?.[1]?.desc ?? "Pedido ágil"} />
              <MiniStat icon={<BadgeCheck size={16} />} title={c.stats?.[2]?.title ?? "Calidad"} desc={c.stats?.[2]?.desc ?? "Ingredientes"} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl border border-[var(--border)] bg-gradient-to-br from-white/10 to-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.55)] overflow-hidden">
              <div className="h-full w-full"
                style={{
                  background:
                    "radial-gradient(circle_at_30%_30%, color-mix(in srgb, var(--accentA) 35%, transparent), transparent 55%), radial-gradient(circle_at_70%_60%, color-mix(in srgb, var(--accentB) 30%, transparent), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-7xl">{config.brand.emojiLogo}</div>
                  <div className="mt-3 text-sm text-zinc-200">{c.imageHint}</div>
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
                    <div className="text-xs text-zinc-400">Bordes crujientes, centro perfecto</div>
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
  );
}

function MiniStat({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
      <div className="flex items-center gap-2 text-zinc-200">
        <span className="text-[var(--accentA)]">{icon}</span>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className="mt-1 text-xs text-zinc-400">{desc}</div>
    </div>
  );
}
