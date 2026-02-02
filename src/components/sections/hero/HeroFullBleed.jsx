import { motion } from "framer-motion";
import Button from "../../ui/Button.jsx";
import Container from "../../Container.jsx";
import { useSiteConfig } from "../../../context/SiteConfigContext.jsx";
import HeroBackdrop from "./HeroBackdrop.jsx";
import { normalizeCta, buildHrefFromCta, navigateSmart, iconFor } from "./heroUtils.js";

export default function HeroFullBleed({ data, preview = false }) {
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
    quickInfo: qiRaw,
  } = hero;

  const visual = visualRaw || {};
  const bg = visual.imageSrc || "";

  const safeStats = Array.isArray(stats) ? stats : [];

  const quickInfo = qiRaw || {};
  const showQI = quickInfo.enabled !== false;
  const qiItems = Array.isArray(quickInfo.items) ? quickInfo.items : [];

  const primary = normalizeCta(hero.primaryCta, false);
  const secondary = normalizeCta(hero.secondaryCta, true);

  const handle = (cta) => (e) => {
    const href = buildHrefFromCta(cta, config);
    if (href) return navigateSmart({ e, href, newTab: !!cta.newTab, preview });
    if (preview) return e.preventDefault();
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      {bg ? (
        <div className="absolute inset-0">
          <img
            src={bg}
            alt={visual.imageAlt || "Background"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: "rgba(7,10,18,0.65)" }} />
        </div>
      ) : (
        <div className="absolute inset-0">
          <HeroBackdrop bg={hero.background} />
        </div>
      )}

      <Container className="relative">
        <div className="max-w-3xl">
          {badge ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs text-[color:var(--heroMuted,var(--muted))] backdrop-blur">
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
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--heroMuted,var(--muted))] sm:text-base">
              {subtitle}
            </p>
          ) : null}

          {(primary?.label || secondary?.label) ? (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
                  className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 backdrop-blur"
                >
                  <div className="mt-[2px] text-sm">{iconFor(it?.icon)}</div>
                  <div className="min-w-0">
                    <div className="text-xs text-[color:var(--heroMuted,var(--muted))]">{it?.label ?? ""}</div>
                    <div className="text-sm font-semibold text-[color:var(--heroText,var(--text))] truncate">
                      {it?.value ?? ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* ✅ Stats */}
          {safeStats.length ? (
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {safeStats.map((s, idx) => (
                <div
                  key={`${s?.title ?? "stat"}-${idx}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 backdrop-blur"
                >
                  <div className="text-sm font-semibold text-[color:var(--heroText,var(--text))]">{s?.title ?? "—"}</div>
                  <div className="mt-1 text-xs text-[color:var(--heroMuted,var(--muted))]">{s?.desc ?? ""}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
