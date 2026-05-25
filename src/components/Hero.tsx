import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-necklace.jpg";
import { RevealText } from "./RevealText";
import { GoldParticles } from "./GoldParticles";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Luxury diamond necklace"
          className="h-full w-full object-cover animate-slow-zoom"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_oklch(0.05_0_0/0.7)_100%)]" />
      </motion.div>

      {/* Light beams */}
      <div className="absolute inset-0 overflow-hidden">
        <span className="beam" style={{ animationDelay: "0s" }} />
        <span className="beam" style={{ animationDelay: "4s", top: "30%" }} />
      </div>

      <GoldParticles count={40} />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mb-8 flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.5em] text-[var(--gold)]"
        >
          <span className="hairline" />
          Maison Aurum — Est. 1887
          <span className="hairline" />
        </motion.div>

        <h1 className="max-w-5xl font-display text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-[6.5rem]">
          <RevealText text="Where Luxury Meets" className="block text-foreground" />
          <RevealText
            text="Timeless Beauty"
            className="shimmer shimmer-auto block text-gold-gradient italic"
            delay={1.2}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          A private collection of rare diamonds, sculpted in 24-karat gold,
          handcrafted by the masters of the Place Vendôme atelier.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="btn-luxury shimmer">Discover the Collection</button>
          <button className="btn-luxury btn-luxury-ghost shimmer">Private Viewing</button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.4em] text-[var(--gold)]"
      >
        <div className="flex flex-col items-center gap-3">
          <span>Scroll</span>
          <span className="block h-12 w-px animate-pulse bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
