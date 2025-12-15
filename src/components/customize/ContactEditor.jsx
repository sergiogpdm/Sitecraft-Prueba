import Button from "../ui/Button.jsx";

export default function ContactEditor({ config, setConfig }) {
  const c = config.copy.contactPage;

  const setContactPage = (patch) => {
    setConfig((p) => ({
      ...p,
      copy: {
        ...p.copy,
        contactPage: {
          ...p.copy.contactPage,
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

  const setLinks = (patch) => {
    setConfig((p) => ({
      ...p,
      links: {
        ...p.links,
        ...patch,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold">Contacto</h3>

      {/* Contenido página */}
      <div className="space-y-3">
        <div className="text-sm font-semibold">Textos</div>

        <Field label="Kicker" value={c.kicker} onChange={(v) => setContactPage({ kicker: v })} />
        <Field label="Título" value={c.title} onChange={(v) => setContactPage({ title: v })} />
        <TextArea label="Descripción" value={c.desc} onChange={(v) => setContactPage({ desc: v })} />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="CTA principal"
            value={c.primaryCta}
            onChange={(v) => setContactPage({ primaryCta: v })}
          />
          <Field
            label="CTA secundaria"
            value={c.secondaryCta}
            onChange={(v) => setContactPage({ secondaryCta: v })}
          />
        </div>

        <Field
          label="Placeholder mapa"
          value={c.mapPlaceholder}
          onChange={(v) => setContactPage({ mapPlaceholder: v })}
        />
      </div>

      {/* Datos contacto */}
      <div className="space-y-3">
        <div className="text-sm font-semibold">Datos del local</div>

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
        <Field
          label="Horario"
          value={config.contact.hours}
          onChange={(v) => setContact({ hours: v })}
        />
      </div>

      {/* Enlaces */}
      <div className="space-y-3">
        <div className="text-sm font-semibold">Enlaces</div>

        <Field
          label="Maps URL"
          value={config.links.maps}
          onChange={(v) => setLinks({ maps: v })}
          placeholder="https://www.google.com/maps?..."
        />
        <Field
          label="WhatsApp URL (opcional)"
          value={config.links.whatsapp}
          onChange={(v) => setLinks({ whatsapp: v })}
          placeholder="https://wa.me/..."
        />
        <div className="text-xs text-[var(--muted)]">
          Si no quieres WhatsApp, déjalo vacío. (Luego hacemos que el botón se oculte automáticamente.)
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="default"
          onClick={() => {
            setContactPage({
              kicker: "Contacto",
              title: "¿Dónde estamos?",
              desc: "Cámbialo por tu dirección real. Aquí también puedes meter un Google Maps embed.",
              primaryCta: "Llamar",
              secondaryCta: "Abrir en Maps",
              mapPlaceholder: "Aquí va el mapa (embed)",
            });

            setContact({
              address: "Calle Ejemplo 123, Tu Ciudad",
              phone: "000 000 000",
              hours: "L–D: 13:00–16:00 • 19:30–23:30",
            });

            setLinks({
              maps: "https://www.google.com/maps",
              whatsapp: "",
            });
          }}
        >
          Reset ejemplo
        </Button>
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
