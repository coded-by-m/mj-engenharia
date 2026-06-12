import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { steps } from "@/lib/site";

export function ComoFunciona() {
  return (
    <Section id="processo" variant="light">
      <SectionHeader
        num="03"
        kicker="Processo"
        title="Do diagnóstico ao carimbo de aprovação"
      >
        Quatro etapas, sem caixa-preta. Você acompanha cada uma.
      </SectionHeader>

      <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 80} as="li">
            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="display text-5xl text-brand-deep/15">
                  {step.n}
                </span>
                <span className="hairline flex-1 text-line" />
                <span className="h-2 w-2 rounded-full bg-accent" />
              </div>
              <h3 className="mt-5 text-lg text-brand-deep">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
