"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TarotCard } from "@/data/cards";

export function CardHero({ card }: { card: TarotCard }) {
  return (
    <div className="relative flex flex-col items-center gap-6 text-center">
      <motion.div
        className="relative h-72 w-48 overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-glow"
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={card.image}
          alt={`${card.name} tarot card art`}
          fill
          sizes="(max-width: 768px) 12rem, 12rem"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-white/60">{card.arcana} Arcana</p>
        <h1 className="font-display text-4xl md:text-5xl">{card.name}</h1>
        <p className="text-white/70">
          {card.suit ? `${card.suit} · ` : ""}
          {card.number !== undefined ? `No. ${card.number}` : "Major Key"}
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-white/60">
          {(card.keywordsUpright ?? []).slice(0, 4).map((keyword) => (
            <span key={keyword} className="rounded-full border border-white/20 px-3 py-1">
              {keyword}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
