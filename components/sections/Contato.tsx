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
          <SectionHeader num="09" kicker="Contato" title="Fale com um engenheiro">
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

          {/* Área de atuação — self-hosted region map (no third-party JS or
              cookies; LGPD-safe). Official IBGE outline of the Grande
              Florianópolis mesoregion, recolored to brand navy over a faint
              technical dot grid. Reinforces the "Atuação" credential without
              restating it. Exact office address is still CNT-003. */}
          <Reveal delay={220}>
            <figure className="mt-8 overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface-alt">
              <div
                className="relative flex aspect-[16/9] w-full items-center justify-center p-8 sm:p-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-brand) 10%, transparent) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/area-grande-florianopolis.svg"
                  alt={`Mapa da área de atuação: ${site.region}`}
                  loading="lazy"
                  width={300}
                  height={247}
                  className="max-h-full w-auto drop-shadow-sm"
                />
                <span className="kicker absolute bottom-3 left-4 flex items-center gap-2 text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Mesorregião · fonte IBGE
                </span>
              </div>
            </figure>
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
