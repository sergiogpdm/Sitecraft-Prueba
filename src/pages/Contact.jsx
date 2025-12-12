import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Button from "../components/ui/Button.jsx";

export default function Contact() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionTitle
          kicker="Contacto"
          title="¿Dónde estamos?"
          desc="Cámbialo por tu dirección real. Aquí también puedes meter un Google Maps embed."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <GlassCard className="p-7">
            <div className="text-sm text-zinc-300/80">Dirección</div>
            <div className="mt-1 text-lg font-semibold">Calle Ejemplo 123, Tu Ciudad</div>
            <div className="mt-4 text-sm text-zinc-300/80">Teléfono</div>
            <div className="mt-1 text-lg font-semibold">000 000 000</div>
            <div className="mt-4 text-sm text-zinc-300/80">Horario</div>
            <div className="mt-1 text-zinc-300">L–D: 13:00–16:00 • 19:30–23:30</div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                as="a"
                href="https://wa.me/34000000000"
                target="_blank"
                rel="noreferrer"
                variant="primary"
              >
                Pedir por WhatsApp
              </Button>
              <Button
                as="a"
                href="https://www.google.com/maps"
                target="_blank"
                rel="noreferrer"
                variant="default"
              >
                Abrir en Maps
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-2 overflow-hidden">
            <div className="h-[320px] w-full rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-zinc-400 text-sm">
              Aquí va el mapa (embed)
            </div>
          </GlassCard>
        </div>
      </Container>
    </div>
  );
}
