"use client";

import { useCallback, useState } from "react";
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
    <div className="flex w-full flex-col items-center gap-8">
      <QuestionBox onReveal={handleReveal} isLoading={loading} />
      <ReadingPanel card={card} reading={reading} isLoading={loading} orientation={orientation} />
    </div>
  );
}
