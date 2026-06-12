import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/site";

export function Solucoes() {
  return (
    <Section id="solucoes" variant="alt">
      <SectionHeader
        num="02"
        kicker="Soluções"
        title="O escopo técnico, por inteiro"
      >
        Além de PPCI e SPDA, todo o sistema preventivo dimensionado e
        documentado.
      </SectionHeader>

      {/* Engineering index — numbered rows with hairlines, not a card grid */}
      <ol className="mt-14 border-t border-line">
        {services.map((s, i) => (
          <Reveal key={s.title} as="li">
            <div className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-line py-6 transition-colors hover:bg-surface sm:grid-cols-[3rem_14rem_1fr] sm:gap-x-8 sm:px-2">
              <span className="idx text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-start-2 flex items-center gap-3 text-lg text-brand-deep sm:col-start-2">
                <span className="text-brand transition-colors group-hover:text-accent">
                  <Icon name={s.icon} size={22} />
                </span>
                {s.title}
              </h3>
              <p className="col-span-2 mt-1 text-sm text-muted sm:col-span-1 sm:col-start-3 sm:mt-0">
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
