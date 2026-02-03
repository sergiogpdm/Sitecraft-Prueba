import Button from "../ui/Button.jsx";

export default function ContactFormEditor({ config, setConfig }) {
  const data = config.copy?.contactForm || {};

  const setField = (key, value) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        contactForm: {
          variant: "card",
          title: "Pide información",
          subtitle: "Rellena el formulario y te contestamos lo antes posible.",
          submitText: "Enviar",
          minMessageLength: 10,

          // ✅ NUEVO
          fields: { name: true, phone: true, message: true },

          labels: { name: "Nombre", phone: "Teléfono", message: "Consulta" },
          placeholders: {
            name: "Tu nombre",
            phone: "+34 600 000 000",
            message: "Cuéntanos tu caso…",
          },
          destination: {
            type: "email",
            emailTo: "",
            whatsappTo: "",
            subject: "Nueva consulta desde la web",
          },

          ...(p.copy?.contactForm || {}),
          [key]: value,
        },
      },
    }));
  };

  const setNested = (path, value) => {
    setConfig((p) => {
      const cur = p.copy?.contactForm || {};

      const seeded = {
        variant: "card",
        title: "Pide información",
        subtitle: "Rellena el formulario y te contestamos lo antes posible.",
        submitText: "Enviar",
        minMessageLength: 10,

        // ✅ NUEVO
        fields: { name: true, phone: true, message: true },

        labels: { name: "Nombre", phone: "Teléfono", message: "Consulta" },
        placeholders: {
          name: "Tu nombre",
          phone: "+34 600 000 000",
          message: "Cuéntanos tu caso…",
        },
        destination: {
          type: "email",
          emailTo: "",
          whatsappTo: "",
          subject: "Nueva consulta desde la web",
        },
        ...cur,
      };

      const next = structuredClone ? structuredClone(seeded) : JSON.parse(JSON.stringify(seeded));

      const parts = path.split(".");
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const k = parts[i];
        obj[k] = obj[k] && typeof obj[k] === "object" ? obj[k] : {};
        obj = obj[k];
      }
      obj[parts[parts.length - 1]] = value;

      return { ...p, copy: { ...p.copy, contactForm: next } };
    });
  };

  const destType = data.destination?.type || "email";
  const showMessage = data.fields?.message ?? true;

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold">ContactForm</div>

      <label className="block">
        <div className="text-xs text-zinc-400">Diseño (variant)</div>
        <select
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
          value={data.variant || "card"}
          onChange={(e) => setField("variant", e.target.value)}
        >
          <option value="card">card</option>
          <option value="split">split</option>
          <option value="minimal">minimal</option>
        </select>
      </label>

      <TextField label="Título" value={data.title ?? ""} onChange={(v) => setField("title", v)} />
      <TextField label="Subtítulo" value={data.subtitle ?? ""} onChange={(v) => setField("subtitle", v)} />
      <TextField label="Texto botón" value={data.submitText ?? ""} onChange={(v) => setField("submitText", v)} />

      {/* ✅ TOGGLE CONSULTA */}
      <label className="block">
        <div className="text-xs text-zinc-400">Mostrar campo “Consulta”</div>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={showMessage}
            onChange={(e) => setNested("fields.message", e.target.checked)}
          />
          <span className="text-sm text-[var(--muted)]">
            Si lo desactivas, no se mostrará ni será obligatorio.
          </span>
        </div>
      </label>

      {/* Solo si existe consulta */}
      {showMessage && (
        <NumberField
          label="Mínimo caracteres en consulta"
          value={data.minMessageLength ?? 10}
          onChange={(v) => setField("minMessageLength", Number(v || 0))}
        />
      )}

      <div className="mt-2 text-sm font-semibold">Envío</div>

      <label className="block">
        <div className="text-xs text-zinc-400">Canal</div>
        <select
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none"
          value={destType}
          onChange={(e) => setNested("destination.type", e.target.value)}
        >
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </label>

      {destType === "email" ? (
        <>
          <TextField
            label="Email destino"
            value={data.destination?.emailTo ?? ""}
            onChange={(v) => setNested("destination.emailTo", v)}
          />
          <TextField
            label="Asunto"
            value={data.destination?.subject ?? ""}
            onChange={(v) => setNested("destination.subject", v)}
          />
        </>
      ) : (
        <TextField
          label="WhatsApp destino"
          value={data.destination?.whatsappTo ?? ""}
          onChange={(v) => setNested("destination.whatsappTo", v)}
        />
      )}

      <div className="mt-2 text-sm font-semibold">Labels</div>
      <TextField label="Label nombre" value={data.labels?.name ?? ""} onChange={(v) => setNested("labels.name", v)} />
      <TextField label="Label teléfono" value={data.labels?.phone ?? ""} onChange={(v) => setNested("labels.phone", v)} />
      {showMessage && (
        <TextField label="Label consulta" value={data.labels?.message ?? ""} onChange={(v) => setNested("labels.message", v)} />
      )}

      <div className="mt-2 text-sm font-semibold">Placeholders</div>
      <TextField label="PH nombre" value={data.placeholders?.name ?? ""} onChange={(v) => setNested("placeholders.name", v)} />
      <TextField label="PH teléfono" value={data.placeholders?.phone ?? ""} onChange={(v) => setNested("placeholders.phone", v)} />
      {showMessage && (
        <TextField label="PH consulta" value={data.placeholders?.message ?? ""} onChange={(v) => setNested("placeholders.message", v)} />
      )}

      <div className="pt-2">
        <Button
          variant="default"
          onClick={() =>
            setConfig((p) => ({
              ...p,
              copy: { ...p.copy, contactForm: undefined },
            }))
          }
        >
          Reset ContactForm
        </Button>
      </div>
    </div>
  );
}

/* helpers */
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
