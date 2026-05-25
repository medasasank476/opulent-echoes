import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ring from "@/assets/ring.jpg";
import earrings from "@/assets/earrings.jpg";
import bracelet from "@/assets/bracelet.jpg";
import watch from "@/assets/watch.jpg";
import necklace from "@/assets/necklace.jpg";

const items = [
  { name: "Solitaire Rings", category: "Diamond Collection", img: ring, price: "From €12,400" },
  { name: "Pendant Earrings", category: "Gold Atelier", img: earrings, price: "From €8,900" },
  { name: "Eternal Bracelet", category: "Limited Edition", img: bracelet, price: "From €15,200" },
  { name: "Imperial Watch", category: "Haute Horlogerie", img: watch, price: "From €42,000" },
  { name: "Floral Necklace", category: "Bridal Couture", img: necklace, price: "From €28,500" },
];

function TiltCard({ item, index }: { item: typeof items[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTransform(
      `perspective(1200px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(20px)`,
    );
  };
  const reset = () => setTransform("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="luxury-card shimmer relative aspect-[3/4] w-full"
        style={{ transform, transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1)" }}
      >
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--gold)]">
            {item.category}
          </p>
          <h3 className="mt-2 font-display text-2xl text-foreground">{item.name}</h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{item.price}</span>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--gold-light)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Explore →
            </span>
          </div>
        </div>
        {/* corner sparkle */}
        <span
          className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[var(--gold-light)]"
          style={{ boxShadow: "0 0 12px var(--gold)", animation: "sparkle 3s ease-in-out infinite" }}
        />
      </div>
    </motion.div>
  );
}

export function Collections() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="collections" ref={ref} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div style={{ y: titleY }} className="mb-20 text-center">
          <div className="mb-6 flex items-center justify-center gap-4 text-[0.65rem] uppercase tracking-[0.5em] text-[var(--gold)]">
            <span className="hairline" />
            The Collection
            <span className="hairline" />
          </div>
          <h2 className="font-display text-5xl leading-tight md:text-7xl">
            Sculpted in <span className="text-gold-gradient italic">Eternity</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground md:text-base">
            Five chapters of craftsmanship — each piece a singular conversation
            between rare gemstones and master goldsmiths.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <TiltCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
