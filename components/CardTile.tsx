import Image from "next/image";
import Link from "next/link";
import type { TarotCard } from "@/data/cards";

export function CardTile({ card }: { card: TarotCard }) {
  return (
    <Link
      href={`/cards/${card.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-[rgb(var(--theme-accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))]"
    >
      <div className="relative h-48 w-full overflow-hidden rounded-2xl">
        <Image
          src={card.image}
          alt={`${card.name} card art`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.35em] text-white/50">{card.arcana}</span>
        <span className="font-display text-xl">{card.name}</span>
        <span className="text-sm text-white/60">{card.shortUpright}</span>
      </div>
    </Link>
  );
}
