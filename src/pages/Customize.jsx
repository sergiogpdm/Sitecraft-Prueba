import { useEffect, useMemo, useState } from "react";
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
import ContactEditor from "../components/customize/ContactEditor.jsx";
import GalleryEditor from "../components/customize/GalleryEditor.jsx";
import ComponentPreview from "../components/customize/ComponentPreview.jsx";

import PhotoStripEditor from "../components/customize/PhotoStripEditor.jsx";
import StoryEditor from "../components/customize/StoryEditor.jsx";

import HeroSection from "../components/sections/HeroSection.jsx";
import BenefitsSection from "../components/sections/BenefitsSection.jsx";
import BestSellersSection from "../components/sections/BestSellersSection.jsx";
import PromoCtaSection from "../components/sections/PromoCtaSection.jsx";
import GallerySection from "../components/sections/GallerySection.jsx";
import Footer from "../components/Footer.jsx";
import Contact from "../pages/Contact.jsx";

import PhotoStripSection from "../components/sections/PhotoStripSection.jsx";
import StorySection from "../components/sections/StorySection.jsx";

import ContactForm from "../components/forms/ContactForm.jsx";
import ContactFormEditor from "../components/customize/ContactFormEditor.jsx";


const COMPONENTS = [
  { key: "general", label: "General" },
  { key: "hero", label: "Hero" },
  { key: "benefits", label: "Benefits" },
  { key: "bestSellers", label: "BestSellers" },
  { key: "promo", label: "Promo CTA" },
  { key: "gallery", label: "Gallery" },

  { key: "countdown", label: "Countdown" },
  { key: "itinerary", label: "Itinerario" },
  { key: "photoStrip", label: "PhotoStrip" },
  { key: "story", label: "Story / Timeline" },

  { key: "footer", label: "Footer" },
  { key: "contact", label: "Contact" },
  { key: "contactForm", label: "ContactForm" },

];

