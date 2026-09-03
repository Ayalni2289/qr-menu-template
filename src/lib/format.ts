/** Fiyatı işletmenin para birimi simgesiyle birlikte formatlar (örn: 145 -> "145 ₺") */
export function formatPrice(price: number, currency: string): string {
  const formatted = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);
  return `${formatted} ${currency}`;
}
