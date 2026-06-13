import { Section } from "@/components/Section";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Sobre() {
  return (
    <Section id="sobre" variant="light" space="loose">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-muted">
            <span className="idx text-sm text-accent">04</span>
            <span className="hairline w-10" />
            <span className="kicker">Sobre</span>
          </div>
          <Reveal delay={60}>
            <p className="display mt-6 text-2xl leading-snug text-brand-deep sm:text-3xl lg:text-[2.6rem]">
              A {site.name} nasce de uma ideia simples: projeto preventivo é
              engenharia, não papelada. Cada PPCI e cada SPDA sai dimensionado,
              documentado e{" "}
              <span className="text-accent">acompanhado até a aprovação</span>.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-muted">
              Conduzida pelo {site.legalLead}, com atuação dedicada à prevenção
              contra incêndio e à proteção contra descargas atmosféricas na{" "}
              {site.region}. Você fala direto com quem assina.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8">
              <WhatsAppCTA />
            </div>
          </Reveal>
        </div>

        {/* Credential spec block — typographic, no placeholder image */}
        <Reveal delay={120} className="lg:col-span-5 lg:justify-self-end">
          <dl className="w-full max-w-sm border-t border-line">
            {[
              ["Responsável técnico", site.legalLead],
              ["Registro profissional", site.crea],
              ["Atuação", site.region],
              ["Normas", "NBR 5419 · IN do CBMSC"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4"
              >
                <dt className="kicker text-muted">{k}</dt>
                <dd className="text-right text-sm font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
