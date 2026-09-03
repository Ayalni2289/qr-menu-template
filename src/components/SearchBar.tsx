"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 rounded-full border border-stone-150 bg-white px-4 py-2.5 shadow-sm">
        <Search className="h-4 w-4 shrink-0 text-ink/40" />
        <input
          type="text"
          inputMode="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ürün ara (örn: kahve, tatlı...)"
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
        {value.length > 0 && (
          <button
            onClick={() => onChange("")}
            aria-label="Aramayı temizle"
            className="shrink-0 text-ink/40 transition hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
