import Container from "../components/Container.jsx";
import Button from "../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <div className="py-24">
      <Container className="text-center">
        <div className="text-6xl">🫠</div>
        <h1 className="mt-4 text-3xl font-semibold">Página no encontrada</h1>
        <p className="mt-2 text-zinc-400">Vuelve al inicio y seguimos cocinando.</p>
        <div className="mt-6">
          <Button as="a" href="/" variant="primary">Ir al inicio</Button>
        </div>
      </Container>
    </div>
  );
}
