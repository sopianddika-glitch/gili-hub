import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import "./globals.css";

const dmSans = localFont({
  src: [
    { path: "../assets/fonts/dm-sans-regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/dm-sans-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: { title: siteConfig.title, description: siteConfig.description, type: "website", locale: "en_US" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body className="font-sans">
        <a href="#main-content" className="fixed top-3 left-3 z-50 -translate-y-24 rounded-lg bg-white px-5 py-3 font-bold shadow-lg focus:translate-y-0">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
