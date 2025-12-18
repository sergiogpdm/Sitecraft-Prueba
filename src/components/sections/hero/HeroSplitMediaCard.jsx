import { motion } from "framer-motion";
import Button from "../../ui/Button.jsx";
import Container from "../../Container.jsx";
import GlassCard from "../../GlassCard.jsx";
import { useSiteConfig } from "../../../context/SiteConfigContext.jsx";
import { normalizeCta, buildHrefFromCta, navigateSmart, iconFor } from "./heroUtils.js";

export default function HeroSplitMediaCard({ data, preview = false }) {
  const { config } = useSiteConfig();
  const hero = data;

  const {
    badge,
    titleA,
    titleHighlight,
    titleB,
    subtitle,
    stats = [],
    visual: visualRaw,
    quickInfo: quickInfoRaw,
  } = hero;

  const visual = visualRaw || {};
  const showVisual = visual.enabled !== false;

  const quickInfo = quickInfoRaw || {};
  const showQI = quickInfo.enabled !== false;
  const qiItems = Array.isArray(quickInfo.items) ? quickInfo.items : [];

  const safeStats = Array.isArray(stats) ? stats : [];

  const primary = normalizeCta(hero.primaryCta, false);
  const secondary = normalizeCta(hero.secondaryCta, true);

  const handlePrimary = (e) => {
    const href = buildHrefFromCta(primary, config);
    if (href) return navigateSmart({ e, href, newTab: !!primary.newTab, preview });

    // fallback: scroll #menu
    if (preview) return e.preventDefault();
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSecondary = (e) => {
    const href = buildHrefFromCta(secondary, config);
    if (href) return navigateSmart({ e, href, newTab: !!secondary.newTab, preview });

    // fallback maps
    if (preview) return e.preventDefault();
    const maps = config?.links?.maps;
    if (maps) window.open(maps, "_blank", "noopener,noreferrer");
  };

  const chips = Array.isArray(visual.chips) ? visual.chips : [];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0">
        <div
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full"
          style={{ background: "var(--glowA)", filter: `blur(var(--glowBlur, 64px))` }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full"
          style={{ background: "var(--glowB)", filter: `blur(var(--glowBlur, 64px))` }}
        />
        <div className="absolute inset-0" style={{ background: "var(--heroPattern)" }} />
      </div>

      <Container className="relative">
        <div
          className={`grid gap-6 lg:items-center ${
            showVisual ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-1"
          }`}
        >
          <div>
            {badge ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs text-[var(--muted)]">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "linear-gradient(90deg,var(--accentA),var(--accentB))" }}
                />
                {badge}
              </div>
            ) : null}

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {titleA ? <span>{titleA} </span> : null}
              {titleHighlight ? (
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, var(--accentA), var(--accentB))" }}
                >
                  {titleHighlight}
                </span>
              ) : null}
              {titleB ? <span> {titleB}</span> : null}
            </motion.h1>

            {subtitle ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                {subtitle}
              </p>
            ) : null}

            {(primary?.label || secondary?.label) ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {primary?.label ? (
                  <Button variant="primary" onClick={handlePrimary}>
                    {primary.label}
                  </Button>
                ) : null}
                {secondary?.label ? (
                  <Button variant="default" onClick={handleSecondary}>
                    {secondary.label}
                  </Button>
                ) : null}
              </div>
            ) : null}

            {showQI && qiItems.length ? (
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {qiItems.slice(0, 6).map((it, idx) => (
                  <div
                    key={`${it?.label ?? "qi"}-${idx}`}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3"
                  >
                    <div className="mt-[2px] text-sm">{iconFor(it?.icon)}</div>
                    <div className="min-w-0">
                      <div className="text-xs text-[var(--muted)]">{it?.label ?? ""}</div>
                      <div className="text-sm font-semibold text-[var(--text)] truncate">
                        {it?.value ?? ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {safeStats.length ? (
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {safeStats.map((s, idx) => (
                  <div
                    key={`${s?.title ?? "stat"}-${idx}`}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3"
                  >
                    <div className="text-sm font-semibold text-[var(--text)]">{s?.title ?? "—"}</div>
                    <div className="mt-1 text-xs text-[var(--muted)]">{s?.desc ?? ""}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {showVisual ? (
            <GlassCard className="relative p-5 sm:p-6">
              <div className="text-xs text-[var(--muted)]">{visual.kicker || "Foto"}</div>
              <div className="mt-3 text-sm font-semibold">{visual.title || "Imagen del local"}</div>
              <div className="mt-2 text-xs text-[var(--muted)]">
                {visual.desc || "Añade una foto real para que impacte más."}
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                {visual.imageSrc ? (
                  <img
                    src={visual.imageSrc}
                    alt={visual.imageAlt || "Imagen"}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center text-xs text-[var(--muted)]">
                    Sin imagen (añádela desde Customize)
                  </div>
                )}
              </div>

              {chips.length ? (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {chips.slice(0, 4).map((c, idx) => (
                    <div
                      key={`${c?.label ?? "chip"}-${idx}`}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
                    >
                      <div className="text-xs text-[var(--muted)]">{c?.label ?? "—"}</div>
                      <div className="mt-1 font-semibold">{c?.value ?? ""}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </GlassCard>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
