export const siteConfig = {
  "brand": {
    "name": "La Ruta Burger",
    "tagline": "Smash Burgers · Street Food · Madrid",
    "emojiLogo": "🍔"
  },
  "links": {
    "whatsapp": "https://wa.me/34614987195?text=Hola!%20Quiero%20hacer%20un%20pedido%20🍔",
    "instagram": "https://instagram.com/larutaburger",
    "facebook": "https://facebook.com/larutaburger",
    "maps": "https://www.google.com/maps/search/?api=1&query=Food%20Truck%20La%20Ruta%20Burger%20Madrid"
  },
  "contact": {
    "phoneDisplay": "(+34) 614 987 195",
    "phoneTel": "+34614987195",
    "email": "larutaburger@gmail.com",
    "address": "Madrid · Food Truck itinerante",
    "hours": "Jue-Dom · 19:00–00:00",
    "phone": "614987195"
  },
  "layout": {
    "showFloatingOrderButton": true,
    "showNavbarCta": true,
    "showLanguageSwitcher": false
  },
  "theme": {
    "preset": "roseLuxury",
    "mode": "flat",
    "scheme": "dark",
    "overrides": {
      "--bg": "#0B0B0F",
      "--card": "#11111A",
      "--text": "#F9FAFB",
      "--muted": "#A1A1AA",
      "--border": "#27272A",
      "--accentA": "#F59E0B",
      "--accentB": "#EF4444",
      "--accentSoft": "#2A1E10",
      "--radius": "18px",
      "--btnRadius": "999px",
      "--shadowY": "16px",
      "--shadowBlur": "42px",
      "--shadowOpacity": "0.18",
      "--fontDisplay": "Inter",
      "--fontBody": "Inter",
      "--glowA": "#1F1408",
      "--glowB": "#1A0C0C"
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
          "label": "",
          "hideFromNav": true
        },
        {
          "id": "benefits",
          "enabled": true,
          "label": "Por qué"
        },
        {
          "id": "photoStrip",
          "enabled": true,
          "label": "Momentos"
        },
        {
          "id": "itinerary",
          "enabled": true,
          "label": "Carta"
        },
        {
          "id": "countdown",
          "enabled": false,
          "label": "Cuenta atrás"
        },
        {
          "id": "gallery",
          "enabled": true,
          "label": "Galería"
        },
        {
          "id": "contactForm",
          "enabled": true,
          "label": "Pedir"
        },
        {
          "id": "story",
          "enabled": false,
          "label": "Historia"
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
      "badge": "🔥 Smash Burgers",
      "titleA": "LA RUTA",
      "titleHighlight": "BURGER",
      "titleB": "Street Food con sabor real",
      "subtitle": "Carne 100% vacuno · Pan brioche · Hechas al momento. Pide por WhatsApp y te decimos la ubicación de hoy.",
      "ctaText": "Pedir por WhatsApp",
      "ctaHref": "https://wa.me/34614987195?text=Hola!%20Quiero%20hacer%20un%20pedido%20🍔",
      "secondaryText": "Ver horarios",
      "secondaryHref": "#pedir",
      "variant": "fullBleed",
      "visual": {
        "imageSrc": "/demo/gallery/heroburger.png"
      },
      "background": {
        "style": "corners",
        "pattern": true
      },
      "textColor": "#ffffff",
      "mutedColor": "#E5E7EB",
      "quickInfo": {
        "items": [
          {
            "label": "📍",
            "value": "Madrid (itinerante)",
            "icon": ""
          },
          {
            "label": "⏱️",
            "value": "Listo en 10–15 min"
          },
          {
            "label": "⭐",
            "value": "Top Smash Burgers"
          }
        ]
      },
      "primaryCta": {
        "label": "",
        "type": "link",
        "href": "",
        "value": "",
        "message": "",
        "newTab": false
      },
      "highlightA": "#F59E0B",
      "highlightB": "#EF4444"
    },
    "benefits": {
      "kicker": "Por qué elegirnos",
      "title": "Street food bien hecho. Sin postureo.",
      "subtitle": "Ingredientes simples + técnica smash = adicción.",
      "items": [
        {
          "title": "Carne premium",
          "text": "Vacuno seleccionado, smash crujiente por fuera y jugoso por dentro."
        },
        {
          "title": "Hechas al momento",
          "text": "Nada recalentado. Cada burger sale cuando la pides."
        },
        {
          "title": "Salsa secreta",
          "text": "La receta de la casa que hace que vuelvas."
        }
      ]
    },
    "itinerary": {
      "enabled": true,
      "kicker": "Carta rápida",
      "title": "Lo más pedido",
      "desc": "3 opciones para ir a tiro hecho.",
      "items": [
        {
          "time": "01",
          "title": "La Clásica Smash",
          "desc": "Doble carne, cheddar, pepinillo y salsa secreta.",
          "location": ""
        },
        {
          "time": "02",
          "title": "La Picante",
          "desc": "Jalapeños, bacon crujiente y salsa spicy.",
          "location": ""
        },
        {
          "time": "03",
          "title": "La Trufada",
          "desc": "Mayonesa de trufa, parmesano y cebolla crujiente.",
          "location": ""
        }
      ]
    },
    "promo": {
      "kicker": "Promo",
      "title": "Happy Hour Smash 🍔",
      "desc": "De lunes a jueves: 2x1 de 18:00 a 19:00 (según ubicación).",
      "primaryCta": "Preguntar ubicación de hoy",
      "secondaryCta": "Ver carta"
    },
    "contactForm": {
      "variant": "card",
      "title": "Pide o reserva para tu evento",
      "subtitle": "Te respondemos por WhatsApp.",
      "submitText": "Enviar",
      "minMessageLength": 0,
      "fields": {
        "nameLabel": "Nombre",
        "phoneLabel": "Teléfono",
        "emailLabel": "Correo",
        "messageLabel": "Pedido / consulta",
        "message": true
      },
      "labels": {
        "name": "Nombre",
        "phone": "Teléfono",
        "message": "Pedido / consulta"
      },
      "placeholders": {
        "name": "Tu nombre",
        "phone": "+34 600 000 000",
        "message": "Quiero 2 Clásicas + 1 Picante. ¿Dónde estáis hoy?"
      },
      "destination": {
        "type": "whatsapp",
        "emailTo": "",
        "whatsappTo": "614987195",
        "subject": "Nuevo pedido desde la web"
      },
      "enabled": true,
      "kicker": "Pedir",
      "successText": "¡Listo! Te contactamos enseguida."
    },
    "footer": {
      "title": "La Ruta Burger · Food Truck",
      "subtitle": "Smash Burgers · Street Food · Madrid",
      "small": "© 2026",
      "social": {
        "instagram": {
          "enabled": true,
          "url": "https://instagram.com/larutaburger"
        },
        "facebook": {
          "enabled": true,
          "url": "https://facebook.com/larutaburger"
        },
        "tiktok": {
          "enabled": true,
          "url": "https://tiktok.com/@larutaburger"
        },
        "x": {
          "enabled": false,
          "url": ""
        }
      }
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
        "/demo/gallery/hamburguesa1.webp",
        "/demo/gallery/hamburguesa2.jpg",
        "/demo/gallery/hamburguesa3.jpg",
        "/demo/gallery/hamburguesa4.jpg",
        "/demo/gallery/hamburguesa5.avif"
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
    },
    "gallery": {
      "items": [
        {
          "imageSrc": "/demo/gallery/hamburguesa1.webp",
          "alt": "Imagen",
          "caption": ""
        },
        {
          "imageSrc": "/demo/gallery/hamburguesa2.jpg",
          "alt": "Imagen",
          "caption": ""
        },
        {
          "imageSrc": "/demo/gallery/hamburguesa5.avif",
          "alt": "Imagen",
          "caption": ""
        }
      ]
    }
  }
};