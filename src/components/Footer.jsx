import Container from "./Container.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <Container className="py-10 grid gap-8 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-semibold">Pizzería (tu nombre)</div>
          <p className="text-sm text-zinc-400">
            Artesanal, rápida y con ingredientes que se notan. Hecha para abrir la web y tener hambre.
          </p>
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} • Todos los derechos reservados
          </p>
        </div>

        <div className="sm:text-right space-y-2">
          <div className="text-sm font-semibold">Horario</div>
          <p className="text-sm text-zinc-400">L–D: 13:00–16:00 • 19:30–23:30</p>
          <p className="text-sm text-zinc-400">📍 Tu ciudad • 📞 000 000 000</p>
        </div>
      </Container>
    </footer>
  );
}
