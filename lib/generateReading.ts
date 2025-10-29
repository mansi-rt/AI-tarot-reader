import type { TarotCard } from "@/data/cards";
import { extractTopic, truncateAtSentence } from "./textUtils";

const templates = [
  ({ cardName, angle, gist, topic }: TemplateParams) =>
    `${cardName} ${angle} points toward ${gist}. About ${topic}, choose momentum over fear—begin small, but begin.`,
  ({ cardName, angle, gist, topic }: TemplateParams) =>
    `With ${cardName} ${angle}, the signal is ${gist}. For ${topic}, align intent with a single honest step today.`,
  ({ cardName, angle, gist, topic }: TemplateParams) =>
    `${cardName} ${angle} whispers of ${gist}. Regarding ${topic}, expect movement when you ask clearly and act simply.`,
  ({ cardName, angle, gist, topic }: TemplateParams) =>
    `Under ${cardName} ${angle}, ${gist} crystallizes. On ${topic}, refine the plan, then take the next brave inch.`,
  ({ cardName, angle, gist, topic }: TemplateParams) =>
    `${cardName} ${angle} cautions ${gist}. For ${topic}, pause briefly, adjust your course, and proceed with care.`
];

type TemplateParams = {
  cardName: string;
  angle: "upright" | "reversed";
  gist: string;
  topic: string;
};

export function generateReading({
  card,
  isReversed,
  userQuestion
}: {
  card: TarotCard;
  isReversed: boolean;
  userQuestion: string;
}): string {
  const topic = extractTopic(userQuestion);
  const gist = isReversed ? card.shortReversed : card.shortUpright;
  const cardName = card.name;
  const angle = isReversed ? "reversed" : "upright";
  const template = templates[Math.floor(Math.random() * templates.length)];
  const raw = template({ cardName, angle, gist, topic });
  const cleaned = raw
    .replace(/\s+/g, " ")
    .replace(/\s([,.!?])/g, "$1")
    .trim();
  return truncateAtSentence(cleaned, 500);
}
