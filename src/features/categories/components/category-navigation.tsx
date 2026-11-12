import { BedDouble, Bike, Flower2, HeartPulse, Ship, Sun, Utensils, Waves, type LucideIcon } from "lucide-react";
import { categories } from "@/data/categories";
import type { CategoryIcon } from "@/types/category";

const icons: Record<CategoryIcon, LucideIcon> = {
  bed: BedDouble, utensils: Utensils, waves: Waves, ship: Ship,
  "heart-pulse": HeartPulse, flower: Flower2, bike: Bike, sun: Sun,
};

export function CategoryNavigation() {
  return <nav aria-label="Upcoming directory categories" aria-describedby="categories-status">
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {categories.map((category) => {
        const Icon = icons[category.icon];
        return <li key={category.id}>
          <button type="button" disabled className="relative flex h-full min-h-39 w-full flex-col items-start rounded-xl border border-line bg-white px-4 py-5 text-left sm:px-5" aria-describedby="categories-status">
            <span className="mb-5 flex size-10 items-center justify-center rounded-xl bg-sand text-teal"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
            <span className="absolute top-5 right-4 text-[9px] font-bold tracking-wide text-muted uppercase">Soon</span>
            <span className="text-[13px] font-bold sm:text-sm">{category.name}</span>
            <span className="mt-1 text-[11px] leading-relaxed text-muted sm:text-xs">{category.description}</span>
          </button>
        </li>;
      })}
    </ul>
  </nav>;
}
