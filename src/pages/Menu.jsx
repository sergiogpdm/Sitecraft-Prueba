import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Menu() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionTitle
          kicker="Carta"
          title="Aquí irá la carta dinámica"
          desc="De momento lo dejamos vacío. Luego lo conectas a tu app + BBDD y lo pintamos aquí."
        />
        <div className="mt-10">
          <GlassCard className="p-8 sm:p-10 text-center">
            <div className="text-6xl">🧾</div>
            <div className="mt-4 text-lg font-semibold">Próximamente</div>
            <p className="mt-2 text-sm text-zinc-400">
              Cuando tengas la app de gestión + API, esto mostrará categorías, productos, precios y disponibilidad.
            </p>
          </GlassCard>
        </div>
      </Container>
    </div>
  );
}
