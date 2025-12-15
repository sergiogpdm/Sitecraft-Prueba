import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";

export default function Privacy() {
  return (
    <div className="py-16">
      <Container>
        <GlassCard className="p-8">
          <div className="text-xs text-[var(--muted)]">Legal</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Protección de datos</h1>

          <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
            Placeholder. Aquí debes incluir tu política de privacidad (RGPD/LOPDGDD).
          </p>

          <div className="mt-8 space-y-4 text-sm text-[var(--muted)] leading-relaxed">
            <Block title="Responsable del tratamiento">
              <p>Indica el responsable, NIF/CIF y datos de contacto.</p>
            </Block>

            <Block title="Finalidad">
              <p>Explica para qué se recogen los datos (contacto, pedidos, analítica…).</p>
            </Block>

            <Block title="Base legal">
              <p>Consentimiento, ejecución de contrato, interés legítimo, etc.</p>
            </Block>

            <Block title="Derechos">
              <p>Acceso, rectificación, supresión, oposición, portabilidad, limitación…</p>
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
