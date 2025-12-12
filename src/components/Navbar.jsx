import { NavLink, Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container.jsx";
import Button from "./ui/Button.jsx";

const navLink = ({ isActive }) =>
  "text-sm transition " +
  (isActive ? "text-white" : "text-zinc-300 hover:text-white");

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 10));

  return (
    <motion.header
      className={[
        "fixed inset-x-0 top-0 z-50",
        scrolled
          ? "border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl"
          : "bg-transparent",
      ].join(" ")}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Container className="h-16 flex items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
            🍕
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">Pizzería</div>
            <div className="text-[11px] text-zinc-400 -mt-0.5">
              Masa lenta • Horno fuerte
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" className={navLink}>Inicio</NavLink>
          <NavLink to="/carta" className={navLink}>Carta</NavLink>
          <NavLink to="/contacto" className={navLink}>Contacto</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button
            as="a"
            href="https://wa.me/34000000000"
            target="_blank"
            rel="noreferrer"
            variant="primary"
          >
            Pedir por WhatsApp
          </Button>
        </div>

        <button
          className="md:hidden rounded-xl border border-white/10 bg-white/5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {open ? (
        <div className="md:hidden border-t border-white/10 bg-zinc-950/80 backdrop-blur-xl">
          <Container className="py-4 flex flex-col gap-3">
            <NavLink onClick={() => setOpen(false)} to="/" className={navLink}>Inicio</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/carta" className={navLink}>Carta</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contacto" className={navLink}>Contacto</NavLink>

            <div className="pt-2">
              <Button
                as="a"
                href="https://wa.me/34000000000"
                target="_blank"
                rel="noreferrer"
                className="w-full"
                variant="primary"
              >
                Pedir por WhatsApp
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </motion.header>
  );
}