const HOME_SECTION_CATALOG = [
  { id: "hero", label: "Hero" },
  { id: "benefits", label: "Benefits" },
  { id: "gallery", label: "Gallery" },
  { id: "bestSellers", label: "BestSellers" },

  // Soporta ambas keys por si usas una u otra
  { id: "promoCta", label: "Promo CTA" },
  { id: "promo", label: "Promo CTA (alt)" },

  { id: "countdown", label: "Countdown" },
  { id: "itinerary", label: "Itinerario" },
  { id: "photoStrip", label: "PhotoStrip" },
  { id: "story", label: "Story / Timeline" },

  { id: "contactForm", label: "ContactForm" },

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

function ensureCopyPath(config, path, fallbackValue) {
  // path ej: ["copy","countdown"]
  let cur = config;
  for (let i = 0; i < path.length; i++) {
    const k = path[i];
    if (i === path.length - 1) {
      if (cur?.[k] == null) cur[k] = fallbackValue;
    } else {
      if (!cur[k] || typeof cur[k] !== "object") cur[k] = {};
      cur = cur[k];
    }
  }
}

function ensureHomeSection(config, id, enabled = true, label) {
  if (!config.pages) config.pages = {};
  if (!config.pages.home) config.pages.home = {};
  if (!Array.isArray(config.pages.home.sections)) config.pages.home.sections = [];

  const idx = config.pages.home.sections.findIndex((s) => s.id === id);

  if (idx === -1) {
    const entry = { id, enabled };
    if (label) entry.label = label;
    config.pages.home.sections.push(entry);
    return;
  }

  const existing = config.pages.home.sections[idx];

  // No tocamos enabled si ya está definido, salvo que sea undefined
  if (existing.enabled === undefined) existing.enabled = enabled;

  // Si no tiene label y nos pasan uno, lo guardamos
  if (label && (!existing.label || String(existing.label).trim() === "")) {
    existing.label = label;
  }
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

  // ✅ Auto-crea defaults de boda al entrar a /customize (solo si faltan)
  // ✅ Auto-crea defaults de boda al entrar a /customize (solo si faltan)
  useEffect(() => {
    const missingCountdown = !config.copy?.countdown;
    const missingItinerary = !config.copy?.itinerary;
    const missingPhotoStrip = !config.copy?.photoStrip;
    const missingStory = !config.copy?.story;
    const missingContactForm = !config.copy?.contactForm;


    const homeSections = config.pages?.home?.sections || [];
    const homeHas = new Set(homeSections.map((s) => s.id));

    const missingHomeSection =
      !homeHas.has("hero") ||
      !homeHas.has("countdown") ||
      !homeHas.has("photoStrip") ||
      !homeHas.has("itinerary") ||
      !homeHas.has("story") ||
      !homeHas.has("benefits") ||
      !homeHas.has("contactForm") ||
      !homeHas.has("gallery");

    const needs =
      missingCountdown ||
      missingItinerary ||
      missingPhotoStrip ||
      missingStory ||
      missingContactForm ||
      missingHomeSection;

    if (!needs) return;

    setConfig((p) => {
      const next = structuredClone ? structuredClone(p) : JSON.parse(JSON.stringify(p));

      ensureCopyPath(next, ["copy", "countdown"], {
        enabled: true,
        kicker: "Nos casamos",
        title: "Cuenta atrás",
        dateTime: "2026-06-20T18:00:00",
        timezone: "Europe/Madrid",
        note: "¡Te esperamos! Guarda la fecha ✨",
        location: "",
      });

      ensureCopyPath(next, ["copy", "itinerary"], {
        enabled: true,
        kicker: "Itinerario",
        title: "Horario del día",
        desc: "Aquí tienes los momentos clave para que no te pierdas nada.",
        items: [
          { time: "18:00", title: "Ceremonia", desc: "Llegada 15 min antes.", location: "Iglesia / Lugar" },
          { time: "19:30", title: "Cóctel", desc: "Brindis y fotos.", location: "Jardín / Patio" },
          { time: "21:00", title: "Banquete", desc: "Cena y sorpresas.", location: "Salón" },
          { time: "23:30", title: "Fiesta", desc: "Baila hasta que el cuerpo aguante.", location: "Zona DJ" },
        ],
      });

      ensureCopyPath(next, ["copy", "photoStrip"], {
        enabled: true,
        kicker: "Momentos",
        title: "Un poquito de nosotros",
        note: "",
        photos: ["", "", "", "", ""],
      });

      ensureCopyPath(next, ["copy", "story"], {
        enabled: true,
        kicker: "Nuestra historia",
        title: "Cómo empezó todo",
        desc: "Un resumen rápido de nuestro camino hasta el gran día.",
        items: [
          { date: "2022", title: "Nos conocimos", text: "Añade aquí un texto corto.", image: "" },
          { date: "2024", title: "Nuestro primer viaje", text: "Añade aquí un texto corto.", image: "" },
          { date: "2025", title: "La pedida", text: "Añade aquí un texto corto.", image: "" },
        ],
      });

      ensureCopyPath(next, ["copy", "contactForm"], {
        variant: "card",
        title: "Pide información",
        subtitle: "Rellena el formulario y te contestamos lo antes posible.",
        submitText: "Enviar",
        minMessageLength: 10,

        fields: { name: true, phone: true, message: true },

        
        labels: { name: "Nombre", phone: "Teléfono", message: "Consulta" },
        placeholders: {
          name: "Tu nombre",
          phone: "+34 600 000 000",
          message: "Cuéntanos tu caso…",
        },
        destination: {
          type: "email",
          emailTo: "tucorreo@dominio.com",
          whatsappTo: "34600111222",
          subject: "Nueva consulta desde la web",
        },
        
      });



      ensureHomeSection(next, "hero", true, "Inicio");
      ensureHomeSection(next, "countdown", true, "Cuenta atrás");
      ensureHomeSection(next, "photoStrip", true, "Momentos");
      ensureHomeSection(next, "itinerary", true, "Itinerario");
      ensureHomeSection(next, "story", true, "Nuestra historia");
      ensureHomeSection(next, "benefits", true, "Ventajas");
      ensureHomeSection(next, "gallery", true, "Galería");
      ensureHomeSection(next, "contactForm", true, "Contacto");



      return next;
    });
  }, [
    config.copy?.countdown,
    config.copy?.itinerary,
    config.copy?.photoStrip,
    config.copy?.story,
    config.copy?.contactForm,
    config.pages?.home?.sections,
    setConfig,
  ]);




  const homeSectionIds = useMemo(
    () => new Set((config.pages?.home?.sections || []).map((s) => s.id)),
    [config.pages?.home?.sections]
  );

  const addHomeSection = (id) => {
    setConfig((p) => {
      const exists = (p.pages?.home?.sections || []).some((s) => s.id === id);
      if (exists) return p;

      return {
        ...p,
        pages: {
          ...p.pages,
          home: {
            ...p.pages?.home,
            sections: [...(p.pages?.home?.sections || []), { id, enabled: true }],
          },
        },
      };
    });
  };

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

              {/* Secciones Header (Navbar) */}
              <div className="space-y-2">
                <div className="text-sm font-semibold">Secciones (Header)</div>
                <div className="text-xs text-[var(--muted)]">
                  Controla qué enlaces aparecen en el menú superior. <b>Inicio</b> es obligatorio.
                </div>

                <div className="mt-3 space-y-2">
                  {/* Carta */}
                  <div className="flex items-center justify-between gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                    <label className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={!!config.pages?.menu?.enabled}
                        onChange={() =>
                          setConfig((p) => ({
                            ...p,
                            pages: {
                              ...p.pages,
                              menu: { ...(p.pages.menu || {}), enabled: !p.pages?.menu?.enabled },
                            },
                          }))
                        }
                      />
                      <span>Carta</span>
                    </label>
                    <span className="text-xs text-[var(--muted)]">
                      {config.pages?.menu?.enabled ? "Visible" : "Oculta"}
                    </span>
                  </div>

                  {/* Contacto */}
                  <div className="flex items-center justify-between gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                    <label className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={!!config.pages?.contact?.enabled}
                        onChange={() =>
                          setConfig((p) => ({
                            ...p,
                            pages: {
                              ...p.pages,
                              contact: {
                                ...(p.pages.contact || {}),
                                enabled: !p.pages?.contact?.enabled,
                              },
                            },
                          }))
                        }
                      />
                      <span>Contacto</span>
                    </label>
                    <span className="text-xs text-[var(--muted)]">
                      {config.pages?.contact?.enabled ? "Visible" : "Oculta"}
                    </span>
                  </div>
                </div>
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

                {/* Añadir secciones que falten */}
                <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
                  <div className="text-xs text-[var(--muted)]">
                    Añadir secciones (si no aparecen arriba):
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {HOME_SECTION_CATALOG.filter((s) => !homeSectionIds.has(s.id)).map((s) => (
                      <Button key={s.id} variant="default" onClick={() => addHomeSection(s.id)}>
                        + {s.label}
                      </Button>
                    ))}
                    {HOME_SECTION_CATALOG.every((s) => homeSectionIds.has(s.id)) ? (
                      <div className="text-xs text-[var(--muted)]">No faltan secciones ✅</div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold">Tema — overrides</div>

                <div className="grid grid-cols-2 gap-3">
                  <ColorField
                    label="Accent A"
                    value={getOverride(config, "--accentA")}
                    onChange={(v) => setOverride(setConfig, "--accentA", v)}
                  />
                  <ColorField
                    label="Accent B"
                    value={getOverride(config, "--accentB")}
                    onChange={(v) => setOverride(setConfig, "--accentB", v)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ColorField
                    label="Background"
                    value={getOverride(config, "--bg")}
                    onChange={(v) => setOverride(setConfig, "--bg", v)}
                  />
                  <ColorField
                    label="Text"
                    value={getOverride(config, "--text")}
                    onChange={(v) => setOverride(setConfig, "--text", v)}
                  />
                </div>


                <div className="grid grid-cols-2 gap-3">
                  <ColorField
                    label="Muted"
                    value={getOverride(config, "--muted")}
                    onChange={(v) => setOverride(setConfig, "--muted", v)}
                  />
                  <ColorField
                    label="Border"
                    value={getOverride(config, "--border")}
                    onChange={(v) => setOverride(setConfig, "--border", v)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ColorField
                    label="Card bg"
                    value={getOverride(config, "--card")}
                    onChange={(v) => setOverride(setConfig, "--card", v)}
                  />
                  <NumberField
                    label="Radius (px)"
                    value={stripPx(getOverride(config, "--radius"))}
                    onChange={(v) => setOverride(setConfig, "--radius", v ? `${v}px` : "")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <NumberField
                    label="Card blur (px)"
                    value={stripPx(getOverride(config, "--cardBlur"))}
                    onChange={(v) => setOverride(setConfig, "--cardBlur", v ? `${v}px` : "")}
                  />
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
                  <Slider
                    label="Shadow Y"
                    min={0}
                    max={60}
                    value={toNum(stripPx(getOverride(config, "--shadowY")), 20)}
                    onChange={(v) => setOverride(setConfig, "--shadowY", `${v}px`)}
                  />
                  <Slider
                    label="Shadow Blur"
                    min={0}
                    max={200}
                    value={toNum(stripPx(getOverride(config, "--shadowBlur")), 80)}
                    onChange={(v) => setOverride(setConfig, "--shadowBlur", `${v}px`)}
                  />
                  <Slider
                    label="Shadow Opacity"
                    min={0}
                    max={0.9}
                    step={0.01}
                    value={toNum(getOverride(config, "--shadowOpacity"), 0.45)}
                    onChange={(v) => setOverride(setConfig, "--shadowOpacity", String(v))}
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-zinc-400">Hero / Glows</div>
                  <Slider
                    label="Glow Blur"
                    min={20}
                    max={120}
                    value={toNum(stripPx(getOverride(config, "--glowBlur")), 64)}
                    onChange={(v) => setOverride(setConfig, "--glowBlur", `${v}px`)}
                  />
                  <ColorField
                    label="Glow A"
                    value={getOverride(config, "--glowA")}
                    onChange={(v) => setOverride(setConfig, "--glowA", v)}
                  />
                  <ColorField
                    label="Glow B"
                    value={getOverride(config, "--glowB")}
                    onChange={(v) => setOverride(setConfig, "--glowB", v)}
                  />
                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={(getOverride(config, "--heroPattern") || "") !== "none"}
                      onChange={(e) =>
                        setOverride(setConfig, "--heroPattern", e.target.checked ? "" : "none")
                      }
                    />
                    Patrón hero (on/off)
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <FontSelect
                    label="Font Display (títulos)"
                    value={getOverride(config, "--fontDisplay")}
                    onChange={(v) => setOverride(setConfig, "--fontDisplay", v)}
                  />
                  <FontSelect
                    label="Font Body (texto)"
                    value={getOverride(config, "--fontBody")}
                    onChange={(v) => setOverride(setConfig, "--fontBody", v)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="default" onClick={resetOverrides}>
                    Reset overrides
                  </Button>
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

          {active === "gallery" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <GalleryEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "countdown" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <CountdownEditorInline config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "itinerary" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <ItineraryEditorInline config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "photoStrip" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <PhotoStripEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "story" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <StoryEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "footer" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <FooterEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "contact" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <ContactEditor config={config} setConfig={setConfig} />
            </div>
          ) : null}

          {active === "contactForm" ? (
            <div className="border-t border-[var(--border)] pt-5">
              <ContactFormEditor config={config} setConfig={setConfig} />
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
          ) : active === "gallery" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <GallerySection data={config.copy.gallery} preview />
              </div>
            </ComponentPreview>
          ) : active === "countdown" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <CountdownPreviewInline data={config.copy?.countdown} />
              </div>
            </ComponentPreview>
          ) : active === "itinerary" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <ItineraryPreviewInline data={config.copy?.itinerary} />
              </div>
            </ComponentPreview>
          ) : active === "photoStrip" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <PhotoStripSection data={config.copy?.photoStrip} preview />
              </div>
            </ComponentPreview>
          ) : active === "story" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <StorySection data={config.copy?.story} preview />
              </div>
            </ComponentPreview>
          ) : active === "contactForm" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)] p-6">
                <div className="mx-auto max-w-2xl">
                  <ContactForm {...(config.copy?.contactForm || {})} />
                </div>
              </div>
            </ComponentPreview>
          ) : active === "footer" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <Footer data={config.copy.footer} preview />
              </div>
            </ComponentPreview>
          ) : active === "contact" ? (
            <ComponentPreview title={`Preview — ${activeLabel}`}>
              <div className="bg-[var(--bg)]">
                <Contact data={config.copy.contactPage} preview />
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

/* ------------------ Countdown (INLINE) ------------------ */

function CountdownEditorInline({ config, setConfig }) {
  const data = config.copy?.countdown || {};

  const setField = (key, value) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        countdown: {
          enabled: true,
          kicker: "",
          title: "",
          dateTime: "",
          timezone: "",
          note: "",
          location: "",
          ...(p.copy?.countdown || {}),
          [key]: value,
        },
      },
    }));
  };

  const setEnabled = (enabled) => setField("enabled", enabled);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Countdown</div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={data.enabled !== false}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <span className="text-xs text-[var(--muted)]">{data.enabled === false ? "Oculto" : "Visible"}</span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <TextField label="Kicker" value={data.kicker ?? ""} onChange={(v) => setField("kicker", v)} />
        <TextField label="Título" value={data.title ?? ""} onChange={(v) => setField("title", v)} />
        <TextField label="Nota (opcional)" value={data.note ?? ""} onChange={(v) => setField("note", v)} />
        <TextField label="Lugar (opcional)" value={data.location ?? ""} onChange={(v) => setField("location", v)} />

        <label className="block">
          <div className="text-xs text-zinc-400">Fecha y hora (ISO/local)</div>
          <input
            type="datetime-local"
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
            value={toDatetimeLocalValue(data.dateTime)}
            onChange={(e) => {
              const v = e.target.value || "";
              setField("dateTime", v ? `${v}:00` : "");
            }}
          />
        </label>

        <TextField
          label="Timezone (ej: Europe/Madrid)"
          value={data.timezone ?? ""}
          onChange={(v) => setField("timezone", v)}
        />

        <div className="text-xs text-[var(--muted)]">
          Tip: si no quieres timezone, déjalo vacío y se mostrará según el navegador.
        </div>
      </div>
    </div>
  );
}

