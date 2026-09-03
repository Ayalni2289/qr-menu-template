"use client";

import { useState } from "react";
import Image from "next/image";
// removed framer-motion for performance
import { Instagram, Navigation, Phone } from "lucide-react";
import type { StoreInfo, ContactInfo } from "@/types/menu";

interface HeaderProps {
  store: StoreInfo;
  contact: ContactInfo;
}

export default function Header({ store, contact }: HeaderProps) {
  // wifi UI removed per request

  const actions = [
    {
      key: "phone",
      label: "Ara",
      icon: Phone,
      onClick: undefined as (() => void) | undefined,
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: Instagram,
      href: `https://instagram.com/${contact.instagramUsername}`,
      onClick: undefined,
    },
    {
      key: "maps",
      label: "Yol Tarifi",
      icon: Navigation,
      href: contact.mapsUrl,
      onClick: undefined,
    },
    // cart removed
    // 'Garsonu Çağır' removed per request
  ];

  return (
    <header className="relative">
      <div className="relative h-40 w-full overflow-hidden sm:h-52">
        <Image
          src={store.bannerUrl}
          alt={`${store.name} banner`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      </div>

      <div className="relative -mt-12 flex flex-col items-center px-4 text-center">
        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-paper bg-white shadow-card transition-transform duration-300">
          <Image
            src={store.logoUrl}
            alt={`${store.name} logo`}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">{store.name}</h1>
        <p className="mt-1 max-w-xs text-sm text-ink/60">{store.slogan}</p>

        <div className="mt-5 grid w-full max-w-md grid-cols-3 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            let href: string | undefined = action.href as string | undefined;
                if (action.key === "phone" && (contact as any).phoneHref) {
                  href = (contact as any).phoneHref;
                }
            const content = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand transition group-active:scale-90">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span className="text-[11px] font-medium text-ink/70">{action.label}</span>
              </>
            );

            if (href) {
              return (
                <a
                  key={action.key}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center gap-1.5"
                >
                  {content}
                </a>
              );
            }
            return (
              <button
                key={action.key}
                onClick={action.onClick}
                className="group flex flex-col items-center gap-1.5"
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>

          
    </header>
  );
}
