import { useSiteConfig } from "../../context/SiteConfigContext.jsx";
import { getHeroVariantComponent } from "./hero/heroVariants.js";

export default function HeroSection({ data, preview = false }) {
  const { config } = useSiteConfig();
  const hero = data ?? config?.copy?.hero;
  if (!hero) return null;

  const Variant = getHeroVariantComponent(hero.variant);

  const heroText = hero?.textColor || "";
  const heroMuted = hero?.mutedColor || "";

  return (
    <div
      style={{
        "--heroText": heroText,
        "--heroMuted": heroMuted,
      }}
      className="text-[color:var(--heroText,var(--text))]"
    >
      <Variant data={hero} preview={preview} />
    </div>
  );
}
