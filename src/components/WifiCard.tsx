"use client";

import { useState } from "react";
import { Wifi, Copy, Check } from "lucide-react";
import type { WifiInfo } from "@/types/menu";

interface WifiCardProps {
  wifi: WifiInfo;
}

export default function WifiCard({ wifi }: WifiCardProps) {
  const [copiedField, setCopiedField] = useState<"ssid" | "password" | null>(null);

  const handleCopy = async (text: string, field: "ssid" | "password") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  if (!wifi || !wifi.ssid) return null;

  return (
    <div className="mx-4 my-3 overflow-hidden rounded-xl border border-amber-200/80 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 p-3 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Header Icon + Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-sm">
            <Wifi className="h-5 w-5 animate-pulse" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand">Wi-Fi Bağlantısı</h4>
              {copiedField && (
                <span className="inline-flex items-center rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 animate-fade-in">
                  Kopyalandı! ✓
                </span>
              )}
            </div>
            <p className="text-[11px] font-medium text-ink/60">Tıklayarak panoya kopyalayın</p>
          </div>
        </div>

        {/* Copy Buttons Container */}
        <div className="flex flex-wrap items-center gap-2">
          {/* SSID Button */}
          <button
            type="button"
            onClick={() => handleCopy(wifi.ssid, "ssid")}
            title="Ağ adını kopyala"
            className={`group flex flex-1 items-center justify-between gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all sm:flex-initial ${
              copiedField === "ssid"
                ? "border-emerald-500 bg-emerald-500 text-white shadow"
                : "border-stone-200 bg-white text-ink hover:border-brand hover:bg-brand/5 shadow-sm"
            }`}
          >
            <span className="text-ink/50 group-hover:text-brand">Ağ:</span>
            <span className="font-bold">{wifi.ssid}</span>
            {copiedField === "ssid" ? (
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            ) : (
              <Copy className="h-3.5 w-3.5 text-ink/40 group-hover:text-brand" />
            )}
          </button>

          {/* Password Button */}
          <button
            type="button"
            onClick={() => handleCopy(wifi.password, "password")}
            title="Şifreyi kopyala"
            className={`group flex flex-1 items-center justify-between gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all sm:flex-initial ${
              copiedField === "password"
                ? "border-emerald-500 bg-emerald-500 text-white shadow"
                : "border-brand/40 bg-brand/10 text-brand hover:bg-brand/20 shadow-sm"
            }`}
          >
            <span className="opacity-70">Şifre:</span>
            <span className="font-bold">{wifi.password}</span>
            {copiedField === "password" ? (
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            ) : (
              <Copy className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
