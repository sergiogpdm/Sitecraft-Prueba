import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import FloatingOrderButton from "./FloatingOrderButton.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { presets } from "../config/presets.js";

function applyPresetVars(el, presetVars) {
  if (!el || !presetVars) return;
  Object.entries(presetVars).forEach(([k, v]) => el.style.setProperty(k, v));
}

export default function SiteLayout() {
  const { config } = useSiteConfig();
  const preset = presets[config.theme.preset] ?? presets.amberFire;

  // Aplicar variables al contenedor raíz de la app
  // (así toda la UI reacciona sin recargar)
  const refCb = (node) => applyPresetVars(node, preset.vars);

  return (
    <div className="min-h-full" ref={refCb}>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      {config.layout.showFloatingOrderButton ? <FloatingOrderButton /> : null}
    </div>
  );
}
