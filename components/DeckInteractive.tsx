"use client";

import { useMemo, useState } from "react";
import type { TarotCard } from "@/data/cards";
import { SearchBar } from "./SearchBar";
import { FilterPills } from "./FilterPills";
import { CardTile } from "./CardTile";

function filterCards(cards: TarotCard[], query: string, majorOnly: boolean, suit: string) {
  const lowered = query.trim().toLowerCase();
  return cards.filter((card) => {
    if (majorOnly && card.arcana !== "Major") {
      return false;
    }
    if (suit !== "All" && card.suit !== suit) {
      return false;
    }
    if (!lowered) return true;
    const pool = [card.name, card.shortUpright, ...(card.keywordsUpright || [])].join(" ").toLowerCase();
    return pool.includes(lowered);
  });
}

export function DeckInteractive({ cards }: { cards: TarotCard[] }) {
  const [query, setQuery] = useState("");
  const [majorOnly, setMajorOnly] = useState(false);
  const [suit, setSuit] = useState<"All" | "Wands" | "Cups" | "Swords" | "Pentacles">("All");

  const filteredCards = useMemo(() => filterCards(cards, query, majorOnly, suit), [cards, majorOnly, query, suit]);

  return (
    <section className="flex flex-col gap-6">
      <SearchBar value={query} onChange={setQuery} />
      <FilterPills majorOnly={majorOnly} onMajorToggle={setMajorOnly} suit={suit} onSuitChange={setSuit} />
      <p className="text-sm text-white/60">
        Showing {filteredCards.length} {filteredCards.length === 1 ? "card" : "cards"}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCards.map((card) => (
          <CardTile key={card.slug} card={card} />
        ))}
      </div>
    </section>
  );
}
