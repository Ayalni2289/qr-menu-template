import type { StoreInfo, ContactInfo } from "@/types/menu";

interface FooterProps {
  store: StoreInfo;
  contact: ContactInfo;
}

export default function Footer({ store, contact }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone-150 bg-white px-4 py-6 text-center">
      <p className="text-sm font-medium text-ink/70">{contact.workingHours}</p>
      {contact.phone && (
        <p className="mt-2 text-sm font-medium text-ink/70">
          {contact.phone.split("/").map((p, i) => {
            const trimmed = p.trim();
            const digits = trimmed.replace(/\D/g, "");
            const tel = digits.length === 10 ? `+90${digits}` : `+${digits}`;
            return (
              <a key={i} href={`tel:${tel}`} className="mx-2 font-semibold text-brand">
                {trimmed}
              </a>
            );
          })}
        </p>
      )}
      <p className="mt-2 text-xs text-ink/40">
        © {year} {store.name}. Tüm hakları saklıdır.
      </p>
      <p className="mt-1 text-[11px] text-ink/30">QR Menü altyapısı <a href="https://yalnizdigital.tech" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand">YalnizDigital</a> ile</p>
    </footer>
  );
}
