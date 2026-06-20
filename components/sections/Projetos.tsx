import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";
import { ProjectShowcase } from "@/components/ProjectShowcase";
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
        {projects.map((p, i) => (
          <Reveal key={p.id}>
            <ProjectShowcase project={p} index={i} />
          </Reveal>
        ))}
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
