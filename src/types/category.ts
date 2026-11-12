export type CategoryIcon = "bed" | "utensils" | "waves" | "ship" | "heart-pulse" | "flower" | "bike" | "sun";
export interface Category {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon: CategoryIcon;
}
