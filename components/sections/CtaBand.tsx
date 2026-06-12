import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="container-site relative flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <Reveal>
          <h2 className="display max-w-2xl text-2xl text-white sm:text-3xl lg:text-4xl">
            Do dimensionamento ao carimbo do CBMSC, ponta a ponta.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <WhatsAppCTA size="lg" />
        </Reveal>
      </div>
    </section>
  );
}
