# MJ Engenharia

Landing page da **MJ Engenharia** — engenharia preventiva com foco em projetos de **PPCI** (Preventivo Contra Incêndio), na Grande Florianópolis/SC. Conversão via WhatsApp ("Falar com um engenheiro").

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19
- [Tailwind CSS v4](https://tailwindcss.com/)
- TypeScript
- [Lenis](https://lenis.darkroom.engineering/) (smooth scroll)
- Deploy: [Vercel](https://vercel.com/)

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
# porta ocupada? use: npm run dev -- -p 3100
```

Outros scripts: `npm run build` (build de produção), `npm run start` (servir o build).

## Estrutura

```
app/            # App Router (layout, página, estilos globais + design tokens)
components/     # Componentes de UI e seções (components/sections/)
lib/            # site.ts (conteúdo/config — fonte única) e whatsapp.ts
public/         # logos, ícones, favicons e imagens
docs/ai/        # documentação de arquitetura (discovery, design system, etc.)
```

## Conteúdo e configuração

Todo o conteúdo e contatos ficam centralizados em [`lib/site.ts`](lib/site.ts).
Itens pendentes (número de WhatsApp, CREA, endereço, fotos reais de projetos)
estão marcados com `TODO(CONTENT_PENDING)` e documentados em
[`docs/ai/CONTENT_PENDING.md`](docs/ai/CONTENT_PENDING.md).

> As imagens das especialidades são **ilustrativas** (Unsplash, sem atribuição
> exigida), não são projetos do cliente.

## Documentação

Decisões de arquitetura e design em [`docs/ai/`](docs/ai/) — começe por
[`MASTER_CONTEXT.md`](docs/ai/MASTER_CONTEXT.md) e [`DECISIONS_LOG.md`](docs/ai/DECISIONS_LOG.md).