function CountdownPreviewInline({ data }) {
  const d = data || {};
  const enabled = d.enabled !== false;

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!enabled) {
    return (
      <div className="p-10">
        <GlassCard className="p-6">
          <div className="text-sm font-semibold">Countdown</div>
          <div className="mt-2 text-sm text-[var(--muted)]">Esta sección está oculta.</div>
        </GlassCard>
      </div>
    );
  }

  const targetMs = parseDateTimeLoose(d.dateTime);
  const diff = targetMs ? Math.max(0, targetMs - now) : null;
  const parts = diff == null ? null : splitMs(diff);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <GlassCard className="p-6">
          {d.kicker ? <div className="text-xs text-[var(--muted)]">{d.kicker}</div> : null}
          <div className="mt-1 text-xl font-semibold">{d.title || "Cuenta atrás"}</div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <CountdownTile label="Días" value={parts ? parts.days : "—"} />
            <CountdownTile label="Horas" value={parts ? parts.hours : "—"} />
            <CountdownTile label="Min" value={parts ? parts.minutes : "—"} />
            <CountdownTile label="Seg" value={parts ? parts.seconds : "—"} />
          </div>

          {d.location ? <div className="mt-4 text-sm text-[var(--muted)]">📍 {d.location}</div> : null}
          {d.note ? <div className="mt-3 text-sm text-[var(--muted)]">{d.note}</div> : null}

          {d.dateTime ? (
            <div className="mt-4 text-xs text-[var(--muted)]">
              Fecha: <code>{d.dateTime}</code> {d.timezone ? <span>({d.timezone})</span> : null}
            </div>
          ) : (
            <div className="mt-4 text-xs text-[var(--muted)]">Pon una fecha para ver la cuenta atrás.</div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

function CountdownTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
      <div className="text-2xl font-semibold">{String(value).padStart?.(2, "0") ?? value}</div>
      <div className="mt-1 text-xs text-[var(--muted)]">{label}</div>
    </div>
  );
}

