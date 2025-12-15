import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Legal() {
  const { config } = useSiteConfig();

  return (
    <div className="py-16">
      <Container>
        <GlassCard className="p-8">
          <div className="text-xs text-[var(--muted)]">Legal</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Aviso legal</h1>

          <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
            Placeholder. Sustituye este contenido por tu aviso legal real.
          </p>

          <div className="mt-8 space-y-4 text-sm text-[var(--muted)] leading-relaxed">
            <Section title="Titularidad">
              <p>
                <b className="text-[var(--text)]">{config.brand?.name}</b>
                {config.contact?.address ? ` · ${config.contact.address}` : ""}
              </p>
            </Section>

            <Section title="Condiciones de uso">
              <p>El acceso y uso de este sitio implica la aceptación de estas condiciones.</p>
            </Section>

            <Section title="Propiedad intelectual">
              <p>Los contenidos del sitio pertenecen a sus respectivos titulares.</p>
            </Section>

            <Section title="Contacto">
              <p>
                {config.contact?.phone ? `📞 ${config.contact.phone}` : ""}{" "}
                {config.contact?.phone && config.contact?.hours ? "·" : ""}{" "}
                {config.contact?.hours ? config.contact.hours : ""}
              </p>
            </Section>
          </div>
        </GlassCard>
      </Container>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
