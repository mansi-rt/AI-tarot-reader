import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCardBySlug, CARDS } from "@/data/cards";
import { CardHero } from "@/components/CardHero";
import { Starfield } from "@/components/Starfield";
import { ConstellationLayer } from "@/components/ConstellationLayer";
import { ReadingExperience } from "@/components/ReadingExperience";

export async function generateStaticParams() {
  return CARDS.map((card) => ({ slug: card.slug }));
}

type CardPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: CardPageProps): Metadata {
  const card = getCardBySlug(params.slug);
  if (!card) {
    return {
      title: "Card not found | Mystic NFC Tarot"
    };
  }
  return {
    title: `${card.name} | Mystic NFC Tarot`,
    description: `Ask your question alongside ${card.name} and reveal a concise tarot reading.`
  };
}

export default function CardPage({ params }: CardPageProps) {
  const card = getCardBySlug(params.slug);
  if (!card) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-16 text-white">
      <Starfield className="pointer-events-none absolute inset-0 h-full w-full" />
      <ConstellationLayer className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12">
        <CardHero card={card} />
        <ReadingExperience card={card} />
      </div>
    </main>
  );
}
