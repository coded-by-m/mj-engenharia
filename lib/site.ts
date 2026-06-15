/**
 * MJ Engenharia — central site configuration & content.
 * Single source of truth for copy, contacts and data.
 * Placeholders are flagged with TODO(CONTENT_PENDING) — see /docs/ai/CONTENT_PENDING.md.
 * Never invent real metrics, CREA, testimonials or contact data.
 */

export const site = {
  name: "MJ Engenharia Preventiva",
  legalLead: "Eng. Civil Milton Chagas",
  crea: "CREA/SC 173.926-0",
  cnpj: "50.770.976/0001-11",
  region: "Grande Florianópolis / SC",
  url: "https://mj.eng.br",

  // Confirmed credentials (client-provided 2026-06-15)
  metrics: {
    projects: "+100 trabalhos",
    area: "+200 mil m²",
    method: "Projetos em BIM",
  },

  whatsappNumber: "5548999899681",
  whatsappDefaultMessage:
    "Olá! Vim pelo site e gostaria de falar com um engenheiro sobre um projeto.",

  email: "contato@mj.eng.br",
  phone: "+55 (48) 99989-9681",

  // TODO(CONTENT_PENDING) CNT-008 — confirm URLs
  social: {
    instagram: "#",
    linkedin: "",
    youtube: "",
  },

  // TODO(CONTENT_PENDING) CNT-003
  address: "Grande Florianópolis / SC",
} as const;

