import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";
import { ProjectCompare } from "@/components/ProjectCompare";
import { SystemsList } from "@/components/SystemsList";
import { DetailGallery } from "@/components/DetailGallery";
import { projects } from "@/lib/site";

export function Projetos() {
  return (
    <Section id="projetos" variant="alt">
      <SectionHeader num="06" kicker="Casos" title="Da prancha ao carimbo">
        Projetamos a obra em BIM e desenhamos dentro dela a rede de segurança que
        ninguém vê. Arraste a barra para revelar o sistema preventivo dentro de
        cada projeto. Nomes e locais preservados.
      </SectionHeader>

      <div className="mt-16 flex flex-col gap-16 lg:gap-24">
        {projects.map((p, i) => {
          const imageRight = i % 2 === 1;
          return (
            <Reveal key={p.id}>
              <article className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
                {/* Visual column — the star, gets the wider track */}
                <div
                  className={`lg:col-span-7 ${imageRight ? "lg:order-2" : "lg:order-1"}`}
                >
                  <ProjectCompare
                    before={p.images.arq}
                    after={p.images.xray}
                    alt={{ before: p.alt.arq, after: p.alt.ppci }}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority={i === 0}
                  />
                </div>

                {/* Info column — stretches to viewer height; detail strip
                    anchors the bottom so there's no dead space below the text */}
                <div
                  className={`flex h-full flex-col justify-between gap-10 lg:col-span-5 ${
                    imageRight ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <p className="idx text-sm text-muted">
                      Projeto {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-2xl text-brand-deep lg:text-[1.75rem]">
                      {p.name}
                    </h3>

                    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6">
                      <div className="col-span-2">
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

                  <DetailGallery items={p.details} />
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
