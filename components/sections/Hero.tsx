import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { site } from "@/lib/site";
import { SketchSceneView } from "./SketchScene";
import { scene } from "./hero-scenes/rua.generated";

const credentials = [
  ["Responsável técnico", site.legalLead],
  ["Registro", site.crea],
  ["Histórico", site.metrics.projects],
  ["Área projetada", site.metrics.area],
] as const;

export function Hero() {
  return (
    <section
      data-cm-section="hero"
      className="relative isolate overflow-hidden bg-brand-drench text-white"
    >
      {/* Background at every size: the drawing sits behind the copy. */}
      <SketchSceneView scene={scene} className="hero-scene absolute inset-0 -z-10 overflow-hidden" />
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

      <div className="container-site relative grid pb-16 pt-28 sm:pt-32 lg:min-h-[min(100svh,54rem)] lg:grid-cols-12 lg:content-end lg:items-end lg:gap-x-10 lg:pb-20">
        <div className="lg:col-span-7">
          {/* technical readout line */}
          <div className="hero-rise flex items-center gap-x-4 text-white/55">
            <span aria-hidden className="idx hidden text-xs sm:inline">
              00
            </span>
            <span aria-hidden className="hairline hidden w-8 sm:block" />
            <span className="kicker">PPCI · {site.region}</span>
          </div>

          <h1
            className="hero-rise display display-hero mt-6 max-w-[14ch] text-white"
            style={{ animationDelay: "80ms" }}
          >
            Projetos que passam na primeira análise.
          </h1>

          <div className="hero-rise mt-6" style={{ animationDelay: "160ms" }}>
            <p className="max-w-xl text-base leading-relaxed text-grey-200/85 sm:text-lg lg:text-xl">
              Projetos e adequações de PPCI, com ART, para indústrias,
              condomínios, comércio e construtoras: máxima conformidade
              normativa com o menor custo de obra. Engenharia que resolve.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1">
              <WhatsAppCTA size="lg" className="w-full sm:w-auto" cmId="hero-whatsapp" />
              <a
                href="#especialidades"
                data-cm-role="secondary-cta"
                data-cm-id="hero-specialties"
                className="group kicker inline-flex min-h-11 items-center text-white/80 transition-colors hover:text-white"
              >
                <span className="border-b border-white/30 pb-1 transition-colors group-hover:border-accent">
                  Ver especialidades →
                </span>
              </a>
            </div>
          </div>
        </div>

        <div
          className="hero-rise mt-10 lg:col-span-5 lg:mt-0 xl:col-span-4 xl:col-start-9"
          style={{ animationDelay: "240ms" }}
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-5 text-sm">
            {credentials.map(([term, value]) => (
              <div key={term}>
                <dt className="kicker text-white/60">{term}</dt>
                <dd className="mt-1 text-white">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs text-white/70">
            Desenho ilustrativo. Em vermelho, a rede de prevenção contra incêndio.
          </p>
        </div>
      </div>
    </section>
  );
}
