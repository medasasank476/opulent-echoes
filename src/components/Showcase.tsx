import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import necklace from "@/assets/necklace.jpg";

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
        <motion.div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            style={{ y: imgY, scale: 1.2 }}
            src={necklace}
            alt="Atelier"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          <span className="beam" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative">
          <div className="mb-6 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.5em] text-[var(--gold)]">
            <span className="hairline" />
            The Atelier
          </div>
          <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
            Every gram of gold,
            <br />
            <span className="text-gold-gradient italic">a story whispered</span>
            <br />
            through fire.
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            Five generations of master goldsmiths. Stones sourced only from
            mines we know by name. Each piece signed, numbered, and accompanied
            by a hand-bound certificate of provenance.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[oklch(0.78_0.15_82/0.15)] pt-8">
            {[
              { num: "137", label: "Years of Craft" },
              { num: "24K", label: "Pure Gold" },
              { num: "1/1", label: "Each Piece" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
              >
                <div className="font-display text-3xl text-gold-gradient md:text-4xl">{s.num}</div>
                <div className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
