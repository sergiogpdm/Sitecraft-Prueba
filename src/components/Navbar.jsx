import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container.jsx";
import Button from "./ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

const DEFAULT_SECTION_LABELS = {
  benefits: "Ventajas",
  bestSellers: "Destacados",
  promoCta: "Promoción",
  promo: "Promoción",
  gallery: "Galería",
  countdown: "Cuenta atrás",
  itinerary: "Itinerario",
  photoStrip: "Momentos",
  story: "Historia",
  contactForm: "Formulario",
};

function getSectionLabel(section) {
  if (section?.label && String(section.label).trim()) return section.label.trim();
  return DEFAULT_SECTION_LABELS[section?.id] || section?.id;
}

const navLink = (scrolled) => ({ isActive }) =>
  [
    "text-sm font-medium transition-colors duration-300",
    scrolled
      ? isActive
        ? "text-white"
        : "text-zinc-300 hover:text-white"
      : isActive
        ? "text-black"
        : "text-zinc-700 hover:text-black",
  ].join(" ");

export default function Navbar() {
  const { config } = useSiteConfig();
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 10));

  const homeSections = config?.pages?.home?.sections || [];

  const sectionNav = useMemo(() => {
    return homeSections
      .filter((s) => s?.enabled)
      .filter((s) => s?.id && s.id !== "hero")
      .map((s) => ({
        id: s.id,
        label: getSectionLabel(s),
        hash: `#sec-${s.id}`,
      }));
  }, [homeSections]);

  const goToSection = (hash) => {
    setOpen(false);
    navigate({ pathname: "/", hash });
  };

  const sectionBtnClass = [
    "text-sm font-medium transition-colors duration-300",
    scrolled ? "text-zinc-300 hover:text-white" : "text-zinc-700 hover:text-black",
  ].join(" ");

  return (
    <motion.header
      className={[
        "fixed inset-x-0 top-0 z-50",
        scrolled
          ? "border-b border-[var(--border)] bg-zinc-950/70 backdrop-blur-xl"
          : "bg-transparent",
      ].join(" ")}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Logo izquierda (fuera del flujo) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
            {config.brand.emojiLogo}
          </span>
          <div className="leading-tight">
            <div className={`text-sm font-semibold transition-colors ${scrolled ? "text-white" : "text-black"}`}>
              {config.brand.name}
            </div>
            <div className={`text-[11px] transition-colors -mt-0.5 ${scrolled ? "text-zinc-300" : "text-zinc-600"}`}>
              {config.brand.tagline}
            </div>
          </div>
        </Link>
      </div>

      {/* CTA derecha */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block z-10">
        {config.layout.showNavbarCta && (
          <Button
            as="a"
            href={config.links.whatsapp}
            target="_blank"
            rel="noreferrer"
            variant="primary"
          >
            Pedir por WhatsApp
          </Button>
        )}
      </div>

      {/* NAV CENTRADO REAL */}
      <div className="h-16 relative">
        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavLink to="/" className={navLink(scrolled)}>Inicio</NavLink>

          {config.pages.menu?.enabled && (
            <NavLink to="/carta" className={navLink(scrolled)}>Carta</NavLink>
          )}

          {config.pages.contact?.enabled && (
            <NavLink to="/contacto" className={navLink(scrolled)}>Contacto</NavLink>
          )}

          {sectionNav.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSection(s.hash)}
              className={sectionBtnClass}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Botón móvil */}
        <button
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`${scrolled ? "bg-zinc-950/80" : "bg-white/90"} backdrop-blur-xl border-t border-[var(--border)] md:hidden`}>
          <Container className="py-4 flex flex-col gap-3">
            <NavLink onClick={() => setOpen(false)} to="/" className={navLink(scrolled)}>Inicio</NavLink>
            {config.pages.menu?.enabled && (
              <NavLink onClick={() => setOpen(false)} to="/carta" className={navLink(scrolled)}>Carta</NavLink>
            )}
            {config.pages.contact?.enabled && (
              <NavLink onClick={() => setOpen(false)} to="/contacto" className={navLink(scrolled)}>Contacto</NavLink>
            )}

            {sectionNav.length > 0 && (
              <div className="pt-2 border-t border-[var(--border)]">
                <div className={`text-xs uppercase mb-2 ${scrolled ? "text-zinc-300" : "text-zinc-600"}`}>
                  Secciones
                </div>
                {sectionNav.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => goToSection(s.hash)}
                    className={`text-left text-sm transition ${scrolled ? "text-zinc-300 hover:text-white" : "text-zinc-700 hover:text-black"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </Container>
        </div>
      )}
    </motion.header>
  );
}
