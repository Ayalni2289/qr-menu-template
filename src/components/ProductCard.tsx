"use client";

import Image from "next/image";
import { Check, Plus, MessageCircle } from "lucide-react";
import type { Product } from "@/types/menu";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: Product;
  currency: string;
  whatsappNumber?: string;
  onClick?: () => void;
  selected?: boolean;
  onToggleSelect?: () => void;
}

export default function ProductCard({
  product,
  currency,
  whatsappNumber,
  onClick,
  selected,
  onToggleSelect,
}: ProductCardProps) {
  const isSelected = !!selected;

  const handleWhatsappClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phone = (whatsappNumber || "").replace(/\D/g, "") || "905076790274";
    const message = encodeURIComponent(
      `Merhaba, menünüzdeki "${product.name}" hakkında detaylı bilgi ve fiyat almak istiyorum.`
    );
    const waLink = `https://wa.me/${phone}?text=${message}`;
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && product.isAvailable && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      onClick={product.isAvailable ? onClick : undefined}
      aria-disabled={!product.isAvailable}
      className={`relative flex w-full text-left gap-3 rounded-xl2 border border-stone-150 bg-white p-3 pr-14 sm:pr-20 shadow-card ${
        product.isAvailable ? "" : "opacity-50"
      } ${isSelected ? "ring-2 ring-brand/50 border-brand bg-brand/5" : ""}`}
    >
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect?.();
        }}
        className={`absolute right-4 sm:right-6 top-4 sm:top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border text-sm shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isSelected
            ? "border-brand bg-brand text-white ring-2 ring-brand/40 shadow-lg"
            : "border-stone-150 text-ink/60 hover:border-brand hover:bg-brand/5 bg-white"
        }`}
      >
        {isSelected ? (
          <Check className="h-5 w-5 text-white" strokeWidth={2.5} />
        ) : (
          <Plus className="h-5 w-5 text-ink/60" strokeWidth={2.5} />
        )}
      </button>

      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-150 sm:h-24 sm:w-24">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="96px"
          loading="lazy"
          className="object-cover"
        />
        {!product.isAvailable && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink/50 text-[10px] font-semibold uppercase tracking-wide text-white">
            Tükendi
          </span>
        )}
      </div>

      {isSelected && (
        <div className="absolute left-3 top-3 z-30 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white shadow">
          Seçildi
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-semibold leading-snug text-ink">{product.name}</h3>
          </div>
          <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-ink/55">
            {product.description}
          </p>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand"
              >
                {tag}
              </span>
            ))}
          </div>
          {product.isCustomOrder ? (
            <button
              type="button"
              onClick={handleWhatsappClick}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow transition-all hover:bg-emerald-700 active:scale-95"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Sipariş / Bilgi Al</span>
            </button>
          ) : (
            <span className="whitespace-nowrap text-sm font-bold text-ink">
              {formatPrice(product.price, currency)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
