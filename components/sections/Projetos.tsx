import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";
import { ProjectViewer } from "@/components/ProjectViewer";
import { SystemsList } from "@/components/SystemsList";
import { DetailGallery } from "@/components/DetailGallery";
import { projects } from "@/lib/site";

export function Projetos() {
  return (
    <Section id="projetos" variant="alt">
      <SectionHeader num="06" kicker="Casos" title="Da prancha ao carimbo">
        Projetamos a obra em BIM e desenhamos dentro dela a rede de segurança que
        ninguém vê. Alterne entre a arquitetura e o sistema preventivo de cada
        caso. Nomes e locais preservados.
      </SectionHeader>

      <div className="mt-16 flex flex-col gap-20 lg:gap-28">
        {projects.map((p, i) => {
          const imageRight = i % 2 === 1;
          return (
            <Reveal key={p.id}>
              <article className="grid items-start gap-x-10 gap-y-8 lg:grid-cols-2">
                {/* Visual column */}
                <div className={imageRight ? "lg:order-2" : "lg:order-1"}>
                  <ProjectViewer
                    arq={p.images.arq}
                    ppci={p.images.ppci}
                    alt={p.alt}
                    priority={i === 0}
                  />
                  <DetailGallery items={p.details} />
                </div>

                {/* Info column */}
                <div className={imageRight ? "lg:order-1" : "lg:order-2"}>
                  <p className="idx text-sm text-muted">
                    Projeto {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-2xl text-brand-deep">{p.name}</h3>

                  <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-5">
                    <div>
                      <dt className="kicker text-muted">Ocupação</dt>
                      <dd className="mt-1 text-brand-deep">{p.occupancy}</dd>
                    </div>
                    <div>
                      <dt className="kicker text-muted">Área de projeto</dt>
                      <dd className="mt-1 text-brand-deep">{p.area}</dd>
                    </div>
                    <div>
                      <dt className="kicker text-muted">Pavimentos</dt>
                      <dd className="mt-1 text-brand-deep">{p.floors}</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <SystemsList
                      highlight={p.systems.highlight}
                      rest={p.systems.rest}
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-8">
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
