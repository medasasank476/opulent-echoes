import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const quotes = [
  {
    text: "An heirloom is no longer something inherited — it is something Aurum creates the moment you wear it.",
    author: "Vogue Paris",
    role: "Editorial Feature",
  },
  {
    text: "There are jewelers, and then there is Aurum. The difference is felt the instant the box is opened.",
    author: "Isabella Moreau",
    role: "Private Client, Monaco",
  },
  {
    text: "Light does not reflect from these pieces — it lingers, as if reluctant to leave.",
    author: "Robb Report",
    role: "Annual Luxury Index",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.78_0.15_82/0.06),_transparent_70%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-10 font-display text-[8rem] leading-none text-gold-gradient opacity-20">
          "
        </div>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
            transition={{ duration: 0.8 }}
            className="-mt-24"
          >
            <p className="font-display text-3xl italic leading-snug text-foreground md:text-4xl lg:text-5xl">
              {quotes[i].text}
            </p>
            <footer className="mt-10 flex flex-col items-center gap-2">
              <span className="hairline" />
              <div className="text-sm uppercase tracking-[0.3em] text-[var(--gold)]">
                {quotes[i].author}
              </div>
              <div className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                {quotes[i].role}
              </div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-12 flex justify-center gap-3">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Quote ${idx + 1}`}
              className={`h-px transition-all duration-700 ${
                i === idx ? "w-12 bg-[var(--gold)]" : "w-6 bg-[oklch(0.78_0.15_82/0.3)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
