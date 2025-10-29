"use client";

type FilterPillsProps = {
  majorOnly: boolean;
  onMajorToggle: (value: boolean) => void;
  suit: "All" | "Wands" | "Cups" | "Swords" | "Pentacles";
  onSuitChange: (value: "All" | "Wands" | "Cups" | "Swords" | "Pentacles") => void;
};

const suits: Array<"All" | "Wands" | "Cups" | "Swords" | "Pentacles"> = [
  "All",
  "Wands",
  "Cups",
  "Swords",
  "Pentacles"
];

export function FilterPills({ majorOnly, onMajorToggle, suit, onSuitChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => onMajorToggle(!majorOnly)}
        className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] ${
          majorOnly ? "bg-[rgb(var(--theme-accent))] text-[rgb(var(--theme-background))]" : "bg-white/10 text-white"
        }`}
      >
        Major arcana only
      </button>
      <div className="flex flex-wrap gap-2">
        {suits.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onSuitChange(option)}
            className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] ${
              suit === option ? "bg-[rgb(var(--theme-accent))] text-[rgb(var(--theme-background))]" : "bg-white/10 text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
