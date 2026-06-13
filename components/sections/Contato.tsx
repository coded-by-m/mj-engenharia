import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Contato() {
  return (
    <Section id="contato" variant="alt">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeader num="08" kicker="Contato" title="Fale com um engenheiro">
            Prefere conversar agora? Chame no WhatsApp. Ou envie seus dados pelo
            formulário.
          </SectionHeader>

          <Reveal delay={100}>
            <div className="mt-6">
              <WhatsAppCTA size="lg" />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <dl className="mt-10 space-y-4 text-sm">
              <div>
                <dt className="font-condensed uppercase tracking-wider text-grey-500">
                  Atuação
                </dt>
                <dd className="mt-1 text-ink">{site.region}</dd>
              </div>
              <div>
                <dt className="font-condensed uppercase tracking-wider text-grey-500">
                  Responsável técnico
                </dt>
                <dd className="mt-1 text-ink">
                  {site.legalLead} · {site.crea}
                </dd>
              </div>
              <div>
                <dt className="font-condensed uppercase tracking-wider text-grey-500">
                  E-mail
                </dt>
                <dd className="mt-1 text-ink">{site.email}</dd>
              </div>
            </dl>
          </Reveal>

          {/* Map placeholder — CNT-003 (real address / embed) */}
          <Reveal delay={220}>
            <div className="mt-8 flex aspect-[16/9] items-center justify-center rounded-[var(--radius-md)] border border-dashed border-line bg-surface text-sm text-muted">
              Mapa da área de atuação — a definir
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8">
            <h3 className="text-xl text-brand-deep">Solicitar contato</h3>
            <p className="mt-1 text-sm text-muted">
              Responderemos pelo WhatsApp.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
