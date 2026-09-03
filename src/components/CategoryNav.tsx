"use client";

import { useEffect, useRef } from "react";
import { getCategoryIcon } from "@/lib/icons";
import type { Category } from "@/types/menu";

interface CategoryNavProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Active sekme değiştiğinde sekmeyi yatay kaydırma çubuğunun ortasına getirir
  useEffect(() => {
    if (activeId && tabRefs.current[activeId]) {
      const activeTab = tabRefs.current[activeId];
      activeTab?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeId]);

  function handleSelect(id: string) {
    onSelect(id);
    const section = document.getElementById(`cat-${id}`);
    if (section) {
      const yOffset = -70; // sticky header offset
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <nav className="sticky top-0 z-30 border-b border-stone-150/80 bg-paper/95 shadow-sm backdrop-blur-md">
      <div
        ref={scrollerRef}
        className="scrollbar-none flex gap-2 overflow-x-auto px-4 py-2.5"
      >
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              ref={(el) => {
                tabRefs.current[category.id] = el;
              }}
              onClick={() => handleSelect(category.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "border-brand bg-brand text-white shadow-sm ring-2 ring-brand/20 scale-[1.02]"
                  : "border-stone-200 bg-white text-ink/70 hover:border-brand/40 hover:text-ink hover:bg-stone-50"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
