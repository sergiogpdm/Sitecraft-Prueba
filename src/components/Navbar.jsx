import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Navbar() {
  const { config } = useSiteConfig();
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 10));

  // Evitar crashes si config tarda en llegar
  const brand = config?.brand ?? { name: "—", tagline: "", emojiLogo: "🍔" };

  // Cierra el menú móvil siempre que cambie ruta/hash (incluye back/forward)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Bloquea scroll del body con el menú móvil abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const homeSections = config?.pages?.home?.sections || [];

  const sectionNav = useMemo(() => {
    return homeSections
      .filter((s) => s?.enabled)
      .filter((s) => s?.id && s.id !== "hero")
      .filter((s) => !s?.hideFromNav)
      .map((s) => ({
        id: s.id,
        label: getSectionLabel(s),
        hash: `#sec-${s.id}`,
      }));
  }, [homeSections]);

  const goHomeTop = () => {
    setOpen(false);

    // Si ya estás en home, solo sube
    if (location.pathname === "/") {
      scrollToTop();
      return;
    }

    // Si no estás en home, navega y sube
    navigate("/");
    requestAnimationFrame(() => scrollToTop());
  };

  const goToSection = (hash) => {
    setOpen(false);
    navigate({ pathname: "/", hash });

    const id = hash.replace("#", "");
    // Scroll robusto cuando el DOM esté listo (Home montado)
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setTimeout(() => {
          const el2 = document.getElementById(id);
          if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      }
    });
  };

  const sectionBtnClass = [
    "text-sm font-medium transition-colors duration-300",
    scrolled ? "text-zinc-300 hover:text-white" : "text-zinc-700 hover:text-black",
  ].join(" ");

  /**
   * ✅ LOGO FIX:
   * - la imagen ahora NO se sale:
   *   - block: evita gap raro
   *   - max-w: limita ancho
   *   - max-h-full: respeta alto del contenedor
   * - el contenedor del logo baja a h-11 para encajar mejor en navbar
   */
  const logoBox = (
    <span className="flex items-center h-11 w-auto px-3 rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      {brand.logoImage ? (
        <img
          src={brand.logoImage}
          alt={brand.name || "Logo"}
          className="block h-full max-h-full w-auto max-w-[140px] object-contain"
          loading="eager"
        />
      ) : (
        <span className="grid h-11 w-11 place-items-center" aria-hidden="true">
          {brand.emojiLogo}
        </span>
      )}
    </span>
  );

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
      {/* Logo izquierda (desktop, fuera del flujo) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <button
          type="button"
          onClick={goHomeTop}
          className="inline-flex items-center gap-2 text-left"
          aria-label="Ir al inicio"
        >
          {logoBox}
          <div className="leading-tight">
            <div className={`text-sm font-semibold transition-colors ${scrolled ? "text-white" : "text-black"}`}>
              {brand.name}
            </div>
            <div className={`text-[11px] transition-colors -mt-0.5 ${scrolled ? "text-zinc-300" : "text-zinc-600"}`}>
              {brand.tagline}
            </div>
          </div>
        </button>
      </div>

      {/* CTA derecha (desktop) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block z-10">
        {config?.layout?.showNavbarCta && (
          <Button as="a" href={config?.links?.whatsapp} target="_blank" rel="noreferrer" variant="primary">
            Pedir por WhatsApp
          </Button>
        )}
      </div>

      

      {/* NAV + HEADER MOBILE */}
      <div className="h-16 relative">
        {/* ✅ HEADER MOBILE NUEVO (más bonito y sin choques)
            - Logo y título a la izquierda
            - Botón menú a la derecha
            - Sin absolutos => no se pisan elementos
        */}
        <div className="md:hidden h-full">
          <Container className="h-full">
            <div className="h-full flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goHomeTop}
                className="inline-flex items-center gap-2 text-left min-w-0"
                aria-label="Ir al inicio"
              >
                {logoBox}
                <div className="leading-tight min-w-0">
                  <div
                    className={`text-sm font-semibold transition-colors truncate ${
                      scrolled ? "text-white" : "text-black"
                    }`}
                    title={brand.name}
                  >
                    {brand.name}
                  </div>
                  <div
                    className={`text-[11px] transition-colors -mt-0.5 truncate ${
                      scrolled ? "text-zinc-300" : "text-zinc-600"
                    }`}
                    title={brand.tagline}
                  >
                    {brand.tagline}
                  </div>
                </div>
              </button>

              <button
                className="shrink-0 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                aria-controls="mobile-nav"
                type="button"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </Container>
        </div>

        {/* NAV CENTRADO REAL (desktop) */}
        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button type="button" onClick={goHomeTop} className={navLink(scrolled)({ isActive: location.pathname === "/" })}>
            Inicio
          </button>

          {config?.pages?.menu?.enabled && (
            <NavLink to="/carta" className={navLink(scrolled)}>
              Carta
            </NavLink>
          )}

          {config?.pages?.contact?.enabled && (
            <NavLink to="/contacto" className={navLink(scrolled)}>
              Contacto
            </NavLink>
          )}

          {sectionNav.map((s) => (
            <button key={s.id} onClick={() => goToSection(s.hash)} className={sectionBtnClass} type="button">
              {s.label}
            </button>
          ))}
        </nav>

        {/* Botón móvil (se mantiene para accesibilidad pero lo ocultamos porque ya está arriba) */}
        <button
          className="hidden md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          type="button"
        />
      </div>

      {/* ✅ MENÚ MÓVIL NUEVO: drawer lateral (mucho más pro que dropdown) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.aside
              id="mobile-nav"
              className={[
                "fixed top-0 right-0 z-[70] h-dvh w-[84vw] max-w-[360px] md:hidden",
                "border-l border-[var(--border)]",
                scrolled ? "bg-zinc-950/95" : "bg-white/95",
                "backdrop-blur-xl",
              ].join(" ")}
              initial={{ x: 360 }}
              animate={{ x: 0 }}
              exit={{ x: 360 }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="h-full flex flex-col">
                {/* Header drawer */}
                <div className="px-4 py-4 flex items-center justify-between border-b border-[var(--border)]">
                  <div className="flex items-center gap-2 min-w-0">
                    {logoBox}
                    <div className="min-w-0">
                      <div className={`text-sm font-semibold truncate ${scrolled ? "text-white" : "text-black"}`}>
                        {brand.name}
                      </div>
                      <div className={`text-[11px] -mt-0.5 truncate ${scrolled ? "text-zinc-300" : "text-zinc-600"}`}>
                        Menú
                      </div>
                    </div>
                  </div>

                  <button
                    className="shrink-0 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar menú"
                    type="button"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body drawer (scroll) */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {/* Idiomas en móvil (aquí no tapan nada) */}
                  <div className="pb-4 border-b border-[var(--border)]">
                    <div className={`text-xs uppercase mb-2 ${scrolled ? "text-zinc-300" : "text-zinc-600"}`}>
                      Idioma
                    </div>
                    
                  </div>

                  <div className="pt-4 flex flex-col gap-2">
                    {/* Botones grandes (mejor UX) */}
                    <button
                      type="button"
                      onClick={goHomeTop}
                      className={[
                        "w-full text-left rounded-xl px-4 py-3 border border-[var(--border)]",
                        scrolled
                          ? "text-white bg-white/5 hover:bg-white/10"
                          : "text-black bg-black/5 hover:bg-black/10",
                      ].join(" ")}
                    >
                      Inicio
                    </button>

                    {config?.pages?.menu?.enabled && (
                      <NavLink
                        onClick={() => setOpen(false)}
                        to="/carta"
                        className={[
                          "rounded-xl px-4 py-3 border border-[var(--border)]",
                          scrolled
                            ? "text-white bg-white/5 hover:bg-white/10"
                            : "text-black bg-black/5 hover:bg-black/10",
                        ].join(" ")}
                      >
                        Carta
                      </NavLink>
                    )}

                    {config?.pages?.contact?.enabled && (
                      <NavLink
                        onClick={() => setOpen(false)}
                        to="/contacto"
                        className={[
                          "rounded-xl px-4 py-3 border border-[var(--border)]",
                          scrolled
                            ? "text-white bg-white/5 hover:bg-white/10"
                            : "text-black bg-black/5 hover:bg-black/10",
                        ].join(" ")}
                      >
                        Contacto
                      </NavLink>
                    )}

                    {sectionNav.length > 0 && (
                      <div className="pt-4">
                        <div className={`text-xs uppercase mb-2 ${scrolled ? "text-zinc-300" : "text-zinc-600"}`}>
                          Secciones
                        </div>
                        <div className="flex flex-col gap-2">
                          {sectionNav.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => goToSection(s.hash)}
                              className={[
                                "w-full text-left rounded-xl px-4 py-3 border border-[var(--border)]",
                                scrolled
                                  ? "text-white bg-white/5 hover:bg-white/10"
                                  : "text-black bg-black/5 hover:bg-black/10",
                              ].join(" ")}
                              type="button"
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer drawer (CTA móvil opcional) */}
                {config?.layout?.showNavbarCta && (
                  <div className="px-4 py-4 border-t border-[var(--border)]">
                    <Button
                      as="a"
                      href={config?.links?.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      variant="primary"
                      className="w-full"
                    >
                      Pedir por WhatsApp
                    </Button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
