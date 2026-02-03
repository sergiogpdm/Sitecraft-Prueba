import { Outlet } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import FloatingOrderButton from "./FloatingOrderButton.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { presets } from "../config/presets.js";
import { googleFonts } from "../config/fonts.js";
import LanguageToggle from "./LanguageToggle";

function applyVars(el, vars) {
  if (!el || !vars) return;
  for (const [k, v] of Object.entries(vars)) {
    if (v === undefined || v === null || v === "") continue;
    el.style.setProperty(k, String(v));
  }
}

function modeVars(mode) {
  switch (mode) {
    case "solid":
      return { "--cardBlur": "0px", "--shadowOpacity": "0.20" };
    case "minimal":
      return { "--card": "rgba(0,0,0,0)", "--cardBlur": "0px", "--shadowOpacity": "0.10" };
    case "glass":
    default:
      return {};
  }
}

function resolveScheme(scheme) {
  if (scheme === "dark" || scheme === "light") return scheme;
  // auto:
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ensureGoogleFontLink(family) {
  const entry = googleFonts.find((f) => f.family === family);
  const needsImport = entry?.import;

  const id = "sitecraft-google-font";
  let link = document.getElementById(id);

  if (!needsImport || family === "system") {
    if (link) link.remove();
    return;
  }

  const href = `https://fonts.googleapis.com/css2?${needsImport}&display=swap`;
  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function SiteLayout() {
  const { config } = useSiteConfig();
  const preset = useMemo(() => presets[config.theme.preset] ?? presets.amberFire, [config.theme.preset]);
  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    // Scheme (auto/light/dark)
    const applyScheme = () => {
      const scheme = resolveScheme(config.theme.scheme || "auto");
      node.setAttribute("data-scheme", scheme);
    };
    applyScheme();

    // Escuchar cambios del sistema si estás en auto
    let mql;
    if ((config.theme.scheme || "auto") === "auto" && window.matchMedia) {
      mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyScheme();
      mql.addEventListener?.("change", handler);
      return () => mql.removeEventListener?.("change", handler);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.theme.scheme]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    // 1) preset base
    applyVars(node, preset.vars);
    // 2) modo (glass/solid/minimal)
    applyVars(node, modeVars(config.theme.mode));
    // 3) overrides (prioridad máxima)
    applyVars(node, config.theme.overrides);

    // Fonts (import automático)
    const display = config.theme.overrides?.["--fontDisplay"] || preset.vars["--fontDisplay"];
    const body = config.theme.overrides?.["--fontBody"] || preset.vars["--fontBody"];
    if (display && display !== "system") ensureGoogleFontLink(display);
    else if (body && body !== "system") ensureGoogleFontLink(body);
    else ensureGoogleFontLink("system");
  }, [config, preset]);

  return (
  <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]" ref={rootRef}>
    {/* Botón de idioma */}
    <div className="fixed right-4 top-20 md:top-4 z-[9999]">
      <LanguageToggle />
    </div>

    <Navbar />

    <main className="pt-16">
      <Outlet />
    </main>

    <Footer />

    {config.layout.showFloatingOrderButton ? <FloatingOrderButton /> : null}
  </div>
);

}
