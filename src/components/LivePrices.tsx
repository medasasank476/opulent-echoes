import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const COUNTRIES = [
  { code: "US", name: "United States", currency: "USD", symbol: "$", goldBase: 2380, silverBase: 28.4 },
  { code: "EU", name: "Europe", currency: "EUR", symbol: "€", goldBase: 2210, silverBase: 26.1 },
  { code: "UK", name: "United Kingdom", currency: "GBP", symbol: "£", goldBase: 1890, silverBase: 22.3 },
  { code: "AE", name: "UAE", currency: "AED", symbol: "د.إ", goldBase: 8740, silverBase: 104.2 },
  { code: "IN", name: "India", currency: "INR", symbol: "₹", goldBase: 198400, silverBase: 2360 },
  { code: "JP", name: "Japan", currency: "JPY", symbol: "¥", goldBase: 360000, silverBase: 4290 },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = display;
    const startTime = performance.now();
    const duration = 1200;
    const animate = (t: number) => {
      const p = Math.min(1, (t - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (value - start) * eased);
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, inView]);

  return <span ref={ref}>{display.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>;
}

function Sparkline({ trend, color }: { trend: number[]; color: string }) {
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const range = max - min || 1;
  const points = trend
    .map((v, i) => `${(i / (trend.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-16 w-full">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,100 ${points} 100,100`}
        fill={`url(#grad-${color})`}
        stroke="none"
      />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

export function LivePrices() {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [gold, setGold] = useState(country.goldBase);
  const [silver, setSilver] = useState(country.silverBase);
  const [trendGold, setTrendGold] = useState<number[]>(() =>
    Array.from({ length: 24 }, () => country.goldBase * (0.99 + Math.random() * 0.02)),
  );
  const [trendSilver, setTrendSilver] = useState<number[]>(() =>
    Array.from({ length: 24 }, () => country.silverBase * (0.99 + Math.random() * 0.02)),
  );

  useEffect(() => {
    setGold(country.goldBase);
    setSilver(country.silverBase);
    setTrendGold(Array.from({ length: 24 }, () => country.goldBase * (0.99 + Math.random() * 0.02)));
    setTrendSilver(Array.from({ length: 24 }, () => country.silverBase * (0.99 + Math.random() * 0.02)));
  }, [country]);

  useEffect(() => {
    const id = setInterval(() => {
      setGold((g) => g * (0.998 + Math.random() * 0.004));
      setSilver((s) => s * (0.998 + Math.random() * 0.004));
      setTrendGold((t) => [...t.slice(1), gold]);
      setTrendSilver((t) => [...t.slice(1), silver]);
    }, 3000);
    return () => clearInterval(id);
  }, [gold, silver]);

  return (
    <section id="market" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.78_0.15_82/0.08),_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="mb-6 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.5em] text-[var(--gold)]">
            <span className="hairline" />
            Live Market
            <span className="hairline" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl">
            The Pulse of <span className="text-gold-gradient italic">Precious Metals</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground">
            Real-time spot pricing across global markets, refreshed every few seconds.
          </p>

          {/* Country selector */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c)}
                className={`px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.25em] transition-all duration-500 ${
                  country.code === c.code
                    ? "border border-[var(--gold)] bg-[oklch(0.78_0.15_82/0.1)] text-[var(--gold-light)] shadow-[var(--shadow-gold)]"
                    : "border border-[oklch(0.78_0.15_82/0.15)] text-muted-foreground hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }`}
              >
                {c.code} · {c.currency}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { label: "Gold", value: gold, trend: trendGold, color: "oklch(0.85 0.16 85)", unit: "/ oz" },
            { label: "Silver", value: silver, trend: trendSilver, color: "oklch(0.85 0.02 240)", unit: "/ oz" },
          ].map((metal, i) => (
            <motion.div
              key={metal.label}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className="luxury-card shimmer relative overflow-hidden p-10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
                    {country.name}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-foreground">{metal.label}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full animate-pulse"
                    style={{ background: metal.color, boxShadow: `0 0 12px ${metal.color}` }}
                  />
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                    Live
                  </span>
                </div>
              </div>

              <div className="mt-10 flex items-baseline gap-3">
                <span className="font-display text-5xl text-gold-gradient md:text-6xl">
                  {country.symbol}
                  <AnimatedNumber value={metal.value} />
                </span>
                <span className="text-xs text-muted-foreground">{metal.unit}</span>
              </div>

              <div className="mt-8">
                <Sparkline trend={metal.trend} color={metal.color} />
              </div>

              <div className="mt-6 flex justify-between text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                <span>24h</span>
                <span style={{ color: metal.color }}>
                  ▲ {((Math.random() * 1.5 + 0.1)).toFixed(2)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
