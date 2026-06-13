import Image from "next/image";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Icon } from "@/components/Icon";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site";

/**
 * Engineering-blueprint placeholder for projects without a real drawing yet.
 * Reuses the navy coordinate-grid motif as a deliberate "drawing pending"
 * state — reads as intentional, not broken. Keyed by the segment icon.
 */
function Blueprint({ icon }: { icon: string }) {
  return (
    <div className="absolute inset-0 bg-brand-drench">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white/15">
        <Icon name={icon} size={72} />
      </div>
    </div>
  );
}

// Asymmetric bento rhythm: 7/5 then 5/7, so no two rows read identically.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function Projetos() {
  return (
    <Section id="projetos" variant="alt">
      <SectionHeader num="06" kicker="Casos" title="Da prancha ao carimbo">
        Uma amostra de projetos preventivos já entregues. Nomes e locais
        preservados.
      </SectionHeader>

      <div className="mt-14 grid gap-x-8 gap-y-12 lg:grid-cols-12">
        {projects.map((p, i) => (
          <Reveal
            key={p.segment}
            delay={(i % 2) * 90}
            className={spans[i % spans.length]}
          >
            <article className="group">
              <div className="duotone relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-line">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <Blueprint icon={p.icon} />
                )}
                <span className="kicker absolute left-4 top-3 z-10 text-white/85">
                  {p.tag}
                </span>
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-4">
                <h3 className="text-lg text-brand-deep transition-colors group-hover:text-accent">
                  {p.segment}
                </h3>
                <span className="idx text-sm text-muted">{p.year}</span>
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                <span>{p.size}</span>
                <span aria-hidden className="text-line">
                  ·
                </span>
                <span>{p.result}</span>
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-8">
          <p className="max-w-md text-muted">
            Tem um caso parecido? Veja como ficaria o projeto do seu imóvel.
          </p>
          <WhatsAppCTA
            label="Falar sobre um projeto como o seu"
            message="Olá! Vi os projetos no site e gostaria de falar sobre um caso parecido com o meu."
            variant="secondary"
          />
        </div>
      </Reveal>
    </Section>
  );
}
