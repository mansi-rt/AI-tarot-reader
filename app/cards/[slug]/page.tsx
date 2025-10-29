import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCardBySlug, CARDS } from "@/data/cards";
import { CardHero } from "@/components/CardHero";
import { Starfield } from "@/components/Starfield";
import { ConstellationLayer } from "@/components/ConstellationLayer";
import { ReadingExperience } from "@/components/ReadingExperience";
import { Aurora } from "@/components/Aurora";

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
    <main className="relative flex min-h-screen flex-col overflow-hidden px-6 pb-24 pt-16 text-white">
      <Starfield className="pointer-events-none absolute inset-0 h-full w-full" />
      <ConstellationLayer className="pointer-events-none absolute inset-0 h-full w-full" />
      <Aurora />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <section className="flex w-full flex-col items-center gap-12 text-center lg:w-[42%] lg:items-start lg:text-left">
          <CardHero card={card} />
          <div className="relative w-full overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 text-sm text-white/70 shadow-glass backdrop-blur">
            <div className="pointer-events-none absolute -inset-px rounded-[1.6rem] bg-[linear-gradient(120deg,rgba(200,169,89,0.3),rgba(210,193,244,0.2),rgba(117,127,250,0.25))] opacity-40" />
            <div className="relative space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Card briefing</p>
              <p>{card.shortUpright}</p>
              {card.shortReversed ? (
                <p className="rounded-2xl bg-black/25 p-4 text-white/75">
                  <span className="text-xs uppercase tracking-[0.4em] text-white/50">Reversed echo</span>
                  <br />
                  {card.shortReversed}
                </p>
              ) : null}
            </div>
          </div>
        </section>
        <section className="relative w-full max-w-2xl lg:flex-1">
          <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(117,127,250,0.25),_transparent_65%)] blur-3xl" />
          <ReadingExperience card={card} />
        </section>
      </div>
    </main>
  );
}
