import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { differentiators } from "@/lib/site";

export function Diferenciais() {
  return (
    <Section id="diferenciais" variant="navy">
      <SectionHeader
        num="05"
        kicker="Por que a MJ"
        title="Especialista, não generalista"
        inverse
      >
        Quem assina o projeto é quem atende. Sem terceirização, sem rodeio.
      </SectionHeader>

      <div className="mt-14 grid gap-x-14 gap-y-px sm:grid-cols-2">
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
