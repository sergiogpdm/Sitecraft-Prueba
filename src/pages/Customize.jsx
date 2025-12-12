import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { presets } from "../config/presets.js";
import { toConfigFileString } from "../config/exportConfig.js";
import { useMemo, useState } from "react";

export default function Customize() {
  const { config, setConfig } = useSiteConfig();
  const [importText, setImportText] = useState("");
  const [msg, setMsg] = useState("");

  const presetList = useMemo(() => Object.values(presets), []);

  const toggleSection = (id) => {
    setConfig((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        home: {
          ...prev.pages.home,
          sections: prev.pages.home.sections.map((s) =>
            s.id === id ? { ...s, enabled: !s.enabled } : s
          ),
        },
      },
    }));
  };

  const setPreset = (presetId) => {
    setConfig((p) => ({ ...p, theme: { ...p.theme, preset: presetId } }));
  };

  const exportToClipboard = async () => {
    try {
      const str = toConfigFileString(config);
      await navigator.clipboard.writeText(str);
      setMsg("✅ Config copiada al portapapeles (lista para pegar en site.config.js).");
      setTimeout(() => setMsg(""), 3500);
    } catch (e) {
      setMsg("❌ No pude copiar. (Tu navegador puede bloquearlo). Te dejo el texto abajo igualmente.");
      setTimeout(() => setMsg(""), 4500);
    }
  };

  const importFromText = () => {
    // Permitimos pegar:
    // 1) el objeto JSON puro { ... }
    // 2) el archivo completo export const siteConfig = { ... };
    const t = importText.trim();
    if (!t) return;

    try {
      let objText = t;

      // Si viene como "export const siteConfig = ....;"
      objText = objText.replace(/^export\s+const\s+siteConfig\s*=\s*/m, "");
      objText = objText.replace(/;\s*$/m, "");

      // Debe ser JSON. Si el usuario pegó JS con comillas simples, fallará (ok)
      const parsed = JSON.parse(objText);
      setConfig(parsed);
      setMsg("✅ Config importada y aplicada.");
      setTimeout(() => setMsg(""), 3500);
    } catch (e) {
      setMsg("❌ Import fallido. Pega el JSON del objeto o el export generado.");
      setTimeout(() => setMsg(""), 4500);
    }
  };

  return (
    <div className="py-16">
      <Container className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <GlassCard className="p-6">
          <h1 className="text-xl font-semibold">Personalizador (Plantilla Pro)</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Presets completos + activar secciones + export/import. Cuando acabes, copia repo y solo cambias config.
          </p>

          {msg ? (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm text-zinc-200">
              {msg}
            </div>
          ) : null}

          <div className="mt-6 space-y-6">
            <div>
              <div className="text-sm font-semibold">Preset (estilo completo)</div>
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
              <div className="mt-2 text-xs text-zinc-500">
                Actual: <span className="text-zinc-300">{config.theme.preset}</span>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Secciones (Home)</div>
              <div className="mt-2 space-y-2">
                {config.pages.home.sections.map((s) => (
                  <label key={s.id} className="flex items-center gap-3 text-sm">
                    <input type="checkbox" checked={s.enabled} onChange={() => toggleSection(s.id)} />
                    <span className="text-zinc-200">{s.id}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={config.layout.showFloatingOrderButton}
                  onChange={() =>
                    setConfig((p) => ({
                      ...p,
                      layout: {
                        ...p.layout,
                        showFloatingOrderButton: !p.layout.showFloatingOrderButton,
                      },
                    }))
                  }
                />
                Botón flotante “Pedir ahora”
              </label>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={config.layout.showNavbarCta}
                  onChange={() =>
                    setConfig((p) => ({
                      ...p,
                      layout: { ...p.layout, showNavbarCta: !p.layout.showNavbarCta },
                    }))
                  }
                />
                CTA en Navbar
              </label>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={config.pages.customize?.enabled ?? true}
                  onChange={() =>
                    setConfig((p) => ({
                      ...p,
                      pages: {
                        ...p.pages,
                        customize: { enabled: !(p.pages.customize?.enabled ?? true) },
                      },
                    }))
                  }
                />
                Permitir /customize
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" onClick={exportToClipboard}>
                Exportar config (copiar)
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  const str = toConfigFileString(config);
                  setImportText(str);
                  setMsg("✅ Export generado en el cuadro de texto (puedes guardarlo).");
                  setTimeout(() => setMsg(""), 3500);
                }}
              >
                Ver export aquí
              </Button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold">Import / Export</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Pega aquí el export (o el JSON del objeto) y dale a Importar.
          </p>

          <textarea
            className="mt-4 h-[360px] w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 font-mono text-xs text-zinc-200 outline-none"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Pega aquí: export const siteConfig = { ... };\n\nO solo el objeto JSON { ... }"
          />

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button variant="primary" onClick={importFromText}>
              Importar y aplicar
            </Button>
            <Button variant="default" onClick={() => setImportText("")}>
              Limpiar
            </Button>
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-zinc-300">
            <div className="font-semibold">Workflow recomendado</div>
            <ol className="mt-2 list-decimal pl-5 space-y-1 text-zinc-400">
              <li>Entra a <b>/customize</b> y deja la web como quieras.</li>
              <li>Click en <b>Exportar config</b>.</li>
              <li>Pega en <b>src/config/site.config.js</b> del nuevo repo.</li>
            </ol>
          </div>
        </GlassCard>
      </Container>
    </div>
  );
}
