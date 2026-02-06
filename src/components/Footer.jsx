import Container from "./Container.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import sitecraftLogo from "../assets/powered_by.png";
import { Link } from "react-router-dom";

const SOCIAL = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "tiktok", label: "TikTok" },
  { key: "x", label: "X" },
];

export default function Footer({ data, preview = false }) {
  const { config } = useSiteConfig();

  const footer = data ?? config.copy.footer ?? {};
  const brand = config.brand ?? {};
  const contact = config.contact ?? {};

  const social = footer.social || {
    instagram: { enabled: false, url: "" },
    facebook: { enabled: false, url: "" },
    tiktok: { enabled: false, url: "" },
    x: { enabled: false, url: "" },
  };

  const legal = footer.legal || {
    privacy: { label: "Protección de datos", url: "/privacy" },
  };

  const year = new Date().getFullYear();

  return (
    <>
      <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]">
        {/* Glow A de fondo */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-32 -left-32 h-80 w-80 rounded-full"
            style={{
              background: "var(--glowA)",
              filter: `blur(var(--glowBlur, 64px))`,
            }}
          />
        </div>

        <Container className="relative py-12 sm:py-14">
          {/* ✅ Grid centrado + texto centrado en móvil */}
          <div className="grid gap-10 lg:grid-cols-12 justify-items-center text-center lg:text-left">
            {/* Marca */}
            <div className="space-y-4 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div>
                <div className="text-base font-semibold tracking-tight text-[var(--text)]">
                  {brand.name}
                </div>
                {brand.tagline && (
                  <div className="text-xs text-[var(--muted)]">
                    {brand.tagline}
                  </div>
                )}
              </div>

              {footer.about && (
                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
                  {footer.about}
                </p>
              )}

              <div className="pt-2 text-xs text-[var(--muted)] opacity-80">
                © {year}
              </div>
            </div>

            {/* Redes */}
            {/*
            <div className="space-y-4 lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="text-sm font-semibold text-[var(--text)]">Redes</div>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {SOCIAL.map(({ key, label }) => (
                  <SocialButton
                    key={key}
                    name={key}
                    label={label}
                    entry={social[key]}
                    preview={preview}
                  />
                ))}
              </div>

              {!hasAnyEnabledSocial(social) && (
                <div className="text-sm text-[var(--muted)] opacity-70">
                  (Sin redes configuradas)
                </div>
              )}
            </div>
            */}

            {/* Ubicación */}
            <div className="space-y-4 lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="text-sm font-semibold text-[var(--text)]">
                Ubicación
              </div>

              {contact.hours ? (
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {contact.hours}
                </p>
              ) : (
                <p className="text-sm text-[var(--muted)] opacity-70" />
              )}

              {(contact.address || contact.phone) && (
                <div className="space-y-2">
                  {contact.address && (
                    <p className="text-sm text-[var(--muted)] flex items-center gap-2 justify-center lg:justify-start">
                      <span>📍</span>
                      {contact.address}
                    </p>
                  )}
                  {contact.phone && (
                    <p className="text-sm text-[var(--muted)] flex items-center gap-2 justify-center lg:justify-start">
                      <span>📞</span>
                      {contact.phone}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Legal */}
            <div className="space-y-4 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="text-sm font-semibold text-[var(--text)]">Legal</div>

              <div className="space-y-2 flex flex-col items-center lg:items-start">
                <LegalLink item={legal.legalNotice} preview={preview} />
                <LegalLink item={legal.privacy} preview={preview} />
                <LegalLink item={legal.cookies} preview={preview} />
              </div>

              <div className="pt-2 text-xs text-[var(--muted)] opacity-70">
                
              </div>
            </div>
          </div>
        </Container>
      </footer>

      {/* Franja fija logo */}
      <div className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto flex max-w-6xl items-center justify-center py-6">
          <img
            src={sitecraftLogo}
            alt="Sitecraft"
            className="h-20 w-auto opacity-80"
            draggable="false"
          />
        </div>
      </div>
    </>
  );
}

/* ---------------- Helpers ---------------- */

function SocialButton({ name, label, entry, preview }) {
  if (!entry?.enabled) return null;

  const onClick = (e) => {
    if (preview) return e.preventDefault();
    if (!entry?.url) return;
    window.open(entry.url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--text)] transition hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border)]"
      aria-label={label}
      title={label}
      type="button"
    >
      <SocialIcon name={name} />
    </button>
  );
}

function SocialIcon({ name }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24" };

  if (name === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M14 8.6V7c0-.9.6-1 1-1h1V4h-2c-2.2 0-3 1.6-3 3v1.6H9V11h2v9h3v-9h2.2l.6-2.4H14z" />
      </svg>
    );
  }

  if (name === "tiktok") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M16 3c.6 2.6 2.2 4.1 5 4.3V9c-1.9-.1-3.6-.8-5-2v7.2c0 3.1-2.3 5.8-5.9 5.8-3.3 0-5.1-2.4-5.1-4.9 0-2.9 2.4-5.2 5.7-5.2.5 0 1 .1 1.4.2V12c-.4-.2-.9-.3-1.4-.3-1.6 0-2.9 1.1-2.9 2.5 0 1.3 1 2.6 2.9 2.6 1.8 0 3-1.2 3-3.3V3H16z" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor">
      <path d="M18.7 3H21l-6.9 7.9L22 21h-6.6l-3.9-5-4.3 5H3l7.4-8.5L2.8 3h6.8l3.6 4.6L18.7 3zm-2.3 16h1.7L7.6 4.9H5.7L16.4 19z" />
    </svg>
  );
}

function hasAnyEnabledSocial(social) {
  if (!social) return false;
  return Object.values(social).some((x) => x?.enabled);
}

function LegalLink({ item, preview }) {
  if (!item?.label) return null;

  const url = item.url || "#";
  const isExternal = typeof url === "string" && url.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm text-[var(--muted)] underline underline-offset-4 decoration-transparent hover:decoration-current hover:text-[var(--text)] transition"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={url}
      className="block text-sm text-[var(--muted)] underline underline-offset-4 decoration-transparent hover:decoration-current hover:text-[var(--text)] transition"
    >
      {item.label}
    </Link>
  );
}

