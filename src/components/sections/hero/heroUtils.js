export function normalizeCta(cta, fallbackNewTab) {
  // legacy: string
  if (typeof cta === "string") {
    return {
      label: cta,
      type: "link",
      href: "",
      value: "",
      message: "",
      newTab: fallbackNewTab,
    };
  }

  // object
  return {
    label: cta?.label ?? "",
    type: cta?.type ?? "link",
    href: cta?.href ?? "",
    value: cta?.value ?? "",
    message: cta?.message ?? "",
    newTab: typeof cta?.newTab === "boolean" ? cta.newTab : fallbackNewTab,
  };
}

export function buildHrefFromCta(cta, config) {
  const t = String(cta?.type || "link").toLowerCase();

  // explicit href always wins
  if (cta?.href) return cta.href;

  if (t === "phone") {
    const num = String(cta?.value || "").replace(/\s+/g, "");
    return num ? `tel:${num}` : "";
  }

  if (t === "whatsapp") {
    const raw = String(cta?.value || "");
    const num = raw.replace(/[^\d+]/g, "");
    const waNum = num.replace("+", "");
    if (!waNum) return "";
    const message = cta?.message ? encodeURIComponent(String(cta.message)) : "";
    return message ? `https://wa.me/${waNum}?text=${message}` : `https://wa.me/${waNum}`;
  }

  if (t === "maps") {
    return config?.links?.maps || "https://www.google.com/maps";
  }

  return "";
}

export function navigateSmart({ e, href, newTab, preview }) {
  if (preview) return e?.preventDefault?.();
  if (!href) return;

  if (href.startsWith("#")) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  if (newTab) window.open(href, "_blank", "noopener,noreferrer");
  else window.location.href = href;
}

export function iconFor(key) {
  switch (String(key || "").toLowerCase()) {
    case "clock": return "⏰";
    case "map": return "📍";
    case "phone": return "📞";
    case "whatsapp": return "💬";
    case "truck": return "🛵";
    case "card": return "💳";
    case "star": return "⭐";
    default: return "•";
  }
}
