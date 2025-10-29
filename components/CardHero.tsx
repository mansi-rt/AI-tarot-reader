"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TarotCard } from "@/data/cards";

export function CardHero({ card }: { card: TarotCard }) {
  return (
    <div className="relative flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
      <div className="relative">
        <motion.div
          aria-hidden
          className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle,_rgba(200,169,89,0.25),_transparent_65%)] blur-2xl"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          className="relative h-72 w-48 overflow-hidden rounded-3xl border border-white/30 bg-white/10 shadow-[0_0_50px_rgba(117,127,250,0.35)]"
          initial={{ rotateY: 65, opacity: 0, y: 24 }}
          animate={{ rotateY: 0, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            style={{ background: "linear-gradient(140deg, rgba(255,255,255,0.15) 0%, transparent 55%)" }}
          />
          <Image
            src={card.image}
            alt={`${card.name} tarot card art`}
            fill
            sizes="(max-width: 768px) 12rem, 12rem"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/30" />
        </motion.div>
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-full mt-6 h-24 w-24 -translate-x-1/2 rounded-full border border-white/20 bg-black/40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 360 }}
          transition={{ duration: 14, delay: 1.1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-white/60">{card.arcana} Arcana</p>
        <h1 className="font-display text-4xl md:text-5xl">{card.name}</h1>
        <p className="text-white/70">
          {card.suit ? `${card.suit} · ` : ""}
          {card.number !== undefined ? `No. ${card.number}` : "Major Key"}
        </p>
        <p className="max-w-xl text-base text-white/70">
          {card.description?.slice(0, 160) ?? "An archetype woven for luminous questions."}
        </p>
        <motion.div className="flex flex-wrap gap-2 text-xs text-white/60" layout>
          {(card.keywordsUpright ?? []).slice(0, 4).map((keyword) => (
            <motion.span
              key={keyword}
              className="rounded-full border border-white/20 px-3 py-1 backdrop-blur"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              {keyword}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
