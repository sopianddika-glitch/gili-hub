import Image from "next/image";
import { ArrowDown, ArrowUpRight, Compass, MapPin, Waves } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CategoryNavigation } from "@/features/categories/components/category-navigation";
import { SearchPreview } from "@/features/search/components/search-preview";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section aria-labelledby="hero-title" className="relative isolate bg-ocean text-white">
          <Image src="/images/island-mood.jpg" alt="" fill preload sizes="100vw" className="-z-20 object-cover object-[65%_55%]" />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-ocean/90 via-ocean/60 to-ocean/10" />
          <Container className="relative pb-28 pt-16 sm:pb-32 sm:pt-20 lg:pb-36 lg:pt-24">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-[11px] font-bold tracking-[0.16em] uppercase">
              <MapPin size={14} aria-hidden="true" /> Gili Trawangan, Lombok
            </div>
            <h1 id="hero-title" className="max-w-185 text-[clamp(2.7rem,5.2vw,4.75rem)] leading-[1.08] font-bold tracking-[-0.055em] text-balance">
              Discover Everything on <span className="text-seafoam">Gili Trawangan</span>
            </h1>
            <p className="mt-6 max-w-118 text-base leading-relaxed text-white/85 sm:text-lg">
              Your island companion. Discover places to stay, things to do,
              and the everyday essentials — all in one place.
            </p>
            <a href="#explore" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-white/60 pb-1 text-sm font-bold transition-colors hover:text-seafoam">
              A little island. So much to discover. <ArrowDown size={16} aria-hidden="true" />
            </a>
            <div aria-hidden="true" className="absolute right-8 bottom-28 hidden items-center gap-3 text-white/85 lg:flex">
              <Waves size={30} strokeWidth={1.3} />
              <span className="text-xs leading-relaxed tracking-wide">Slow down.<br />You&apos;re on island time.</span>
            </div>
          </Container>
        </section>
        <Container className="relative -mt-12"><SearchPreview /></Container>
        <section id="explore" aria-labelledby="explore-title" className="scroll-mt-8 py-14 sm:py-18">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow mb-3">Make the island yours</p>
                <h2 id="explore-title" className="section-title">What brings you to Gili?</h2>
              </div>
              <span className="rounded-full border border-line px-3 py-1.5 text-xs font-bold text-muted">Category preview</span>
            </div>
            <CategoryNavigation />
            <p id="categories-status" className="mt-5 text-sm leading-relaxed text-muted">A glimpse of what&apos;s ahead. Category browsing and business listings are coming soon.</p>
          </Container>
        </section>
        <section id="about" aria-labelledby="about-title" className="scroll-mt-8 border-t border-line pb-16 pt-14 sm:pb-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
              <div>
                <div className="mb-5 flex items-center gap-2 text-teal"><Compass size={20} aria-hidden="true" /><p className="eyebrow">Meet your island companion</p></div>
                <h2 id="about-title" className="section-title max-w-110">Less searching.<br />More island time.</h2>
                <p className="mt-5 max-w-120 text-base leading-7 text-muted">We&apos;re bringing Gili Trawangan together in one thoughtful guide. From your next adventure to the services you need, Gili Hub is being built to help you find your way.</p>
              </div>
              <div id="businesses" className="scroll-mt-8 self-center rounded-2xl border border-line bg-sand p-7 sm:p-8">
                <span className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-teal"><span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />A new island connection is taking shape</span>
                <h3 className="text-xl font-bold tracking-tight">Local roots. Open to the world.</h3>
                <p className="mt-3 text-sm leading-6 text-muted">A place for travelers to discover and local businesses to be discovered. Business profiles and management tools are planned for a future release.</p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs font-bold text-muted"><span>Business registration · Coming soon</span><ArrowUpRight size={17} aria-hidden="true" /></div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
