import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { differentiators } from "@/lib/site";

export function Diferenciais() {
  return (
    <Section id="diferenciais" variant="navy">
      {/* Asymmetric peak header — breaks the uniform stacked SectionHeader
          grammar while keeping the dossier index (05). */}
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-white/60">
              <span className="idx text-sm text-accent">06</span>
              <span className="hairline w-10" />
              <span className="kicker">Por que a MJ</span>
            </div>
            <h2 className="display display-xl mt-5 text-white">
              Especialista, não generalista.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-grey-200/80 lg:col-span-5 lg:pb-3">
            Quem assina o projeto é quem atende. Sem terceirização, sem rodeio.
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-x-14 gap-y-px sm:grid-cols-2">
        {differentiators.map((d, i) => (
          <Reveal key={d.title} delay={(i % 2) * 90}>
            <div className="group flex gap-5 border-t border-white/12 py-7">
              <span className="idx pt-1 text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display text-xl text-white sm:text-2xl">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grey-200/75">
                  {d.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
