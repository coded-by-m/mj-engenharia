import { Section } from "@/components/Section";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function CtaFinal() {
  const instagram = site.social.instagram;
  return (
    <Section variant="navy" space="tight">
      <Reveal>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display display-lg max-w-2xl text-white">
            Seu projeto começa com uma{" "}
            <span className="text-accent">conversa</span>.
          </h2>
          <div className="flex shrink-0 flex-col items-start gap-4">
            <WhatsAppCTA size="lg" />
            {instagram && instagram !== "#" && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="kicker text-grey-200/70 underline-offset-4 hover:text-white hover:underline"
              >
                Instagram ↗
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
