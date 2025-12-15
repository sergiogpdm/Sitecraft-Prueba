import { useMemo, useState } from "react";
import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { toConfigFileString } from "../config/exportConfig.js";
import { presets } from "../config/presets.js";
import { googleFonts } from "../config/fonts.js";

import HeroEditor from "../components/customize/HeroEditor.jsx";
import BenefitsEditor from "../components/customize/BenefitsEditor.jsx";
import BestSellersEditor from "../components/customize/BestSellersEditor.jsx";
import PromoEditor from "../components/customize/PromoEditor.jsx";
import FooterEditor from "../components/customize/FooterEditor.jsx";
import ComponentPreview from "../components/customize/ComponentPreview.jsx";

import HeroSection from "../components/sections/HeroSection.jsx";
import BenefitsSection from "../components/sections/BenefitsSection.jsx";
import BestSellersSection from "../components/sections/BestSellersSection.jsx";
import PromoCtaSection from "../components/sections/PromoCtaSection.jsx";
import Footer from "../components/Footer.jsx";

const COMPONENTS = [
  { key: "general", label: "General" },
  { key: "hero", label: "Hero" },
  { key: "benefits", label: "Benefits" },
  { key: "bestSellers", label: "BestSellers" },
  { key: "promo", label: "Promo CTA" },
  { key: "footer", label: "Footer" },
];

function setOverride(setConfig, key, value) {
  setConfig((p) => ({
    ...p,
    theme: {
      ...p.theme,
      overrides: {
        ...(p.theme.overrides || {}),
        [key]: value,
      },
    },
  }));
}

function getOverride(config, key) {
  return config.theme.overrides?.[key] ?? "";
}

