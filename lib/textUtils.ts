const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "if",
  "of",
  "to",
  "in",
  "is",
  "it",
  "should",
  "i",
  "me",
  "my",
  "for",
  "about",
  "this",
  "that",
  "on",
  "at",
  "do",
  "does",
  "be",
  "with"
]);

export function extractTopic(question: string): string {
  const sanitized = question
    .replace(/[^a-zA-Z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!sanitized) {
    return "the path before you";
  }

  const keywords = sanitized
    .split(" ")
    .filter((word) => word && !STOP_WORDS.has(word))
    .slice(0, 10);

  if (!keywords.length) {
    return "the path before you";
  }

  return keywords.join(" ");
}

export function truncateAtSentence(text: string, limit = 500): string {
  if (text.length <= limit) return text.trim();
  const clipped = text.slice(0, limit);
  const lastPeriod = clipped.lastIndexOf(".");
  if (lastPeriod > limit * 0.6) {
    return clipped.slice(0, lastPeriod + 1).trim();
  }
  return `${clipped.trim()}…`;
}
