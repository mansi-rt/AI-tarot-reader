"use client";

import { useEffect, useState } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <label className="flex w-full items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm focus-within:border-[rgb(var(--theme-accent))]">
      <span className="text-white/50">Search</span>
      <input
        type="search"
        value={localValue}
        onChange={(event) => {
          setLocalValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder="Find a card by name or keyword…"
        className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
      />
    </label>
  );
}
