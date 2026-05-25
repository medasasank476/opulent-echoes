import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Collections } from "@/components/Collections";
import { Showcase } from "@/components/Showcase";
import { LivePrices } from "@/components/LivePrices";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum — Where Luxury Meets Timeless Beauty" },
      {
        name: "description",
        content:
          "Maison Aurum. Rare diamonds, 24K gold, handcrafted at Place Vendôme since 1887. Discover the private collection.",
      },
      { property: "og:title", content: "Aurum — Maison de Haute Joaillerie" },
      {
        property: "og:description",
        content: "A private collection of rare diamonds, sculpted in 24-karat gold.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 3) });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <CursorGlow />
      <Nav />
      <Hero />
      <Collections />
      <Showcase />
      <LivePrices />
      <Testimonials />
      <Footer />
    </main>
  );
}
