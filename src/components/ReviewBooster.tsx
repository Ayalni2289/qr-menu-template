"use client";

import { Star, ExternalLink } from "lucide-react";

interface ReviewBoosterProps {
  googleReviewUrl?: string;
  storeName?: string;
}

export default function ReviewBooster({ googleReviewUrl, storeName }: ReviewBoosterProps) {
  if (!googleReviewUrl) return null;

  return (
    <div className="mx-4 my-6 overflow-hidden rounded-2xl border border-amber-300/40 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-amber-600/15 p-5 text-center shadow-card transition-transform duration-300 hover:scale-[1.01]">
      <div className="flex justify-center gap-1 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400 drop-shadow-sm" />
        ))}
      </div>

      <h3 className="mt-2.5 font-display text-lg font-extrabold text-ink">
        Lezzetimizi beğendiniz mi?
      </h3>
      <p className="mt-1 text-xs text-ink/70">
        Deneyiminizi paylaşarak {storeName || "bize"} destek olun. Bize Google'da 5 yıldız verin!
      </p>

      <a
        href={googleReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-amber-600 active:scale-95"
      >
        <span>Google'da Değerlendirin</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