/* ------------------ Itinerario (INLINE) ------------------ */

function ItineraryEditorInline({ config, setConfig }) {
  const data = config.copy?.itinerary || {};
  const items = Array.isArray(data.items) ? data.items : [];

  const setField = (key, value) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        itinerary: {
          enabled: true,
          kicker: "",
          title: "",
          desc: "",
          items: [],
          ...(p.copy?.itinerary || {}),
          [key]: value,
        },
      },
    }));
  };

  const setItem = (idx, patch) => {
    setConfig((p) => {
      const cur = p.copy?.itinerary || {};
      const arr = Array.isArray(cur.items) ? [...cur.items] : [];
      arr[idx] = { ...(arr[idx] || {}), ...patch };
      return {
        ...p,
        copy: {
          ...p.copy,
          itinerary: {
            enabled: true,
            kicker: "",
            title: "",
            desc: "",
            items: [],
            ...cur,
            items: arr,
          },
        },
      };
    });
  };

  const addItem = () => {
    setConfig((p) => {
      const cur = p.copy?.itinerary || {};
      const arr = Array.isArray(cur.items) ? [...cur.items] : [];
      arr.push({ time: "00:00", title: "Nuevo momento", desc: "", location: "" });
      return {
        ...p,
        copy: {
          ...p.copy,
          itinerary: {
            enabled: true,
            kicker: "",
            title: "",
            desc: "",
            items: [],
            ...cur,
            items: arr,
          },
        },
      };
    });
  };

  const removeItem = (idx) => {
    setConfig((p) => {
      const cur = p.copy?.itinerary || {};
      const arr = Array.isArray(cur.items) ? [...cur.items] : [];
      arr.splice(idx, 1);
      return { ...p, copy: { ...p.copy, itinerary: { ...cur, items: arr } } };
    });
  };

  const moveItem = (idx, dir) => {
    setConfig((p) => {
      const cur = p.copy?.itinerary || {};
      const arr = Array.isArray(cur.items) ? [...cur.items] : [];
      const j = idx + dir;
      if (idx < 0 || j < 0 || j >= arr.length) return p;
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return { ...p, copy: { ...p.copy, itinerary: { ...cur, items: arr } } };
    });
  };

  const setEnabled = (enabled) => setField("enabled", enabled);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Itinerario</div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={data.enabled !== false}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <span className="text-xs text-[var(--muted)]">{data.enabled === false ? "Oculto" : "Visible"}</span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <TextField label="Kicker" value={data.kicker ?? ""} onChange={(v) => setField("kicker", v)} />
        <TextField label="Título" value={data.title ?? ""} onChange={(v) => setField("title", v)} />
        <TextField label="Descripción" value={data.desc ?? ""} onChange={(v) => setField("desc", v)} />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm font-semibold">Momentos</div>
        <Button variant="primary" onClick={addItem}>
          + Añadir
        </Button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-[var(--muted)]">No hay items. Añade el primero.</div>
        ) : null}

        {items.map((it, idx) => (
          <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Item #{idx + 1}</div>
              <div className="flex gap-2">
                <Button variant="default" className="px-3 py-2" onClick={() => moveItem(idx, -1)}>
                  ↑
                </Button>
                <Button variant="default" className="px-3 py-2" onClick={() => moveItem(idx, +1)}>
                  ↓
                </Button>
                <Button variant="default" onClick={() => removeItem(idx)}>
                  Borrar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <TextField label="Hora" value={it.time ?? ""} onChange={(v) => setItem(idx, { time: v })} />
              <TextField label="Título" value={it.title ?? ""} onChange={(v) => setItem(idx, { title: v })} />
              <TextField label="Descripción" value={it.desc ?? ""} onChange={(v) => setItem(idx, { desc: v })} />
              <TextField label="Lugar" value={it.location ?? ""} onChange={(v) => setItem(idx, { location: v })} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ItineraryPreviewInline({ data }) {
  const d = data || {};
  const enabled = d.enabled !== false;
  const items = Array.isArray(d.items) ? d.items : [];

  if (!enabled) {
    return (
      <div className="p-10">
        <GlassCard className="p-6">
          <div className="text-sm font-semibold">Itinerario</div>
          <div className="mt-2 text-sm text-[var(--muted)]">Esta sección está oculta.</div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <GlassCard className="p-6">
          {d.kicker ? <div className="text-xs text-[var(--muted)]">{d.kicker}</div> : null}
          <div className="mt-1 text-xl font-semibold">{d.title || "Itinerario"}</div>
          {d.desc ? <div className="mt-2 text-sm text-[var(--muted)]">{d.desc}</div> : null}

          <div className="mt-6 space-y-3">
            {items.length === 0 ? (
              <div className="text-sm text-[var(--muted)]">Añade items para ver el horario.</div>
            ) : null}

            {items.map((it, idx) => (
              <div
                key={idx}
                className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <div className="w-20 shrink-0 text-sm font-semibold">{it.time || "—"}</div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{it.title || "Momento"}</div>
                  {it.desc ? <div className="mt-1 text-sm text-[var(--muted)]">{it.desc}</div> : null}
                  {it.location ? (
                    <div className="mt-2 text-xs text-[var(--muted)]">📍 {it.location}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
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

function TextField({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
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

function toDatetimeLocalValue(v) {
  if (!v) return "";
  const s = String(v);
  const m = s.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/);
  return m ? m[1] : "";
}

function parseDateTimeLoose(v) {
  if (!v) return null;
  const t = Date.parse(v);
  if (Number.isFinite(t)) return t;
  return null;
}

function splitMs(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    days,
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}