export default function Customize() {
  const { config, setConfig } = useSiteConfig();
  const [active, setActive] = useState("general");
  const [importText, setImportText] = useState("");
  const [msg, setMsg] = useState("");

  const presetList = useMemo(() => Object.values(presets), []);
  const activeLabel = useMemo(
    () => COMPONENTS.find((c) => c.key === active)?.label ?? "Editor",
    [active]
  );

  const setPreset = (presetId) =>
    setConfig((p) => ({ ...p, theme: { ...p.theme, preset: presetId } }));

  const exportToClipboard = async () => {
    try {
      const str = toConfigFileString(config);
      await navigator.clipboard.writeText(str);
      setMsg("✅ Config copiada al portapapeles (lista para pegar en site.config.js).");
      setTimeout(() => setMsg(""), 2500);
    } catch {
      const str = toConfigFileString(config);
      setImportText(str);
      setMsg("⚠️ No pude copiar. Te he dejado el export en el cuadro de texto.");
      setTimeout(() => setMsg(""), 3500);
    }
  };

  const importFromText = () => {
    const t = importText.trim();
    if (!t) return;
    try {
      let objText = t.replace(/^export\s+const\s+siteConfig\s*=\s*/m, "");
      objText = objText.replace(/;\s*$/m, "");
      const parsed = JSON.parse(objText);
      setConfig(parsed);
      setMsg("✅ Config importada y aplicada.");
      setTimeout(() => setMsg(""), 2500);
    } catch {
      setMsg("❌ Import fallido. Pega el JSON del objeto o el export generado.");
      setTimeout(() => setMsg(""), 3500);
    }
  };

  const resetOverrides = () =>
    setConfig((p) => ({ ...p, theme: { ...p.theme, overrides: {} } }));

  return (
    <div className="py-16">
      <Container className="grid gap-4 lg:grid-cols-[420px_1fr]">
        {/* LEFT */}
        <GlassCard className="p-6 space-y-6">
          <div>
            <h1 className="text-xl font-semibold">Customize</h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              <b>General</b> = estilo global. <b>Componentes</b> = contenido y preview.
            </p>

            {msg ? (
              <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm">
                {msg}
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold">Editor</div>
            <select
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
              value={active}
              onChange={(e) => setActive(e.target.value)}
            >
              {COMPONENTS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* GENERAL */}
          {active === "general" ? (
            <div className="space-y-6 border-t border-[var(--border)] pt-5">
              <div className="space-y-2">
                <div className="text-sm font-semibold">Apariencia</div>
                <select
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
                  value={config.theme.scheme || "auto"}
                  onChange={(e) =>
                    setConfig((p) => ({
                      ...p,
                      theme: { ...p.theme, scheme: e.target.value },
                    }))
                  }
                >
                  <option value="auto">Auto (según sistema)</option>
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                </select>
              </div>

              <div>
                <div className="text-sm font-semibold">Preset</div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {presetList.map((p) => (
                    <Button
                      key={p.id}
                      variant={config.theme.preset === p.id ? "primary" : "default"}
                      onClick={() => setPreset(p.id)}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold">Modo UI</div>
                <select
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
                  value={config.theme.mode}
                  onChange={(e) =>
                    setConfig((p) => ({
                      ...p,
                      theme: { ...p.theme, mode: e.target.value },
                    }))
                  }
                >
                  <option value="glass">Glass</option>
                  <option value="solid">Solid</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>

              {/* Secciones Home */}
              <div className="space-y-2">
                <div className="text-sm font-semibold">Secciones (Home)</div>
                <div className="text-xs text-[var(--muted)]">
                  Activa/desactiva secciones y ordénalas (afecta a <code>/</code>).
                </div>

                <div className="mt-3 space-y-2">
                  {(config.pages?.home?.sections || []).map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2"
                    >
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={!!s.enabled}
                          onChange={() => {
                            setConfig((p) => ({
                              ...p,
                              pages: {
                                ...p.pages,
                                home: {
                                  ...p.pages.home,
                                  sections: p.pages.home.sections.map((x) =>
                                    x.id === s.id ? { ...x, enabled: !x.enabled } : x
                                  ),
                                },
                              },
                            }));
                          }}
                        />
                        <span className="capitalize">{s.id}</span>
                      </label>

                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          className="px-3 py-2"
                          onClick={() => {
                            setConfig((p) => {
                              const arr = [...p.pages.home.sections];
                              const idx = arr.findIndex((x) => x.id === s.id);
                              const j = idx - 1;
                              if (idx < 0 || j < 0) return p;
                              [arr[idx], arr[j]] = [arr[j], arr[idx]];
                              return {
                                ...p,
                                pages: { ...p.pages, home: { ...p.pages.home, sections: arr } },
                              };
                            });
                          }}
                        >
                          ↑
                        </Button>

                        <Button
                          variant="default"
                          className="px-3 py-2"
                          onClick={() => {
                            setConfig((p) => {
                              const arr = [...p.pages.home.sections];
                              const idx = arr.findIndex((x) => x.id === s.id);
                              const j = idx + 1;
                              if (idx < 0 || j >= arr.length) return p;
                              [arr[idx], arr[j]] = [arr[j], arr[idx]];
                              return {
                                ...p,
                                pages: { ...p.pages, home: { ...p.pages.home, sections: arr } },
                              };
                            });
                          }}
                        >
                          ↓
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold">Tema — overrides</div>

                <div className="grid grid-cols-2 gap-3">
                  <ColorField label="Accent A" value={getOverride(config, "--accentA")} onChange={(v) => setOverride(setConfig, "--accentA", v)} />
                  <ColorField label="Accent B" value={getOverride(config, "--accentB")} onChange={(v) => setOverride(setConfig, "--accentB", v)} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ColorField label="Background" value={getOverride(config, "--bg")} onChange={(v) => setOverride(setConfig, "--bg", v)} />
                  <ColorField label="Text" value={getOverride(config, "--text")} onChange={(v) => setOverride(setConfig, "--text", v)} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ColorField label="Muted" value={getOverride(config, "--muted")} onChange={(v) => setOverride(setConfig, "--muted", v)} />
                  <ColorField label="Border" value={getOverride(config, "--border")} onChange={(v) => setOverride(setConfig, "--border", v)} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ColorField label="Card bg" value={getOverride(config, "--card")} onChange={(v) => setOverride(setConfig, "--card", v)} />
                  <NumberField label="Radius (px)" value={stripPx(getOverride(config, "--radius"))} onChange={(v) => setOverride(setConfig, "--radius", v ? `${v}px` : "")} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <NumberField label="Card blur (px)" value={stripPx(getOverride(config, "--cardBlur"))} onChange={(v) => setOverride(setConfig, "--cardBlur", v ? `${v}px` : "")} />
                  <select
                    className="mt-5 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
                    value={getOverride(config, "--btnRadius") || "999px"}
                    onChange={(e) => setOverride(setConfig, "--btnRadius", e.target.value)}
                  >
                    <option value="999px">Botón pill</option>
                    <option value="14px">Botón rounded</option>
                    <option value="8px">Botón sharp</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-zinc-400">Sombras</div>
                  <Slider label="Shadow Y" min={0} max={60} value={toNum(stripPx(getOverride(config, "--shadowY")), 20)} onChange={(v) => setOverride(setConfig, "--shadowY", `${v}px`)} />
                  <Slider label="Shadow Blur" min={0} max={200} value={toNum(stripPx(getOverride(config, "--shadowBlur")), 80)} onChange={(v) => setOverride(setConfig, "--shadowBlur", `${v}px`)} />
                  <Slider label="Shadow Opacity" min={0} max={0.9} step={0.01} value={toNum(getOverride(config, "--shadowOpacity"), 0.45)} onChange={(v) => setOverride(setConfig, "--shadowOpacity", String(v))} />
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-zinc-400">Hero / Glows</div>
                  <Slider label="Glow Blur" min={20} max={120} value={toNum(stripPx(getOverride(config, "--glowBlur")), 64)} onChange={(v) => setOverride(setConfig, "--glowBlur", `${v}px`)} />
                  <ColorField label="Glow A" value={getOverride(config, "--glowA")} onChange={(v) => setOverride(setConfig, "--glowA", v)} />
                  <ColorField label="Glow B" value={getOverride(config, "--glowB")} onChange={(v) => setOverride(setConfig, "--glowB", v)} />
                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={(getOverride(config, "--heroPattern") || "") !== "none"}
                      onChange={(e) => setOverride(setConfig, "--heroPattern", e.target.checked ? "" : "none")}
                    />
                    Patrón hero (on/off)
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <FontSelect label="Font Display (títulos)" value={getOverride(config, "--fontDisplay")} onChange={(v) => setOverride(setConfig, "--fontDisplay", v)} />
                  <FontSelect label="Font Body (texto)" value={getOverride(config, "--fontBody")} onChange={(v) => setOverride(setConfig, "--fontBody", v)} />
                </div>

                <div className="flex gap-2">
                  <Button variant="default" onClick={resetOverrides}>Reset overrides</Button>
                </div>
              </div>
            </div>
          ) : null}

          {/* COMPONENT EDITORS */}
          {active === "hero" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <HeroEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "benefits" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <BenefitsEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "bestSellers" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <BestSellersEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "promo" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <PromoEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "footer" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <FooterEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

        </GlassCard>

        {/* RIGHT */}
        <div className="space-y-4">
          {/* Preview */}
          {active === "hero" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <HeroSection data={config.copy.hero} preview />
              </div>
            </ComponentPreview>
          ) : active === "benefits" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <BenefitsSection data={config.copy.benefits} preview />
              </div>
            </ComponentPreview>
          ) : active === "bestSellers" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <BestSellersSection data={config.copy.bestSellers} preview />
              </div>
            </ComponentPreview>
          ) : active === "promo" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <PromoCtaSection data={config.copy.promo} preview />
              </div>
            </ComponentPreview>
          ) : active === "footer" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <Footer data={config.copy.footer} preview />
              </div>
            </ComponentPreview>
          ) : (
            <GlassCard className="p-6">
              <div className="text-sm font-semibold">Preview</div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                En <b>General</b> estás editando estilos globales. Mira el resultado en la Home principal.
              </p>
              <div className="mt-4 text-xs text-[var(--muted)]">
                Tip: abre <code>/</code> en otra pestaña para ver cambios globales en vivo.
              </div>
            </GlassCard>
          )}


          {/* Export / Import (debajo del preview) */}
          <GlassCard className="p-6 space-y-3">
            <div className="text-sm font-semibold">Export / Import</div>

            <div className="text-xs text-[var(--muted)]">
              Guarda esta configuración o reutilízala en otro proyecto Sitecraft.
            </div>

            {msg ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm">
                {msg}
              </div>
            ) : null}

            <div className="flex gap-3">
              <Button variant="primary" onClick={exportToClipboard}>
                Exportar config
              </Button>

              <Button
                variant="default"
                onClick={() => {
                  const str = toConfigFileString(config);
                  setImportText(str);
                  setMsg("✅ Export generado en el cuadro de texto.");
                  setTimeout(() => setMsg(""), 2000);
                }}
              >
                Ver export
              </Button>
            </div>

            <textarea
              className="h-40 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 font-mono text-xs outline-none"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Pega aquí un export para importar la configuración…"
            />

            <div className="flex gap-3">
              <Button variant="primary" onClick={importFromText}>
                Importar
              </Button>
              <Button variant="default" onClick={() => setImportText("")}>
                Limpiar
              </Button>
            </div>
          </GlassCard>
        </div>
      </Container>
    </div>
  );
}

/* ---- UI helpers ---- */

function ColorField({ label, value, onChange }) {
  const isRgba = (value || "").trim().startsWith("rgba");
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
        {!isRgba ? (
          <input
            type="color"
            value={value || "#ffffff"}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-10 bg-transparent"
            title={label}
          />
        ) : null}
        <input
          className="w-full bg-transparent text-sm outline-none"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label.includes("Card") || label.includes("Border") ? "rgba(...)" : "#ffffff"}
        />
      </div>
    </label>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        type="number"
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Slider({ label, min, max, step = 1, value, onChange }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span className="text-zinc-300">{String(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full"
      />
    </label>
  );
}

function FontSelect({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <select
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
        value={value || "system"}
        onChange={(e) => onChange(e.target.value)}
      >
        {googleFonts.map((f) => (
          <option key={f.family} value={f.family}>
            {f.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function stripPx(v) {
  return String(v || "").replace("px", "");
}

function toNum(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
