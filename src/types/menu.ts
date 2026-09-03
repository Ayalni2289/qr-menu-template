/**
 * Merkezi menü veri mimarisinin tüm TypeScript tipleri.
 * store.config.ts BU dosyadaki arayüzlere göre şekillenir.
 */

export interface StoreInfo {
  name: string;
  slogan: string;
  logoUrl: string;
  bannerUrl: string;
  themeColor: string;
  currency: string;
}

export interface WifiInfo {
  ssid: string;
  password: string;
}

export interface ContactInfo {
  wifi: WifiInfo;
  instagramUsername: string;
  phone: string;
  phoneHref?: string;
  mapsUrl: string;
  workingHours: string;
  whatsappNumber?: string;
  googleReviewUrl?: string;
}

export type ProductTag = string;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: ProductTag[];
  isAvailable: boolean;
  isCustomOrder?: boolean;
}

export type CategoryIconName =
  | "UtensilsCrossed"
  | "Coffee"
  | "Soup"
  | "Beef"
  | "Salad"
  | "IceCream"
  | "GlassWater"
  | "Wine"
  | "Pizza"
  | "Sandwich"
  | "Cake";

export interface Category {
  id: string;
  name: string;
  icon: CategoryIconName;
  products: Product[];
}

export interface StoreConfig {
  store: StoreInfo;
  contact: ContactInfo;
  categories: Category[];
}
