import Button from "./ui/Button.jsx";

export default function FloatingOrderButton() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        as="a"
        href="https://wa.me/34000000000"
        target="_blank"
        rel="noreferrer"
        variant="primary"
        className="shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
      >
        Pedir ahora
      </Button>
    </div>
  );
}
