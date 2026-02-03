import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "../components/sections/HeroSection.jsx";
import BenefitsSection from "../components/sections/BenefitsSection.jsx";
import BestSellersSection from "../components/sections/BestSellersSection.jsx";
import PromoCtaSection from "../components/sections/PromoCtaSection.jsx";
import GallerySection from "../components/sections/GallerySection.jsx";

import CountdownSection from "../components/sections/CountdownSection.jsx";
import ItinerarySection from "../components/sections/ItinerarySection.jsx";
import PhotoStripSection from "../components/sections/PhotoStripSection.jsx";
import StorySection from "../components/sections/StorySection.jsx";
import ContactFormSection from "../components/sections/ContactFormSection.jsx";

import { useSiteConfig } from "../context/SiteConfigContext.jsx";

const SECTION_MAP = {
  hero: HeroSection,
  benefits: BenefitsSection,
  bestSellers: BestSellersSection,
  gallery: GallerySection,
  promoCta: PromoCtaSection,
  promo: PromoCtaSection,

  countdown: CountdownSection,
  itinerary: ItinerarySection,
  photoStrip: PhotoStripSection,
  story: StorySection,

  contactForm: ContactFormSection,
};

export default function Home() {
  const { config } = useSiteConfig();
  const sections = config?.pages?.home?.sections || [];
  const location = useLocation();

  // ✅ Si entras con /#sec-gallery o navegas con hash, baja a la sección
  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (!el) return;

    // pequeño delay para asegurar que el DOM esté pintado
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  return (
    <div>
      {sections
        .filter((s) => s?.enabled)
        .map((s) => {
          const Comp = SECTION_MAP[s?.id];
          if (!Comp) return null;

          const dataMap = {
            hero: config.copy?.hero,
            benefits: config.copy?.benefits,
            bestSellers: config.copy?.bestSellers,
            gallery: config.copy?.gallery,
            promo: config.copy?.promo,
            promoCta: config.copy?.promo,

            countdown: config.copy?.countdown,
            itinerary: config.copy?.itinerary,
            photoStrip: config.copy?.photoStrip,
            story: config.copy?.story,

            contactForm: config.copy?.contactForm,
          };

          const data = dataMap[s.id];

          // ✅ id para ancla
          const anchorId = `sec-${s.id}`;

          return (
            <section key={s.id} id={anchorId} style={{ scrollMarginTop: 92 }}>
              {data ? <Comp data={data} /> : <Comp />}
            </section>
          );
        })}
    </div>
  );
}
