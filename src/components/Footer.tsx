import { GoldParticles } from "./GoldParticles";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[oklch(0.78_0.15_82/0.15)] pt-24 pb-10">
      <GoldParticles count={20} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl tracking-[0.3em] text-gold-gradient">AURUM</div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Maison Aurum. Crafting timeless treasures from the rarest stones
              and finest gold since 1887.
            </p>
            <div className="mt-8 flex items-center gap-4">
              {["IG", "FB", "TW", "PI"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center border border-[oklch(0.78_0.15_82/0.2)] text-[0.65rem] uppercase tracking-widest text-muted-foreground transition-all duration-500 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:shadow-[var(--shadow-gold)]"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Maison", links: ["Heritage", "Atelier", "Sustainability", "Press"] },
            { title: "Services", links: ["Private Viewing", "Bespoke", "Repair", "Appraisal"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.65rem] uppercase tracking-[0.4em] text-[var(--gold)]">
                {col.title}
              </h4>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-[var(--gold-light)]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-[oklch(0.78_0.15_82/0.1)] pt-8 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Maison Aurum · Place Vendôme, Paris</span>
          <span>Crafted with reverence</span>
        </div>
      </div>
    </footer>
  );
}
