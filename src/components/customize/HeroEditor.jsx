import Button from "../ui/Button.jsx";
import { HERO_VARIANTS } from "../sections/hero/heroVariants.js";

export default function HeroEditor({ config, setConfig }) {
  const hero = config?.copy?.hero ?? {};
  const visual = hero.visual || {};
  const quickInfo = hero.quickInfo || {};

  const setHero = (patchOrFn) => {
    setConfig((prev) => {
      const prevHero = prev?.copy?.hero ?? {};
      const patch = typeof patchOrFn === "function" ? patchOrFn(prevHero) : patchOrFn;

      return {
        ...prev,
        copy: {
          ...(prev.copy || {}),
          hero: {
            ...prevHero,
            ...patch,
          },
        },
      };
    });
  };

  const setVisual = (patchOrFn) => {
    setHero((prevHero) => {
      const prev = prevHero.visual || {};
      const patch = typeof patchOrFn === "function" ? patchOrFn(prev) : patchOrFn;
      return { visual: { ...prev, ...patch } };
    });
  };

  const setQuickInfo = (patchOrFn) => {
    setHero((prevHero) => {
      const prev = prevHero.quickInfo || {};
      const patch = typeof patchOrFn === "function" ? patchOrFn(prev) : patchOrFn;
      return { quickInfo: { ...prev, ...patch } };
    });
  };

  // CTAs
  const primary =
    typeof hero.primaryCta === "string"
      ? { label: hero.primaryCta, type: "link", href: "", value: "", message: "", newTab: false }
      : hero.primaryCta || { label: "", type: "link", href: "", value: "", message: "", newTab: false };

  const secondary =
    typeof hero.secondaryCta === "string"
      ? { label: hero.secondaryCta, type: "link", href: "", value: "", message: "", newTab: true }
      : hero.secondaryCta || { label: "", type: "link", href: "", value: "", message: "", newTab: true };

  const setPrimary = (patch) => setHero({ primaryCta: { ...primary, ...patch } });
  const setSecondary = (patch) => setHero({ secondaryCta: { ...secondary, ...patch } });

  const showVisual = (visual.enabled ?? true) !== false;
  const showQI = (quickInfo.enabled ?? true) !== false;

  // Visual chips
  const chips = Array.isArray(visual.chips) ? visual.chips : [];

  const setChip = (idx, patch) => {
    setVisual((prev) => {
      const arr = Array.isArray(prev.chips) ? [...prev.chips] : [];
      arr[idx] = { ...(arr[idx] || {}), ...patch };
      return { chips: arr };
    });
  };

  const addChip = () => {
    setVisual((prev) => {
      const arr = Array.isArray(prev.chips) ? [...prev.chips] : [];
      arr.push({ label: "Label", value: "Valor" });
      return { chips: arr };
    });
  };

  const removeChip = (idx) => {
    setVisual((prev) => {
      const arr = Array.isArray(prev.chips) ? [...prev.chips] : [];
      arr.splice(idx, 1);
      return { chips: arr };
    });
  };

  const onPickImage = (file) => {
    if (!file) return;
    if (!file.type?.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => setVisual({ imageSrc: String(reader.result || "") });
    reader.readAsDataURL(file);
  };

  // QuickInfo items
  const qiItems = Array.isArray(quickInfo.items) ? quickInfo.items : [];

  const setQIItem = (idx, patch) => {
    setQuickInfo((prev) => {
      const arr = Array.isArray(prev.items) ? [...prev.items] : [];
      arr[idx] = { ...(arr[idx] || {}), ...patch };
      return { items: arr };
    });
  };

  const addQIItem = () => {
    setQuickInfo((prev) => {
      const arr = Array.isArray(prev.items) ? [...prev.items] : [];
      arr.push({ icon: "clock", label: "Label", value: "Valor" });
      return { items: arr };
    });
  };

  const removeQIItem = (idx) => {
    setQuickInfo((prev) => {
      const arr = Array.isArray(prev.items) ? [...prev.items] : [];
      arr.splice(idx, 1);
      return { items: arr };
    });
  };

  const moveQIItem = (idx, dir) => {
    setQuickInfo((prev) => {
      const arr = Array.isArray(prev.items) ? [...prev.items] : [];
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return {};
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return { items: arr };
    });
  };

  // Stats
  const setStat = (idx, patch) => {
    setHero((prevHero) => {
      const stats = Array.isArray(prevHero.stats) ? [...prevHero.stats] : [];
      stats[idx] = { ...(stats[idx] || {}), ...patch };
      return { stats };
    });
  };

  const addStat = () => {
    setHero((prevHero) => {
      const stats = Array.isArray(prevHero.stats) ? [...prevHero.stats] : [];
      stats.push({ title: "Nuevo", desc: "Descripción" });
      return { stats };
    });
  };

  const removeStat = (idx) => {
    setHero((prevHero) => {
      const stats = Array.isArray(prevHero.stats) ? [...prevHero.stats] : [];
      stats.splice(idx, 1);
      return { stats };
    });
  };

  const moveStat = (idx, dir) => {
    setHero((prevHero) => {
      const stats = Array.isArray(prevHero.stats) ? [...prevHero.stats] : [];
      const j = idx + dir;
      if (j < 0 || j >= stats.length) return {};
      [stats[idx], stats[j]] = [stats[j], stats[idx]];
      return { stats };
    });
  };

  const CTATypeHelp = ({ type }) => {
    const t = String(type || "link").toLowerCase();
    const msg =
      t === "phone"
        ? "VALUE = número (ej: +34600111222). Si HREF está vacío, se genera tel: automáticamente."
        : t === "whatsapp"
        ? "VALUE = número y MESSAGE opcional. Si HREF está vacío, se genera wa.me automáticamente."
        : t === "maps"
        ? "Usa HREF con el link de Google Maps (o se usa config.links.maps)."
        : "Usa HREF con tu enlace (interno / externo / #anchor).";
    return <div className="text-xs text-[var(--muted)]">{msg}</div>;
  };

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold">Hero</h3>

      {/* ✅ Selector de diseño */}
      <Select
        label="Diseño del Hero"
        value={hero.variant || "splitMediaCard"}
        onChange={(v) => setHero({ variant: v })}
        options={HERO_VARIANTS.map((v) => [v.id, v.label])}
      />

      <Field label="Badge" value={hero.badge} onChange={(v) => setHero({ badge: v })} />
      <Field label="Título A" value={hero.titleA} onChange={(v) => setHero({ titleA: v })} />
      <Field label="Título Highlight" value={hero.titleHighlight} onChange={(v) => setHero({ titleHighlight: v })} />
      <Field label="Título B" value={hero.titleB} onChange={(v) => setHero({ titleB: v })} />
      <TextArea label="Subtítulo" value={hero.subtitle} onChange={(v) => setHero({ subtitle: v })} />

      {/* CTA principal */}
      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="text-sm font-semibold">CTA principal</div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Texto" value={primary.label} onChange={(v) => setPrimary({ label: v })} />
          <Select
            label="Tipo"
            value={primary.type || "link"}
            onChange={(v) => setPrimary({ type: v })}
            options={[
              ["link", "Link"],
              ["phone", "Teléfono"],
              ["whatsapp", "WhatsApp"],
              ["maps", "Maps"],
            ]}
          />
        </div>

        <CTATypeHelp type={primary.type} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="HREF (opcional)" value={primary.href} onChange={(v) => setPrimary({ href: v })} />
          <Field label="VALUE (tel/wa)" value={primary.value} onChange={(v) => setPrimary({ value: v })} />
        </div>

        {String(primary.type || "").toLowerCase() === "whatsapp" ? (
          <TextArea label="Mensaje WhatsApp (opcional)" value={primary.message} onChange={(v) => setPrimary({ message: v })} />
        ) : null}

        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={!!primary.newTab} onChange={(e) => setPrimary({ newTab: e.target.checked })} />
          Abrir en nueva pestaña
        </label>
      </div>

      {/* CTA secundaria */}
      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="text-sm font-semibold">CTA secundaria</div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Texto" value={secondary.label} onChange={(v) => setSecondary({ label: v })} />
          <Select
            label="Tipo"
            value={secondary.type || "link"}
            onChange={(v) => setSecondary({ type: v })}
            options={[
              ["link", "Link"],
              ["phone", "Teléfono"],
              ["whatsapp", "WhatsApp"],
              ["maps", "Maps"],
            ]}
          />
        </div>

        <CTATypeHelp type={secondary.type} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="HREF (opcional)" value={secondary.href} onChange={(v) => setSecondary({ href: v })} />
          <Field label="VALUE (tel/wa)" value={secondary.value} onChange={(v) => setSecondary({ value: v })} />
        </div>

        {String(secondary.type || "").toLowerCase() === "whatsapp" ? (
          <TextArea label="Mensaje WhatsApp (opcional)" value={secondary.message} onChange={(v) => setSecondary({ message: v })} />
        ) : null}

        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={!!secondary.newTab} onChange={(e) => setSecondary({ newTab: e.target.checked })} />
          Abrir en nueva pestaña
        </label>
      </div>

      {/* Visual / Media */}
      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Media / Visual</div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showVisual} onChange={(e) => setVisual({ enabled: e.target.checked })} />
            Mostrar
          </label>
        </div>

        {showVisual ? (
          <>
            <Field label="Kicker" value={visual.kicker} onChange={(v) => setVisual({ kicker: v })} />
            <Field label="Título" value={visual.title} onChange={(v) => setVisual({ title: v })} />
            <TextArea label="Descripción" value={visual.desc} onChange={(v) => setVisual({ desc: v })} />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Imagen (URL o dataURL)" value={visual.imageSrc} onChange={(v) => setVisual({ imageSrc: v })} />
              <Field label="Alt" value={visual.imageAlt} onChange={(v) => setVisual({ imageAlt: v })} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <label className="block">
                <div className="text-xs text-zinc-400">Subir imagen</div>
                <input type="file" accept="image/*" className="mt-2 block w-full text-sm" onChange={(e) => onPickImage(e.target.files?.[0])} />
              </label>

              <div className="flex gap-2">
                <Button variant="default" onClick={() => setVisual({ imageSrc: "" })}>
                  Quitar imagen
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Chips</div>
                <Button variant="primary" onClick={addChip}>+ Añadir</Button>
              </div>

              {chips.map((c, idx) => (
                <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-[var(--muted)]">Chip #{idx + 1}</div>
                    <Button variant="default" className="px-3 py-2" onClick={() => removeChip(idx)}>✕</Button>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Label" value={c?.label ?? ""} onChange={(v) => setChip(idx, { label: v })} />
                    <Field label="Valor" value={c?.value ?? ""} onChange={(v) => setChip(idx, { value: v })} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-xs text-[var(--muted)]">Visual desactivado.</div>
        )}
      </div>

      {/* QuickInfo */}
      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Quick info</div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showQI} onChange={(e) => setQuickInfo({ enabled: e.target.checked })} />
            Mostrar
          </label>
        </div>

        {showQI ? (
          <>
            <div className="text-xs text-[var(--muted)]">
              Icon keys sugeridas: <code>clock</code>, <code>map</code>, <code>phone</code>, <code>whatsapp</code>, <code>truck</code>, <code>card</code>, <code>star</code>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Items</div>
              <Button variant="primary" onClick={addQIItem}>+ Añadir</Button>
            </div>

            {qiItems.map((it, idx) => (
              <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-[var(--muted)]">Item #{idx + 1}</div>
                  <div className="flex gap-2">
                    <Button variant="default" className="px-3 py-2" onClick={() => moveQIItem(idx, -1)}>↑</Button>
                    <Button variant="default" className="px-3 py-2" onClick={() => moveQIItem(idx, +1)}>↓</Button>
                    <Button variant="default" className="px-3 py-2" onClick={() => removeQIItem(idx)}>✕</Button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Field label="Icon" value={it?.icon ?? ""} onChange={(v) => setQIItem(idx, { icon: v })} />
                  <Field label="Label" value={it?.label ?? ""} onChange={(v) => setQIItem(idx, { label: v })} />
                  <Field label="Value" value={it?.value ?? ""} onChange={(v) => setQIItem(idx, { value: v })} />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-xs text-[var(--muted)]">Quick info desactivado.</div>
        )}
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Stats</div>
          <Button variant="primary" onClick={addStat}>+ Añadir</Button>
        </div>

        {(hero.stats || []).map((s, idx) => (
          <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs text-[var(--muted)]">Stat #{idx + 1}</div>
              <div className="flex gap-2">
                <Button variant="default" className="px-3 py-2" onClick={() => moveStat(idx, -1)}>↑</Button>
                <Button variant="default" className="px-3 py-2" onClick={() => moveStat(idx, +1)}>↓</Button>
                <Button variant="default" className="px-3 py-2" onClick={() => removeStat(idx)}>✕</Button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Título" value={s?.title ?? ""} onChange={(v) => setStat(idx, { title: v })} />
              <Field label="Descripción" value={s?.desc ?? ""} onChange={(v) => setStat(idx, { desc: v })} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- UI helpers ---- */

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <textarea
        className="mt-2 h-24 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <select
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}
