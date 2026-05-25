import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[oklch(0.78_0.15_82/0.15)] bg-[oklch(0.05_0_0/0.8)] backdrop-blur-xl py-3"
          : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-3">
          <span className="font-display text-2xl tracking-[0.3em] text-gold-gradient">AURUM</span>
        </a>
        <nav className="hidden gap-10 text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground md:flex">
          {["Collections", "Diamonds", "Bridal", "Market", "Atelier"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative transition-colors hover:text-[var(--gold-light)]"
            >
              <span className="relative">
                {item}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>
        <button className="btn-luxury-ghost btn-luxury shimmer text-[0.65rem]">Book Visit</button>
      </div>
    </header>
  );
}
