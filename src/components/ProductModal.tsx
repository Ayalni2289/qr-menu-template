"use client";

import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import type { Product } from "@/types/menu";
import { formatPrice } from "@/lib/format";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  currency: string;
  whatsappNumber?: string;
}

export default function ProductModal({ product, open, onClose, currency, whatsappNumber }: ProductModalProps) {
  if (!product) return null;

  const phone = (whatsappNumber || "").replace(/\D/g, "") || "905076790274";
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(
    `Merhaba, menünüzdeki "${product.name}" hakkında detaylı bilgi ve fiyat almak istiyorum.`
  )}`;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            className="relative w-full max-w-3xl rounded-t-xl2 bg-paper p-4 shadow-card sm:rounded-xl2 sm:p-6 transition-transform duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-stone-200/80 text-ink/70 hover:bg-stone-300"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-center">
                  <div className="relative h-64 w-full max-w-md overflow-hidden rounded-lg bg-stone-150 shadow-lg">
                    <Image src={product.imageUrl} alt={product.name} fill sizes="384px" className="object-cover" />
                    {!product.isAvailable && (
                      <div className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">Tükendi</div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between pr-2 pb-12 sm:pb-14">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">{product.name}</h2>

                    <p className="mt-4 text-sm text-ink/75 leading-relaxed">{product.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-brand/10 px-3 py-1 text-[12px] font-semibold text-brand">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action / Price Badge */}
                  {product.isCustomOrder ? (
                    <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 z-20">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-700 active:scale-95"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Sipariş / Bilgi Al</span>
                      </a>
                    </div>
                  ) : (
                    <div className="pointer-events-none absolute right-4 bottom-4 sm:right-6 sm:bottom-6">
                      <div className="rounded-lg bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                        <span className="text-lg sm:text-2xl font-extrabold text-ink">{formatPrice(product.price, currency)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
