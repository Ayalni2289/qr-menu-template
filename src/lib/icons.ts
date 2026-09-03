import {
  UtensilsCrossed,
  Coffee,
  Soup,
  Beef,
  Salad,
  IceCream,
  GlassWater,
  Wine,
  Pizza,
  Sandwich,
  Cake,
  type LucideIcon,
} from "lucide-react";
import type { CategoryIconName } from "@/types/menu";

/** store.config.ts içindeki `icon` alanını gerçek Lucide bileşenine eşler */
export const categoryIconMap: Record<CategoryIconName, LucideIcon> = {
  UtensilsCrossed,
  Coffee,
  Soup,
  Beef,
  Salad,
  IceCream,
  GlassWater,
  Wine,
  Pizza,
  Sandwich,
  Cake,
};

export function getCategoryIcon(name: CategoryIconName): LucideIcon {
  return categoryIconMap[name] ?? UtensilsCrossed;
}
