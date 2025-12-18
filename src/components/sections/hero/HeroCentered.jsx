import { motion } from "framer-motion";
import Button from "../../ui/Button.jsx";
import Container from "../../Container.jsx";
import GlassCard from "../../GlassCard.jsx";
import { useSiteConfig } from "../../../context/SiteConfigContext.jsx";
import { normalizeCta, buildHrefFromCta, navigateSmart, iconFor } from "./heroUtils.js";

export default function HeroCentered({ data, preview = false }) {
  const { config } = useSiteConfig();
  const hero = data;

  const { badge, titleA, titleHighlight, titleB, subtitle, visual: visualRaw, quickInfo: qiRaw } = hero;

  const visual = visualRaw || {};
  const showVisual = visual.enabled !== false;

  const quickInfo = qiRaw || {};
  const showQI = quickInfo.enabled !== false;
  const qiItems = Array.isArray(quickInfo.items) ? quickInfo.items : [];

  const primary = normalizeCta(hero.primaryCta, false);
  const secondary = normalizeCta(hero.secondaryCta, true);

  const handle = (cta) => (e) => {
    const href = buildHrefFromCta(cta, config);
    if (href) return navigateSmart({ e, href, newTab: !!cta.newTab, preview });

    // fallback: scroll #menu
    if (preview) return e.preventDefault();
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
        <div className="mx-auto max-w-3xl text-center">
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
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {subtitle}
            </p>
          ) : null}

          {(primary?.label || secondary?.label) ? (
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primary?.label ? (
                <Button variant="primary" onClick={handle(primary)}>
                  {primary.label}
                </Button>
              ) : null}
              {secondary?.label ? (
                <Button variant="default" onClick={handle(secondary)}>
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
                  className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-left"
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

          {showVisual ? (
            <div className="mt-8">
              <GlassCard className="p-5 sm:p-6 text-left">
                <div className="text-xs text-[var(--muted)]">{visual.kicker || "Foto"}</div>
                <div className="mt-2 text-sm font-semibold">{visual.title || "Imagen del local"}</div>
                <div className="mt-2 text-xs text-[var(--muted)]">{visual.desc || ""}</div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                  {visual.imageSrc ? (
                    <img
                      src={visual.imageSrc}
                      alt={visual.imageAlt || "Imagen"}
                      className="h-64 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center text-xs text-[var(--muted)]">
                      Sin imagen (añádela desde Customize)
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
