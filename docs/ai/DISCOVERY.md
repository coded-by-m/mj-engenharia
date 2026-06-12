# Project Discovery

## Status
Aprovado — arquitetura validada, pronto para implementação.

## Identification
- Client: MJ Engenharia — Eng. Civil Milton Chagas
- Project type: Landing page (página única) institucional/conversão
- Started at: 2026-06-11
- Recommended mode: New Project (do zero) — Next.js + Tailwind

## Contexto do negócio
- Empresa de **engenharia preventiva** com foco em **projetos**.
- Carro-chefe: **Projeto de Preventivo Contra Incêndio (PPCI)** e **Projeto de SPDA** (proteção contra descargas atmosféricas).
- Atuação: **Grande Florianópolis / SC**.
- Responsável técnico: **Eng. Civil Milton Chagas** (CREA a confirmar).
- Serviços complementares: sprinkler, extintores, rota de fuga, consultoria e (secundário) laudo / regularização / AVCB.

## Confirmed Decisions
1. **Tipo:** landing page única, narrativa vertical.
2. **Objetivo:** conversão para **WhatsApp** ("Falar com um engenheiro").
3. **Posicionamento:** foco em **fazer projetos** (PPCI + SPDA), NÃO em medo legal/multa/interdição. Tom = competência técnica e entrega.
4. **Público:** Empresas/indústria, Síndicos/condomínios, Comércio local, Construtoras (4 segmentos).
5. **Nível visual:** premium e refinado.
6. **Stack:** Next.js (App Router) + Tailwind, deploy Vercel.
7. **Conversão principal:** WhatsApp direto (botão flutuante + CTAs `wa.me` com mensagem pré-preenchida). Formulário como via secundária.
8. **Base de estrutura:** site de referência https://brandventuraengenharia.com.br/ — adotar o esqueleto que funciona, elevar UI/UX, especializar (PPCI/SPDA no centro).
9. **Design system:** derivado do Manual de Identidade Visual fornecido (cores, tipografia, ícones).

## Identidade visual (fonte: Manual fornecido)
- Pasta-fonte: `C:\Users\Matheus\Claude\Projects\MJ Engenharia\Identidade Visual`
- Cores:
  - Azul Institucional `#073B4C`
  - Azul Profundo `#0B2A36`
  - Vermelho Sinalização `#D62828`
  - Vermelho Profundo `#A81E1E`
  - Cinza Névoa `#F4F6F7`
  - Cinza Claro `#E2E7EA`
  - Cinza Médio `#5A6B72`
  - Cinza Grafite `#2B3A40`
- Tipografia (Google Fonts): Montserrat (títulos), Inter (texto), Barlow Condensed (técnico).
- Logos (SVG/PNG): vertical, horizontal, símbolo, assinatura técnica, monocromática (pos/neg).
- 12 ícones lineares: PPCI/incêndio, extintor, escudo, sprinkler, rota de fuga, projeto, laudo, consultoria, empresa, galpão, condomínio, regularização.
- Avatar, favicons, templates sociais e assinatura de e-mail disponíveis.
- CTA da marca: **"Falar com um engenheiro"**.

## Open Questions
- Número de WhatsApp oficial (referência tinha placeholder).
- Número CREA do Eng. Milton Chagas.
- Endereço/área de atuação para Localização + Schema.org.
- Métricas de prova (anos de atuação, nº de projetos/clientes).
- Fotos reais de projetos executados.
- Depoimentos de clientes.

## Suggested Research
- Termos de busca locais PPCI/SPDA/AVCB + "Grande Florianópolis" para SEO (a validar na fase de conteúdo).

## Change History
- 2026-06-11: Discovery concluído, triagem + arquitetura aprovadas. Reposicionamento de "medo legal" → "foco em projetos PPCI/SPDA". Estrutura baseada em brandventuraengenharia.com.br com UI/UX elevada.
