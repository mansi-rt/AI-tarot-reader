import { CARDS } from "@/data/cards";
import { Starfield } from "@/components/Starfield";
import { ConstellationLayer } from "@/components/ConstellationLayer";
import { DeckInteractive } from "@/components/DeckInteractive";

export const metadata = {
  title: "Deck Browser | Mystic NFC Tarot"
};

export default function DeckPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-16">
      <Starfield className="pointer-events-none absolute inset-0 h-full w-full" />
      <ConstellationLayer className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 text-white">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">The full deck</p>
          <h1 className="font-display text-5xl">Browse every archetype</h1>
          <p className="mx-auto max-w-2xl text-white/70">
            Search 78 luminous cards, filter by arcana or suit, and tap through to each NFC-ready reading portal.
          </p>
        </header>
        <DeckInteractive cards={CARDS} />
      </div>
    </main>
  );
}
