import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Button from "../components/ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Contact({ data, preview = false }) {
  const { config } = useSiteConfig();

  if (!config.pages.contact?.enabled) return null;

  const c = data ?? config.copy.contactPage;

  const hasWhatsapp = !!(config.links?.whatsapp && String(config.links.whatsapp).trim());
  const hasMaps = !!(config.links?.maps && String(config.links.maps).trim());

  const handle = (e) => {
    if (preview) e.preventDefault();
  };

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionTitle kicker={c.kicker} title={c.title} desc={c.desc} />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <GlassCard className="p-7">
            <div className="text-sm text-[var(--muted)]">Dirección</div>
            <div className="mt-1 text-lg font-semibold text-[var(--text)]">
              {config.contact.address}
            </div>

            <div className="mt-4 text-sm text-[var(--muted)]">Teléfono</div>
            <div className="mt-1 text-lg font-semibold text-[var(--text)]">
              {config.contact.phone}
            </div>

            <div className="mt-4 text-sm text-[var(--muted)]">Horario</div>
            <div className="mt-1 text-[var(--muted)]">{config.contact.hours}</div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {hasWhatsapp ? (
                <Button
                  as="a"
                  href={config.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  onClick={handle}
                >
                  {c.primaryCta}
                </Button>
              ) : null}

              {hasMaps ? (
                <Button
                  as="a"
                  href={config.links.maps}
                  target="_blank"
                  rel="noreferrer"
                  variant={hasWhatsapp ? "default" : "primary"}
                  onClick={handle}
                >
                  {c.secondaryCta}
                </Button>
              ) : null}
            </div>
          </GlassCard>

          <GlassCard className="p-2 overflow-hidden">
            <div className="h-[320px] w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] grid place-items-center text-[var(--muted)] text-sm">
              {c.mapPlaceholder}
            </div>
          </GlassCard>
        </div>
      </Container>
    </div>
  );
}
