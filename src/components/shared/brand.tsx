import { Sunset } from "lucide-react";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" aria-label="Gili Hub home" className="inline-flex min-h-11 items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-full bg-coral text-white"><Sunset size={25} strokeWidth={1.6} aria-hidden="true" /></span>
      <span className="text-[27px] font-bold tracking-[-0.07em]">gili<span className="font-normal">hub</span><span className="text-coral">.</span></span>
    </Link>
  );
}
