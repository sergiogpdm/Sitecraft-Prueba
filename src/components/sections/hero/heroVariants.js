import HeroSplitMediaCard from "./HeroSplitMediaCard.jsx";
import HeroCentered from "./HeroCentered.jsx";
import HeroFullBleed from "./HeroFullBleed.jsx";

export const HERO_VARIANTS = [
  { id: "splitMediaCard", label: "Split + Media card", Component: HeroSplitMediaCard },
  { id: "centered", label: "Centered", Component: HeroCentered },
  { id: "fullBleed", label: "Full-bleed media", Component: HeroFullBleed },
];

export function getHeroVariantComponent(id) {
  return HERO_VARIANTS.find((v) => v.id === id)?.Component ?? HeroSplitMediaCard;
}
