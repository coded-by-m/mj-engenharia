/**
 * MJ Engenharia — central site configuration & content.
 * Single source of truth for copy, contacts and data.
 * Placeholders are flagged with TODO(CONTENT_PENDING) — see /docs/ai/CONTENT_PENDING.md.
 * Never invent real metrics, CREA, testimonials or contact data.
 */

export const site = {
  name: "MJ Engenharia",
  legalLead: "Eng. Civil Milton Chagas",
  crea: "CREA/SC [pendente]", // TODO(CONTENT_PENDING) CNT-002
  region: "Grande Florianópolis / SC",
  url: "https://mjengenharia.com.br",

  // TODO(CONTENT_PENDING) CNT-001 — replace with official number (digits only, with country+DDD, e.g. 5548999990000)
  whatsappNumber: "0000000000",
  whatsappDefaultMessage:
    "Olá! Vim pelo site e gostaria de falar com um engenheiro sobre um projeto.",

  // TODO(CONTENT_PENDING) CNT-009
  email: "[email pendente]",
  phone: "[telefone pendente]",

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
  { label: "Contato", href: "#contato" },
] as const;

export const CTA_LABEL = "Falar com um engenheiro";

/**
 * Flagship specialties (deep editorial blocks).
 * Imagery: illustrative stock (Unsplash), navy duotone — NOT client projects.
 * ppci: fire-protection valves/pumps (photo 1690973692388, Rose Galloway Green).
 * spda: lightning strike on a tower (photo 1681908113034, Timo Volz).
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
      "Dimensionamento e detalhamento do sistema de prevenção e proteção contra incêndio, do projeto à aprovação no CBMSC.",
    deliverables: [
      "Memorial e dimensionamento",
      "Pranchas e detalhamento técnico",
      "ART de projeto",
      "Acompanhamento até a aprovação",
    ],
  },
  {
    key: "spda",
    num: "02",
    tag: "SPDA",
    title: "Proteção contra Descargas Atmosféricas",
    icon: "ic-escudo", // TODO(CONTENT_PENDING) CNT-007 — dedicated SPDA icon
    image: "/img/spda.jpg",
    alt: "Raio atingindo o topo de um arranha-céu protegido por sistema de captação à noite.",
    description:
      "Sistema de proteção contra descargas atmosféricas conforme NBR 5419, do levantamento de risco ao projeto executivo.",
    deliverables: [
      "Avaliação de risco (NBR 5419)",
      "Projeto e detalhamento",
      "ART de projeto",
      "Adequação e acompanhamento",
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
    text: "Laudo técnico, AVCB e regularização (serviço complementar).",
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
