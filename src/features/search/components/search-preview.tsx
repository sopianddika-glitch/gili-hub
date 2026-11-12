import { MapPin, Search } from "lucide-react";

export function SearchPreview() {
  return <section aria-label="Island search preview" className="rounded-2xl border border-line bg-white p-5 shadow-[0_8px_40px_-15px_#173d4030] sm:p-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="min-w-0 flex-1">
        <label htmlFor="island-search" className="mb-2 block text-xs font-bold">Your next island discovery starts here</label>
        <div className="flex items-center gap-3">
          <Search size={20} className="shrink-0 text-teal" aria-hidden="true" />
          <input id="island-search" type="search" disabled placeholder="Places, experiences, island essentials…" aria-describedby="search-status" className="min-h-8 w-full min-w-0 bg-transparent text-sm text-muted placeholder:text-muted sm:text-base" />
        </div>
      </div>
      <span className="hidden items-center gap-2 border-l border-line py-3 pl-6 text-sm text-muted lg:inline-flex"><MapPin size={17} aria-hidden="true" />Gili Trawangan</span>
      <button disabled type="button" aria-describedby="search-status" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-coral px-6 text-sm font-bold text-white"><Search size={16} aria-hidden="true" />Search · Coming soon</button>
    </div>
    <p id="search-status" className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">You&apos;re exploring an early preview. Search is a placeholder and isn&apos;t active yet.</p>
  </section>;
}
