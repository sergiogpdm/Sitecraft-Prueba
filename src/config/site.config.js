export const siteConfig = {
  "brand": {
    "name": "Black Crown Barber",
    "tagline": "Cortes clásicos · Estilo moderno",
    "emojiLogo": "💈",
    "logoImage": ""
  },
  "links": {
    "whatsapp": "https://wa.me/34614987195?text=Hola!%20Quiero%20reservar%20una%20cita%20💈",
    "instagram": "https://instagram.com/blackcrownbarber",
    "facebook": "",
    "maps": "https://www.google.com/maps/search/?api=1&query=Black+Crown+Barber+Madrid"
  },
  "contact": {
    "phoneDisplay": "(+34) 614 987 195",
    "phoneTel": "+34614987195",
    "email": "info@blackcrownbarber.com",
    "address": "Calle Gran Vía, 21 · Madrid",
    "hours": "Lun-Sáb · 10:00–21:00",
    "phone": "614987195"
  },
  "layout": {
    "showFloatingOrderButton": false,
    "showNavbarCta": true
  },
  "theme": {
    "preset": "roseLuxury",
    "mode": "flat",
    "scheme": "dark",
    "overrides": {
      "--bg": "#0E0E11",
      "--card": "#16161C",
      "--text": "#F3F3F3",
      "--muted": "#A1A1AA",
      "--border": "#262626",
      "--accentA": "#C6A85B",
      "--accentB": "#8B6B3F",
      "--accentSoft": "#1F1A14",
      "--radius": "14px",
      "--btnRadius": "10px",
      "--shadowY": "20px",
      "--shadowBlur": "50px",
      "--shadowOpacity": "0.2",
      "--fontDisplay": "Playfair Display",
      "--fontBody": "Inter"
    }
  },
  "pages": {
    "home": {
      "sections": [
        {
          "id": "hero",
          "enabled": true,
          "label": "Inicio"
        },
        {
          "id": "promoCta",
          "enabled": true,
          "hideFromNav": true
        },
        {
          "id": "benefits",
          "enabled": true,
          "label": "Servicios"
        },
        {
          "id": "photoStrip",
          "enabled": true,
          "label": "Momentos"
        },
        {
          "id": "itinerary",
          "enabled": true,
          "label": "Precios"
        },
        {
          "id": "gallery",
          "enabled": false,
          "label": "Galería"
        },
        {
          "id": "contactForm",
          "enabled": true,
          "label": "Reservar"
        },
        {
          "id": "countdown",
          "enabled": false,
          "label": "Cuenta atrás"
        },
        {
          "id": "story",
          "enabled": false,
          "label": "Nuestra historia"
        }
      ]
    },
    "menu": {
      "enabled": false
    },
    "contact": {
      "enabled": false
    },
    "customize": {
      "enabled": true
    }
  },
  "copy": {
    "hero": {
      "badge": "💈 Barbería Premium",
      "titleA": "BLACK",
      "titleHighlight": "CROWN",
      "titleB": "Donde el estilo empieza",
      "subtitle": "Cortes clásicos, degradados perfectos y arreglos de barba al detalle.",
      "ctaText": "Reservar cita",
      "ctaHref": "https://wa.me/34614987195?text=Hola!%20Quiero%20reservar%20una%20cita%20💈",
      "variant": "fullBleed",
      "visual": {
        "imageSrc": "/demo/gallery/barberia4.jpg"
      },
      "background": {
        "style": "ring"
      }
    },
    "benefits": {
      "kicker": "Servicios",
      "title": "Más que un corte, una experiencia.",
      "desc": "Precisión, técnica y estilo.",
      "items": [
        {
          "title": "Corte clásico",
          "desc": "Tijera y máquina con acabado profesional."
        },
        {
          "title": "Fade / Degradado",
          "desc": "Transiciones limpias y perfectas."
        },
        {
          "title": "Arreglo de barba",
          "desc": "Perfilado, recorte y tratamiento."
        }
      ]
    },
    "itinerary": {
      "enabled": true,
      "kicker": "Tarifas",
      "title": "Nuestros precios",
      "desc": "Claridad y calidad.",
      "items": [
        {
          "time": "25€",
          "title": "Corte clásico",
          "desc": "Incluye lavado y acabado."
        },
        {
          "time": "30€",
          "title": "Corte + barba",
          "desc": "Pack completo."
        },
        {
          "time": "18€",
          "title": "Arreglo de barba",
          "desc": "Perfilado profesional."
        }
      ]
    },
    "promo": {
      "kicker": "Oferta",
      "title": "Primer corte -20%",
      "desc": "Para nuevos clientes durante este mes.",
      "primaryCta": "Reservar ahora"
    },
    "contactForm": {
      "variant": "card",
      "title": "Reserva tu cita",
      "subtitle": "Te confirmamos por WhatsApp.",
      "submitText": "Enviar",
      "destination": {
        "type": "whatsapp",
        "whatsappTo": "614987195",
        "subject": "Nueva reserva desde la web"
      },
      "enabled": true
    },
    "footer": {
      "title": "Black Crown Barber",
      "subtitle": "Estilo · Precisión · Tradición",
      "small": "© 2026"
    },
    "countdown": {
      "enabled": true,
      "kicker": "Nos casamos",
      "title": "Cuenta atrás",
      "dateTime": "2026-06-20T18:00:00",
      "timezone": "Europe/Madrid",
      "note": "¡Te esperamos! Guarda la fecha ✨",
      "location": ""
    },
    "photoStrip": {
      "enabled": true,
      "kicker": "Momentos",
      "title": "Un poquito de nosotros",
      "note": "",
      "photos": [
        "/demo/gallery/barberia2.jpg ",
        "/demo/gallery/barberia1.png",
        " /demo/gallery/barberia5.jpg",
        "/demo/gallery/barberia4.jpg",
        "/demo/gallery/barberia3.jpg"
      ]
    },
    "story": {
      "enabled": true,
      "kicker": "Nuestra historia",
      "title": "Cómo empezó todo",
      "desc": "Un resumen rápido de nuestro camino hasta el gran día.",
      "items": [
        {
          "date": "2022",
          "title": "Nos conocimos",
          "text": "Añade aquí un texto corto.",
          "image": ""
        },
        {
          "date": "2024",
          "title": "Nuestro primer viaje",
          "text": "Añade aquí un texto corto.",
          "image": ""
        },
        {
          "date": "2025",
          "title": "La pedida",
          "text": "Añade aquí un texto corto.",
          "image": ""
        }
      ]
    }
  }
};