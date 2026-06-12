import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-drench text-white">
      {/* Engineering coordinate grid — voice, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 6vw, 88px) clamp(48px, 6vw, 88px)",
        }}
      />
      {/* Single red signal sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-px w-1/2 bg-accent/60"
      />

      <div className="container-site relative pb-20 pt-40 sm:pt-48 lg:pb-28 lg:pt-56">
        {/* technical readout line */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/55">
            <span className="idx text-xs text-accent">00</span>
            <span className="hairline w-8" />
            <span className="kicker">Engenharia preventiva</span>
            <span className="kicker">· {site.region}</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display display-xl mt-7 max-w-[14ch] text-white">
            Projetos que{" "}
            <span className="text-accent">passam na primeira análise</span>.
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={160} className="lg:col-span-7">
            <p className="max-w-xl text-lg leading-relaxed text-grey-200/85 sm:text-xl">
              Projetos de PPCI e SPDA com assinatura de responsável técnico, do
              dimensionamento à aprovação no CBMSC. Engenharia que resolve, não
              que empurra.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <WhatsAppCTA size="lg" />
              <a
                href="#especialidades"
                className="kicker border-b border-white/30 pb-1 text-white/80 transition-colors hover:border-accent hover:text-white"
              >
                Ver especialidades →
              </a>
            </div>
          </Reveal>

          {/* Inline technical signature — replaces the generic seal card */}
          <Reveal delay={240} className="lg:col-span-5 lg:justify-self-end">
            <div className="flex gap-6 border-t border-white/15 pt-5 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
              <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <dt className="kicker text-white/45">Resp. técnico</dt>
                  <dd className="mt-1 text-white">{site.legalLead}</dd>
                </div>
                <div>
                  <dt className="kicker text-white/45">Registro</dt>
                  <dd className="mt-1 text-white">{site.crea}</dd>
                </div>
                <div>
                  <dt className="kicker text-white/45">Norma SPDA</dt>
                  <dd className="mt-1 text-white">NBR 5419</dd>
                </div>
                <div>
                  <dt className="kicker text-white/45">Aprovação</dt>
                  <dd className="mt-1 text-white">CBMSC</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