export const nav = [
  { label: "Especialidades", href: "#especialidades" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
] as const;

export const CTA_LABEL = "Falar com um engenheiro";

/**
 * Flagship specialties (deep editorial blocks).
 * Imagery: illustrative stock (Unsplash), navy duotone — NOT client projects.
 * ppci: fire-protection valves/pumps (photo 1690973692388, Rose Galloway Green).
 */
export const specialties = [
  {
    key: "ppci",
    num: "01",
    tag: "PPCI",
    title: "Preventivo contra Incêndio",
    icon: "ic-incendio",
    image: "/img/ppci.jpg",
    alt: "Sala de bombas de um sistema de combate a incêndio, com tubulação e válvulas vermelhas.",
    description:
      "Análise da concepção original, dimensionamento e regularização de obras existentes. Elaboramos projetos, laudos e vistorias para aprovação e emissão de Habite-se e Funcionamento no CBMSC.",
    deliverables: [
      "Análise da concepção original da arquitetura",
      "Memorial e dimensionamento",
      "Pranchas e detalhamento técnico",
      "ART de projeto",
      "Aprovação do projeto",
      "Emissão do Atestado de Habite-se",
      "Emissão de Atestado de Funcionamento",
      "Regularização de imóveis existentes",
      "Consultoria técnica",
    ],
  },
] as const;

/** Full service grid (brand linear icons). */
export const services = [
  {
    icon: "ic-projeto",
    title: "Projeto de PPCI",
    text: "Prevenção e proteção contra incêndio, com aprovação no CBMSC.",
  },
  {
    icon: "ic-escudo",
    title: "Projeto de SPDA",
    text: "Proteção contra descargas atmosféricas conforme NBR 5419.",
  },
  {
    icon: "ic-sprinkler",
    title: "Sprinklers",
    text: "Dimensionamento de chuveiros automáticos e rede hidráulica.",
  },
  {
    icon: "ic-extintor",
    title: "Extintores e hidrantes",
    text: "Especificação e distribuição conforme norma.",
  },
  {
    icon: "ic-rota-fuga",
    title: "Rotas de fuga",
    text: "Saídas de emergência, sinalização e iluminação.",
  },
  {
    icon: "ic-consultoria",
    title: "Consultoria técnica",
    text: "Orientação especializada em segurança preventiva.",
  },
  {
    icon: "ic-laudo",
    title: "Laudos e regularização",
    text: "Laudo técnico, Atestado de Habite-se, Atestado de Funcionamento e regularização (serviço complementar).",
  },
] as const;

/**
 * Completed projects — track record. Anonymized: no client name or city
 * (DEC: anonimizar). Each entry renders a duotone prancha when `image` is set,
 * otherwise an engineering-blueprint placeholder keyed by `icon`.
 *
 * TODO(CONTENT_PENDING) CNT-010 — confirm real metrics (ano, porte, resultado)
 * with the client. Values below are realistic placeholders. Project 01 has real
 * drawings: save them to /public/img/projetos/projeto-01-ppci.jpg and set
 * `image` to that path (duotone navy is applied in CSS).
 */
export const projects = [
  {
    tag: "PPCI",
    segment: "Edifício comercial",
    icon: "ic-empresa",
    year: "2024",
    size: "4.200 m²",
    result: "Aprovado no CBMSC",
    image: null as string | null,
    alt: "Prancha técnica de PPCI: central de gás, rede de hidrantes e detalhamento de sinalização de emergência.",
  },
  {
    tag: "SPDA",
    segment: "Galpão industrial",
    icon: "ic-galpao",
    year: "2023",
    size: "9.800 m²",
    result: "Projeto executivo entregue",
    image: null as string | null,
    alt: "",
  },
  {
    tag: "PPCI",
    segment: "Condomínio residencial",
    icon: "ic-condominio",
    year: "2024",
    size: "6.500 m²",
    result: "Aprovado no CBMSC",
    image: null as string | null,
    alt: "",
  },
  {
    tag: "PPCI + SPDA",
    segment: "Centro logístico",
    icon: "ic-projeto",
    year: "2023",
    size: "12.000 m²",
    result: "Aprovado no CBMSC",
    image: null as string | null,
    alt: "",
  },
] as const;

/** Audience segments. */
export const segments = [
  {
    icon: "ic-galpao",
    title: "Indústria e galpões",
    text: "Projetos preventivos para operações industriais e logísticas.",
  },
  {
    icon: "ic-condominio",
    title: "Condomínios",
    text: "Adequação e regularização de edifícios e condomínios.",
  },
  {
    icon: "ic-empresa",
    title: "Comércio",
    text: "Lojas e estabelecimentos comerciais em conformidade.",
  },
  {
    icon: "ic-projeto",
    title: "Construtoras",
    text: "Projetos preventivos integrados a novas obras.",
  },
] as const;

/** Differentiators. */
export const differentiators = [
  {
    icon: "ic-consultoria",
    title: "Atendimento direto com engenheiro",
    text: "Você fala com quem assina o projeto, sem intermediários.",
  },
  {
    icon: "ic-laudo",
    title: "Rigor técnico e normativo",
    text: "Projetos conforme normas e exigências do CBMSC.",
  },
  {
    icon: "ic-escudo",
    title: "Soluções completas",
    text: "Do diagnóstico ao acompanhamento da aprovação.",
  },
  {
    icon: "ic-projeto",
    title: "Compromisso com prazos",
    text: "Entregas organizadas e previsíveis.",
  },
  {
    icon: "ic-empresa",
    title: "Atuação regional",
    text: "Atendimento em toda a Grande Florianópolis.",
  },
] as const;

/** How it works. */
export const steps = [
  { n: "01", title: "Diagnóstico", text: "Entendimento do imóvel e das exigências aplicáveis." },
  { n: "02", title: "Projeto e dimensionamento", text: "Desenvolvimento técnico da solução preventiva." },
  { n: "03", title: "ART e pranchas", text: "Documentação e responsabilidade técnica." },
  { n: "04", title: "Aprovação e acompanhamento", text: "Submissão ao CBMSC e suporte até a aprovação." },
] as const;

/** FAQ. */
export const faq = [
  {
    q: "Qual a diferença entre PPCI e SPDA?",
    a: "PPCI é o projeto de prevenção e proteção contra incêndio; SPDA é o sistema de proteção contra descargas atmosféricas (para-raios), conforme a NBR 5419. Atuamos nos dois.",
  },
  {
    q: "Vocês acompanham até a aprovação no CBMSC?",
    a: "Sim. O escopo vai do dimensionamento ao acompanhamento da análise até a aprovação.",
  },
  {
    q: "O projeto é assinado por engenheiro?",
    a: "Sim, com ART e responsabilidade técnica do engenheiro responsável.",
  },
  {
    q: "Qual o prazo de um projeto?",
    a: "Depende do porte e da complexidade do imóvel. Fale com um engenheiro para uma estimativa.",
  },
] as const;

export type IconName = string;
