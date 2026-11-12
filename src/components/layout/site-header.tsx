import { ArrowUpRight, Menu } from "lucide-react";
import { Brand } from "@/components/shared/brand";
import { Container } from "@/components/ui/container";

function Navigation() {
  return <>
    <a className="nav-link font-bold" href="#explore">Explore the island</a>
    <span aria-disabled="true" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted">Island map <span className="rounded bg-sand px-1.5 py-1 text-[9px] font-bold uppercase">Soon</span></span>
    <a className="nav-link" href="#about">About Gili Hub</a>
  </>;
}

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-line bg-background">
      <Container className="flex h-21 items-center justify-between gap-4">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex"><Navigation /></nav>
        <a href="#businesses" className="hidden min-h-11 items-center gap-3 rounded-full border border-line px-5 text-sm font-bold transition-colors hover:border-teal hover:bg-sand lg:inline-flex">For local businesses <ArrowUpRight size={16} aria-hidden="true" /></a>
        <details className="group lg:hidden">
          <summary aria-label="Toggle navigation" className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line"><Menu size={21} aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full flex flex-col gap-2 border-b border-line bg-background px-6 py-5 shadow-lg"><Navigation /><a href="#businesses" className="nav-link">For local businesses <ArrowUpRight className="ml-2" size={16} aria-hidden="true" /></a></nav>
        </details>
      </Container>
    </header>
  );
}
