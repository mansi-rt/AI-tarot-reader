import Link from "next/link";
import { CARDS } from "@/data/cards";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Starfield } from "@/components/Starfield";
import { ConstellationLayer } from "@/components/ConstellationLayer";

const featured = CARDS[0];
const randomCard = CARDS[Math.floor(Math.random() * CARDS.length)];

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <Starfield className="pointer-events-none absolute inset-0 h-full w-full" />
      <ConstellationLayer className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16 text-white">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/60">Mystic NFC Tarot</p>
            <h1 className="mt-3 max-w-2xl font-display text-5xl md:text-6xl">
              Tap a card. Ask a question. Receive a luminous tarot whisper.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/75">
              Each tarot card owns a dedicated portal designed for NFC moments. Hand your deck a digital echo with readings that
              weave question and archetype into 500 characters of poetic clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/deck"
                className="rounded-full bg-[rgb(var(--theme-accent))] px-6 py-3 font-semibold text-[rgb(var(--theme-background))] shadow-glow transition hover:shadow-[0_0_30px_rgba(200,169,89,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))]"
              >
                Browse the deck
              </Link>
              <Link
                href={`/cards/${randomCard.slug}`}
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-[rgb(var(--theme-accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))]"
              >
                Reveal a random card
              </Link>
            </div>
          </div>
          <ThemeSwitcher />
        </header>

        <section className="grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-glass backdrop-blur md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">How it works</p>
            <h2 className="mt-2 font-display text-3xl">NFC-linked tarot, tuned for anticipation</h2>
            <ol className="mt-4 space-y-3 text-white/70">
              <li>1. Encode each NFC tag with its matching card URL.</li>
              <li>2. Tap to open a celestial stage asking, “What mystery shall we solve today?”</li>
              <li>3. Reveal a 500-character reading infused with the card and your question.</li>
              <li>4. Copy, share, or download the insight in a keepsake card.</li>
            </ol>
          </div>
          <div className="rounded-2xl bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Featured card</p>
            <h3 className="mt-2 font-display text-2xl">{featured.name}</h3>
            <p className="text-sm text-white/70">{featured.shortUpright}</p>
            <Link
              href={`/cards/${featured.slug}`}
              className="mt-5 inline-flex rounded-full border border-white/20 px-5 py-2 text-sm text-white transition hover:border-[rgb(var(--theme-accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))]"
            >
              Visit card portal
            </Link>
          </div>
        </section>

        <footer className="text-xs text-white/40">
          Ready for Vercel • NFC deep links: https://yourdomain.com/cards/[card]
        </footer>
      </div>
    </main>
  );
}
