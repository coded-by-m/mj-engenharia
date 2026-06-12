import { Hero } from "@/components/sections/Hero";
import { Especialidades } from "@/components/sections/Especialidades";
import { Solucoes } from "@/components/sections/Solucoes";
import { CtaBand } from "@/components/sections/CtaBand";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Segmentos } from "@/components/sections/Segmentos";
import { Sobre } from "@/components/sections/Sobre";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Faq } from "@/components/sections/Faq";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Contato } from "@/components/sections/Contato";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Especialidades />
      <Solucoes />
      <CtaBand />
      <ComoFunciona />
      <Segmentos />
      <Sobre />
      <Diferenciais />
      <Faq />
      <CtaFinal />
      <Contato />
    </main>
  );
}
