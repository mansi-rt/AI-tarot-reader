export type TarotCard = {
  slug: string;
  name: string;
  arcana: "Major" | "Minor";
  suit?: "Wands" | "Cups" | "Swords" | "Pentacles";
  number?: number;
  keywordsUpright: string[];
  keywordsReversed: string[];
  shortUpright: string;
  shortReversed: string;
  image: string;
};

export const CARDS: TarotCard[] = [
  {
    slug: "the-fool",
    name: "The Fool",
    arcana: "Major",
    number: 0,
    keywordsUpright: ["beginnings", "wonder", "trust"],
    keywordsReversed: ["hesitation", "risk", "naivety"],
    shortUpright: "fresh starts shimmer when you lead with curiosity and faith.",
    shortReversed: "momentum stalls when fear of misstep eclipses instinct.",
    image: "/images/cards/the-fool.svg"
  },
  {
    slug: "the-magician",
    name: "The Magician",
    arcana: "Major",
    number: 1,
    keywordsUpright: ["focus", "manifest", "skill"],
    keywordsReversed: ["misaligned", "untapped", "illusion"],
    shortUpright: "resources align when intention is precise and embodied.",
    shortReversed: "fragmented focus dilutes your ability to direct power.",
    image: "/images/cards/the-magician.svg"
  },
  {
    slug: "the-high-priestess",
    name: "The High Priestess",
    arcana: "Major",
    number: 2,
    keywordsUpright: ["intuition", "mystery", "stillness"],
    keywordsReversed: ["secrets", "doubt", "distraction"],
    shortUpright: "deep knowing arrives in the quiet between signals.",
    shortReversed: "dissonance clouds your insight when you over-explain.",
    image: "/images/cards/the-high-priestess.svg"
  },
  {
    slug: "the-empress",
    name: "The Empress",
    arcana: "Major",
    number: 3,
    keywordsUpright: ["nurture", "creation", "abundance"],
    keywordsReversed: ["stagnant", "overgive", "creative-block"],
    shortUpright: "fertile ground blooms when you nourish your ideas.",
    shortReversed: "drain slows growth when you neglect your own reserves.",
    image: "/images/cards/the-empress.svg"
  },
  {
    slug: "the-emperor",
    name: "The Emperor",
    arcana: "Major",
    number: 4,
    keywordsUpright: ["structure", "sovereignty", "order"],
    keywordsReversed: ["rigidity", "dominion", "imbalance"],
    shortUpright: "clarity rises when you claim command and set form.",
    shortReversed: "control slips when you resist collaborative order.",
    image: "/images/cards/the-emperor.svg"
  },
  {
    slug: "the-lovers",
    name: "The Lovers",
    arcana: "Major",
    number: 6,
    keywordsUpright: ["union", "alignment", "values"],
    keywordsReversed: ["indecision", "disharmony", "misalignment"],
    shortUpright: "choice becomes sacred when it mirrors your core values.",
    shortReversed: "mixed signals linger when commitment stays half-hearted.",
    image: "/images/cards/the-lovers.svg"
  },
  {
    slug: "the-chariot",
    name: "The Chariot",
    arcana: "Major",
    number: 7,
    keywordsUpright: ["victory", "drive", "direction"],
    keywordsReversed: ["scattered", "delay", "misstep"],
    shortUpright: "focus fused with willpower moves mountains into motion.",
    shortReversed: "wheels spin when motives and map pull apart.",
    image: "/images/cards/the-chariot.svg"
  },
  {
    slug: "two-of-cups",
    name: "Two of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 2,
    keywordsUpright: ["connection", "exchange", "harmony"],
    keywordsReversed: ["imbalance", "distance", "mistrust"],
    shortUpright: "mutual flow deepens when you meet honesty with grace.",
    shortReversed: "bond strains when reciprocity loses its rhythm.",
    image: "/images/cards/two-of-cups.svg"
  },
  {
    slug: "ten-of-swords",
    name: "Ten of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 10,
    keywordsUpright: ["closure", "release", "turning-point"],
    keywordsReversed: ["resistance", "lingering", "recovery"],
    shortUpright: "the ending is exacting but clears space for renewal.",
    shortReversed: "holding on keeps pain looping without lesson.",
    image: "/images/cards/ten-of-swords.svg"
  },
  {
    slug: "ace-of-pentacles",
    name: "Ace of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 1,
    keywordsUpright: ["seed", "opportunity", "grounded"],
    keywordsReversed: ["delay", "misuse", "scarcity"],
    shortUpright: "tangible promise takes root when you tend the plan.",
    shortReversed: "prospects drift when you scatter your resources.",
    image: "/images/cards/ace-of-pentacles.svg"
  }
];

export const CARD_SLUGS = new Set(CARDS.map((card) => card.slug));

export function getCardBySlug(slug: string): TarotCard | undefined {
  return CARDS.find((card) => card.slug === slug);
}
