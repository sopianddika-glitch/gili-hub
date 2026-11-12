import { Heart, MapPin } from "lucide-react";
import { Brand } from "@/components/shared/brand";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return <footer className="border-t border-line bg-sand py-8">
    <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div><Brand /><p className="mt-2 text-xs text-muted">One island. Endless possibilities.</p></div>
      <div className="flex flex-col gap-2 text-xs text-muted sm:text-right">
        <span className="inline-flex items-center gap-1.5 sm:justify-end"><MapPin size={13} aria-hidden="true" />Gili Trawangan, Indonesia</span>
        <span className="inline-flex items-center gap-1.5">Made for the island, with <Heart size={12} className="text-coral" aria-label="love" /> · Gili Hub</span>
      </div>
    </Container>
  </footer>;
}
