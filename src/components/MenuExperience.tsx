"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CategoryNav from "@/components/CategoryNav";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import WifiCard from "@/components/WifiCard";
import ReviewBooster from "@/components/ReviewBooster";
import dynamic from "next/dynamic";
const ProductModal = dynamic(() => import("@/components/ProductModal"), { ssr: false, loading: () => null });
import type { Product, Category, ContactInfo } from "@/types/menu";

interface MenuExperienceProps {
  categories: Category[];
  currency: string;
  contact: ContactInfo;
  storeName?: string;
}

export default function MenuExperience({ categories, currency, contact, storeName }: MenuExperienceProps) {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  function toggleSelect(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const normalizedQuery = query.trim().toLocaleLowerCase("tr");

  const filteredCategories = useMemo(() => {
    let cats = categories;
    if (normalizedQuery) {
      cats = categories
        .map((category) => ({
          ...category,
          products: category.products.filter(
            (product) =>
              product.name.toLocaleLowerCase("tr").includes(normalizedQuery) ||
              product.description.toLocaleLowerCase("tr").includes(normalizedQuery)
          ),
        }))
        .filter((category) => category.products.length > 0);
    }

    if (showSelectedOnly) {
      return cats
        .map((category) => ({
          ...category,
          products: category.products.filter((product) => selectedIds.includes(product.id)),
        }))
        .filter((category) => category.products.length > 0);
    }

    return cats;
  }, [categories, normalizedQuery, showSelectedOnly, selectedIds]);

  // Scroll-spy: görünür kategoriye göre nav'daki aktif sekmeyi günceller
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("cat-", "");
            setActiveId(id);
          }
        });
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredCategories]);

  return (
    <>
      <CategoryNav
        categories={categories}
        activeId={activeId}
        onSelect={setActiveId}
      />

      {/* Wi-Fi Tek Tıkla Kopyala Kartı */}
      <WifiCard wifi={contact.wifi} />

      <div className="mt-2 flex items-center justify-between gap-3 px-4">
        <SearchBar value={query} onChange={setQuery} />
        <button
          onClick={() => setShowSelectedOnly((s) => !s)}
          aria-pressed={showSelectedOnly}
          className={`ml-2 flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
            showSelectedOnly ? "bg-brand text-white" : "bg-white border"
          }`}
        >
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded-sm text-[12px] font-bold transition ${
              showSelectedOnly ? "bg-brand text-white" : "border bg-transparent text-ink/60"
            }`}
          >
            {showSelectedOnly ? "✓" : ""}
          </span>
          Seçilenler
          {selectedIds.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
              {selectedIds.length}
            </span>
          )}
        </button>
      </div>

      <div className="space-y-8 px-4 pb-6 mt-4">
        {showSelectedOnly && selectedIds.length === 0 && (
          <p className="py-6 text-center text-sm font-medium text-ink/70">
            Henüz seçim yapılmadı — beğendiğiniz ürünlerin yanındaki <span className="font-bold">+</span> butonuna tıklayın.
          </p>
        )}

        {filteredCategories.length === 0 && !showSelectedOnly && (
          <p className="py-10 text-center text-sm text-ink/50">
            "{query}" ile eşleşen ürün bulunamadı.
          </p>
        )}

        {filteredCategories.map((category) => (
          <section
            key={category.id}
            id={`cat-${category.id}`}
            ref={(el) => {
              sectionRefs.current[category.id] = el;
            }}
            className="scroll-mt-28"
          >
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  whatsappNumber={contact.whatsappNumber}
                  onClick={() => setSelectedProduct(product)}
                  selected={selectedIds.includes(product.id)}
                  onToggleSelect={() => product.isAvailable && toggleSelect(product.id)}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Google Yorumlarına Yönlendirme (Review Booster) */}
        <ReviewBooster googleReviewUrl={contact.googleReviewUrl} storeName={storeName} />

        <ProductModal
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          currency={currency}
          whatsappNumber={contact.whatsappNumber}
        />
      </div>
    </>
  );
}
