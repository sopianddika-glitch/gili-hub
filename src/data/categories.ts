import type { Category } from "@/types/category";

// Product taxonomy only, not business listings or availability claims.
export const categories = [
  { id: "stays", name: "Places to stay", description: "Find your island home", icon: "bed" },
  { id: "food", name: "Eat & drink", description: "A taste of island life", icon: "utensils" },
  { id: "ocean", name: "Dive & snorkel", description: "Discover the blue", icon: "waves" },
  { id: "transport", name: "Boats & transport", description: "Your journey, simplified", icon: "ship" },
  { id: "activities", name: "Things to do", description: "Make a little adventure", icon: "sun" },
  { id: "wellness", name: "Wellness & spa", description: "Pause. Breathe. Reset.", icon: "flower" },
  { id: "services", name: "Island services", description: "The everyday essentials", icon: "bike" },
  { id: "health", name: "Health & emergency", description: "Care when you need it", icon: "heart-pulse" },
] as const satisfies readonly Category[];
