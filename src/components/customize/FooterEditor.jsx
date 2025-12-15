import Button from "../ui/Button.jsx";

const SOCIAL = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "tiktok", label: "TikTok" },
  { key: "x", label: "X" },
];

export default function FooterEditor({ config, setConfig }) {
  const footer = config.copy.footer;

  const social = footer.social || {
    instagram: { enabled: false, url: "" },
    facebook: { enabled: false, url: "" },
    tiktok: { enabled: false, url: "" },
    x: { enabled: false, url: "" },
  };

  const legal = footer.legal || {
    legalNotice: { label: "Aviso legal", url: "/legal" },
    privacy: { label: "Protección de datos", url: "/privacy" },
    cookies: { label: "Política de cookies", url: "/cookies" },
  };

  const setFooter = (patch) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        footer: {
          ...p.copy.footer,
          ...patch,
        },
      },
    }));
  };

  const setContact = (patch) => {
    setConfig((p) => ({
      ...p,
      contact: {
        ...p.contact,
        ...patch,
      },
    }));
  };

  const setSocial = (key, patch) => {
    const next = {
      ...social,
      [key]: { ...(social[key] || {}), ...patch },
    };
    setFooter({ social: next });
  };

  const setLegal = (key, patch) => {
    const next = {
      ...legal,
      [key]: { ...(legal[key] || {}), ...patch },
    };
    setFooter({ legal: next });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold">Footer</h3>

      {/* Marca */}
      <div className="space-y-3">
        <div className="text-sm font-semibold">Marca</div>
        <TextArea
          label="Texto (about)"
          value={footer.about}
          onChange={(v) => setFooter({ about: v })}
        />
      </div>

      {/* RRSS */}
      <div className="space-y-3">
        <div className="text-sm font-semibold">Redes sociales</div>

        <div className="space-y-2">
          {SOCIAL.map((s) => (
            <div
              key={s.key}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3"
            >
              <label className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!social?.[s.key]?.enabled}
                    onChange={() =>
                      setSocial(s.key, { enabled: !social?.[s.key]?.enabled })
                    }
                  />
                  <span>{s.label}</span>
                </div>

                <span className="text-xs text-[var(--muted)]">
                  {social?.[s.key]?.enabled ? "Activo" : "Oculto"}
                </span>
              </label>

              <Field
                label="URL"
                value={social?.[s.key]?.url}
                onChange={(v) => setSocial(s.key, { url: v })}
                placeholder="https://..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* Horario */}
      <div className="space-y-3">
        <div className="text-sm font-semibold">Horario</div>

        <Field
          label="Texto de horario"
          value={config.contact.hours}
          onChange={(v) => setContact({ hours: v })}
        />
        <Field
          label="Dirección"
          value={config.contact.address}
          onChange={(v) => setContact({ address: v })}
        />
        <Field
          label="Teléfono"
          value={config.contact.phone}
          onChange={(v) => setContact({ phone: v })}
        />
      </div>

      {/* Legal */}
      <div className="space-y-3">
        <div className="text-sm font-semibold">Legal</div>

        <LegalRow
          title="Aviso legal"
          item={legal.legalNotice}
          onChange={(patch) => setLegal("legalNotice", patch)}
        />

        <LegalRow
          title="Protección de datos"
          item={legal.privacy}
          onChange={(patch) => setLegal("privacy", patch)}
        />

        <LegalRow
          title="Política de cookies"
          item={legal.cookies}
          onChange={(patch) => setLegal("cookies", patch)}
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="default"
          onClick={() => {
            setFooter({
              about:
                "Artesanal, elegante y con ingredientes que se notan. Hecha para abrir la web y tener hambre.",
              social: {
                instagram: { enabled: true, url: "https://instagram.com" },
                facebook: { enabled: false, url: "" },
                tiktok: { enabled: false, url: "" },
                x: { enabled: false, url: "" },
              },
              legal: {
                legalNotice: { label: "Aviso legal", url: "/legal" },
                privacy: { label: "Protección de datos", url: "/privacy" },
                cookies: { label: "Política de cookies", url: "/cookies" },
              },
            });
            setContact({
              hours: "L–D: 13:00–16:00 • 19:30–23:30",
              address: "Calle Ejemplo 123, Tu Ciudad",
              phone: "000 000 000",
            });
          }}
        >
          Reset ejemplo
        </Button>
      </div>
    </div>
  );
}

function LegalRow({ title, item, onChange }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 space-y-3">
      <div className="text-xs text-[var(--muted)]">{title}</div>

      <div className="grid grid-cols-1 gap-3">
        <Field
          label="Label"
          value={item?.label ?? ""}
          onChange={(v) => onChange({ label: v })}
        />
        <Field
          label="URL"
          value={item?.url ?? ""}
          onChange={(v) => onChange({ url: v })}
          placeholder="/legal o https://..."
        />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        placeholder={placeholder}
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
        className="mt-2 h-28 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
