import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { segments } from "@/lib/site";

export function Segmentos() {
  return (
    <Section id="segmentos" variant="alt" space="tight">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 text-muted">
          <span className="idx text-sm text-accent">04</span>
          <span className="hairline w-10" />
          <span className="kicker">Onde atuamos</span>
        </div>
        <h2 className="display display-lg mt-5 max-w-xl text-brand-deep">
          Atende quem precisa{" "}
          <span className="text-accent">aprovar de verdade</span>.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {segments.map((seg, i) => (
          <Reveal key={seg.title} delay={(i % 4) * 70}>
            <div className="group flex h-full flex-col gap-4 py-8 sm:border-l sm:border-line sm:px-7 sm:first:border-l-0 lg:first:border-l-0">
              <span className="text-brand transition-colors group-hover:text-accent">
                <Icon name={seg.icon} size={32} />
              </span>
              <h3 className="text-lg text-brand-deep">{seg.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{seg.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
