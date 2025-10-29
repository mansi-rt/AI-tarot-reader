"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { TarotCard } from "@/data/cards";
import { QuestionBox } from "./QuestionBox";
import { ReadingPanel } from "./ReadingPanel";
import { generateReading } from "@/lib/generateReading";

type ReadingExperienceProps = {
  card: TarotCard;
};

export function ReadingExperience({ card }: ReadingExperienceProps) {
  const [reading, setReading] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<"upright" | "reversed">("upright");
  const [loading, setLoading] = useState(false);

  const handleReveal = useCallback(
    async (question: string, reversed: boolean) => {
      setLoading(true);
      setOrientation(reversed ? "reversed" : "upright");
      const result = generateReading({ card, isReversed: reversed, userQuestion: question });
      setReading(result);
      setLoading(false);
    },
    [card]
  );

  return (
    <motion.div
      className="flex w-full flex-col gap-10 lg:gap-12"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <QuestionBox onReveal={handleReveal} isLoading={loading} />
      <ReadingPanel card={card} reading={reading} isLoading={loading} orientation={orientation} />
    </motion.div>
  );
}
