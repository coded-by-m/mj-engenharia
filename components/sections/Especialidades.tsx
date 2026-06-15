import Image from "next/image";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";
import { specialties } from "@/lib/site";

export function Especialidades() {
  return (
    <Section id="especialidades" variant="light" space="loose">
      <SectionHeader
        num="01"
        kicker="Especialidade"
        title="Uma frente, uma assinatura técnica"
      >
        Foco em projeto. PPCI é o centro do trabalho, não um item de lista.
      </SectionHeader>

      <div className="mt-16 space-y-20 lg:space-y-28">
        {specialties.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={s.key}>
              <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                {/* Image */}
                <div
                  className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}
                >
                  <div className="duotone relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span className="idx absolute left-5 top-4 z-10 text-5xl font-bold text-white/90 sm:text-6xl">
                      {s.num}
                    </span>
                    <span className="kicker absolute bottom-4 left-5 z-10 text-white/85">
                      {s.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
                  <h3 className="display text-3xl text-brand-deep sm:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-muted">{s.description}</p>

                  <ul className="mt-7 max-w-md">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-baseline gap-4 border-t border-line py-3 text-sm text-ink last:border-b"
                      >
                        <span className="idx text-xs text-accent">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <WhatsAppCTA
                      label={`Falar sobre ${s.tag}`}
                      message={`Olá! Gostaria de falar sobre um projeto de ${s.tag}.`}
                      variant="secondary"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
