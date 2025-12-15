import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";

export default function Cookies() {
  return (
    <div className="py-16">
      <Container>
        <GlassCard className="p-8">
          <div className="text-xs text-[var(--muted)]">Legal</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Política de cookies</h1>

          <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
            Placeholder. Aquí describes qué cookies usas y cómo gestionarlas.
          </p>

          <div className="mt-8 space-y-4 text-sm text-[var(--muted)] leading-relaxed">
            <Block title="¿Qué son las cookies?">
              <p>Archivos pequeños que almacenan información del navegador/dispositivo.</p>
            </Block>

            <Block title="Tipos de cookies">
              <p>Técnicas, analíticas, personalización, publicidad, terceros…</p>
            </Block>

            <Block title="Gestión">
              <p>Cómo desactivarlas desde el navegador y/o banner de consentimiento.</p>
            </Block>
          </div>
        </GlassCard>
      </Container>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
