# Plano de Google Ads — MJ Engenharia

> Escopo: tráfego pago no Google (Rede de Pesquisa) para mj.eng.br, com foco em custo x benefício.
> Data: 2026-10-09. Números de CPC e taxas são **estimativas de mercado a validar** no Planejador de Palavras-chave e nos primeiros 30 dias. O ticket médio e a margem precisam ser confirmados com o cliente. Não use valores daqui como fatos do cliente.

---

## 1. Resumo

| Item | Recomendação |
|---|---|
| Canal | Só a **Rede de Pesquisa** no início. Sem Display, sem Performance Max, sem YouTube. |
| Verba de teste | **R$ 1.500 a R$ 2.000/mês** (R$ 50 a R$ 65/dia) por 90 dias. |
| Região | Grande Florianópolis, segmentando por **presença** (quem está na região). |
| Conversão principal | Clique no WhatsApp. Conversões secundárias: envio do formulário e clique para ligar. |
| Lance | Começa com Maximizar cliques (CPC máx. R$ 8). Muda para Maximizar conversões quando passar de 15 conversões/mês. |
| Bloqueio | **Hoje o site não manda conversões para o GA4 nem para o Google Ads** (seção 2). Isso precisa ser resolvido antes de gastar qualquer real. |

Por que só Pesquisa: PPCI é uma demanda que nasce de uma necessidade concreta (Habite-se, alvará, vistoria, obra nova). Quem tem essa necessidade pesquisa no Google. Display e PMax gastam a verba com público frio e trazem pouco lead para um serviço técnico B2B de nicho.

---

## 2. Pré-requisitos (antes de ligar a campanha)

### 2.1 Rastreamento de conversão (bloqueante)
Situação atual do código:
- O GA4 (`G-3TSX7WG8GY`) está instalado em `app/layout.tsx` e registra só pageviews.
- Os CTAs de WhatsApp (`components/WhatsAppCTA.tsx`, `FloatingWhatsApp.tsx`) têm só `data-cm-role="whatsapp"` para o Coded Insights e **não disparam evento no gtag**.
- O formulário (`ContactForm.tsx`) também não dispara evento.

O que precisa ser feito:
1. Disparar `gtag('event', 'whatsapp_click', { placement })` em todo CTA de WhatsApp. O `placement` sai do `cmId` e indica de onde veio o clique (hero, faixa, flutuante etc.).
2. Disparar `gtag('event', 'generate_lead')` quando o formulário for enviado com sucesso.
3. Criar a conta do Google Ads e vincular ao GA4. Depois, importar `whatsapp_click` e `generate_lead` como conversões, ou usar a tag de conversão nativa do Ads.
4. Ativar o **Consent Mode v2** com um banner de cookies simples, por causa da LGPD e da exigência do Google para remarketing e medição.
5. Ativar a **auto-tagging (gclid)** no Ads.

### 2.2 Saber qual lead veio do anúncio
No WhatsApp não dá para levar o gclid até a venda. A saída mais simples:
- Quando a URL tiver `gclid` ou `utm_source=google`, o site troca a mensagem pré-preenchida para algo como *"Olá! Vi o anúncio no Google e gostaria de falar com um engenheiro…"*.
- O cliente anota numa planilha **cada conversa que veio do Google** com: data, tipo de imóvel, se foi qualificada, se virou orçamento, se fechou e o valor.

Sem essa planilha, não tem como calcular o custo x benefício real. Só daria para medir cliques.

### 2.3 Google Perfil da Empresa
Criar ou verificar o perfil (área de atendimento: Grande Florianópolis) e vincular ao Ads como **recurso de local**. Também ajuda no SEO local, que é gratuito.

### 2.4 Atendimento
O ROI depende de **responder rápido no WhatsApp**. Uma conversa paga que demora horas para ter resposta vira dinheiro perdido. Meta: responder em até 15 minutos no horário comercial. A programação dos anúncios (seção 4) segue esse horário.

---

## 3. Estrutura de campanhas

A verba fica concentrada numa campanha só, com 3 grupos de anúncios. Com R$ 1.500 a R$ 2.000/mês, dividir em várias campanhas deixa cada uma sem dados suficientes.

**Campanha: Pesquisa | PPCI | Grande Floripa**

| Grupo | Intenção | Palavras-chave (frase ou exata) | Peso |
|---|---|---|---|
| **A. Projeto PPCI** | Quer contratar o projeto | "projeto ppci", "projeto ppci florianópolis", "ppci são josé", "ppci palhoça", "engenheiro ppci", "projeto preventivo de incêndio", "projeto preventivo bombeiros sc", "projeto de incêndio florianópolis" | ~50% |
| **B. Regularização / Atestados** | Precisa aprovar ou regularizar o imóvel (intenção mais urgente) | "regularização bombeiros", "atestado de habite-se bombeiros", "atestado de funcionamento bombeiros", "aprovação cbmsc", "regularizar imóvel bombeiros", "vistoria bombeiros florianópolis", "avcb florianópolis" | ~35% |
| **C. Construtoras / Arquitetos** | Contratante B2B (projeto complementar) | "projeto complementar incêndio", "projetista ppci", "projeto de sprinkler", "projeto hidrantes", "empresa de ppci" | ~15% |

Observação: **"AVCB"** é o termo de SP. Em SC o nome é Atestado, mas muita gente ainda pesquisa "AVCB". Vale testar com lance menor e cortar se não converter.

### Palavras-chave negativas (nível da conta)
`curso, cursos, concurso, vaga, vagas, emprego, salário, apostila, pdf, grátis, gratuito, modelo, exemplo, download, norma, nbr, it cbmsc pdf, o que é, significado, como fazer, recarga, extintor preço, comprar extintor, brigada, treinamento, faculdade, tcc, sp, são paulo, porto alegre, curitiba`

Revisar o **relatório de termos de pesquisa toda semana** e negativar o que não for intenção de contratação. Esse é o maior ganho de custo x benefício da conta.

---

## 4. Configurações

| Configuração | Valor |
|---|---|
| Redes | Só Pesquisa. **Desmarcar** Parceiros de pesquisa e Rede de Display. |
| Local | Florianópolis, São José, Palhoça, Biguaçu, Santo Amaro da Imperatriz, Governador Celso Ramos, Antônio Carlos. Opção: **"Presença: pessoas no local ou que costumam estar nele"** (não usar "interesse"). |
| Idioma | Português |
| Programação | Seg a sex das 7h30 às 19h; sáb das 8h às 12h. Ajustar ao horário real em que o cliente responde. |
| Dispositivos | Todos. Acompanhar o celular, que deve ser a maior parte do tráfego. |
| Lance (semanas 1 a 4) | Maximizar cliques, CPC máx. R$ 8 |
| Lance (a partir de ~15 a 30 conv./mês) | Maximizar conversões → depois CPA desejado |
| Recursos | Sitelinks (Especialidades, Projetos, Processo, Contato), frases de destaque, snippets estruturados (Serviços: PPCI, Regularização, Habite-se, Funcionamento, Consultoria), **chamada** (com conversão de ligação), **local** e **logo** |

---

## 5. Anúncios (RSA): rascunho

Tom definido no projeto: **competência técnica, não medo legal**. Nada de "evite multas" ou "seu imóvel pode ser interditado".

**Títulos (até 30 caracteres)**
1. Projeto PPCI em Florianópolis
2. Engenheiro Assina Seu PPCI
3. Aprovação no CBMSC
4. Habite-se e Funcionamento
5. +100 Trabalhos Entregues
6. +200 mil m² Projetados
7. Projetos em BIM
8. Fale com um Engenheiro
9. Regularização de Imóveis
10. Do Dimensionamento à Aprovação
11. Atendimento Direto c/ Engenheiro
12. PPCI para Condomínios
13. PPCI para Indústrias
14. Grande Florianópolis / SC
15. Orçamento pelo WhatsApp

**Descrições (até 90 caracteres)**
1. Projetos de PPCI com assinatura de engenheiro, do dimensionamento à aprovação no CBMSC.
2. +100 trabalhos e +200 mil m² projetados. Fale direto com o engenheiro pelo WhatsApp.
3. Habite-se, Atestado de Funcionamento e regularização de imóveis existentes em SC.
4. Projetos em BIM para condomínios, empresas, comércio e construtoras na Grande Floripa.

Fixar o título 1 (ou um título específico do grupo) na posição 1 para manter a coerência entre a busca e o anúncio. Fazer uma variação por grupo. No grupo B, os títulos falam de Atestado/Regularização. No grupo C, falam de projeto complementar/BIM.

**URL final:** `https://www.mj.eng.br/?utm_source=google&utm_medium=cpc&utm_campaign=ppci&utm_content={adgroupid}`, com a auto-tagging ligada.

---

## 6. Custo x benefício (projeção)

### Premissas (estimativas, validar)
| Métrica | Pessimista | Base | Otimista |
|---|---|---|---|
| CPC médio | R$ 9 | R$ 6 | R$ 4 |
| Taxa de conversão do site (clique → WhatsApp/form) | 5% | 8% | 12% |
| Lead qualificado (é imóvel real, na região, precisa de projeto) | 40% | 50% | 60% |
| Fechamento (qualificado → contrato) | 15% | 20% | 30% |

### Verba de R$ 2.000/mês
| | Pessimista | Base | Otimista |
|---|---|---|---|
| Cliques | 222 | 333 | 500 |
| Conversas / leads | 11 | 27 | 60 |
| Leads qualificados | 4,4 | 13 | 36 |
| **Contratos/mês** | **~0,7** | **~2,7** | **~10** |
| **Custo por lead** | R$ 180 | R$ 75 | R$ 33 |
| **Custo por contrato (CAC)** | **~R$ 3.000** | **~R$ 750** | **~R$ 200** |

### Ponto de equilíbrio
```
Lucro por contrato = ticket médio × margem
A campanha se paga quando: CAC < ticket médio × margem
```
Exemplos com **tickets hipotéticos** (confirmar o real com o cliente) e margem de 50%:

| Ticket médio | Lucro/contrato | Paga no pessimista (CAC R$ 3.000)? | Retorno no cenário base (2,7 contratos) |
|---|---|---|---|
| R$ 3.000 | R$ 1.500 | Não | Lucro de R$ 4.050 contra R$ 2.000 de verba → **~2x** |
| R$ 6.000 | R$ 3.000 | Empata | Lucro de R$ 8.100 contra R$ 2.000 → **~4x** |
| R$ 10.000 | R$ 5.000 | Sim | Lucro de R$ 13.500 contra R$ 2.000 → **~6,7x** |

Leitura: num nicho de ticket alto como PPCI, **um ou dois contratos por mês já pagam a verba**. O maior risco não é o CPC. É (a) gastar com termos de pesquisa ruins e (b) perder leads por demora no atendimento. As duas coisas são controláveis.

Fora da verba de mídia: o custo de gestão da conta (taxa de agência ou horas próprias). Some esse valor ao CAC na conta final.

---

## 7. Cronograma (90 dias)

| Fase | Período | Ações | Meta para seguir |
|---|---|---|---|
| **0. Setup** | Semana 0 | Rastreamento (seção 2), conta do Ads, Perfil da Empresa, planilha de leads, campanha criada e revisada | Conversões aparecendo no Ads (teste real) |
| **1. Aprendizado** | Semanas 1 a 4 | Maximizar cliques; negativar termos 2x/semana; pausar palavras com CTR < 3% | CTR ≥ 6%, conv. do site ≥ 5% |
| **2. Otimização** | Semanas 5 a 8 | Mudar para Maximizar conversões; tirar verba de grupos sem lead qualificado; testar 2 variações de título | CPL ≤ R$ 100, ≥ 1 contrato atribuído |
| **3. Escala ou corte** | Semanas 9 a 12 | Se CAC < 50% do lucro por contrato → subir a verba 20 a 30% a cada 2 semanas. Se não → reduzir para o grupo B (o de maior intenção) ou pausar | Decisão baseada na planilha de fechamentos |

### Regras de decisão
- **Escalar:** CAC real (pela planilha) menor que 1/3 do lucro por contrato, durante 4 semanas seguidas.
- **Manter:** CAC entre 1/3 e 1x o lucro por contrato.
- **Cortar ou reestruturar:** 60 dias sem nenhum contrato atribuído **com** pelo menos 15 leads qualificados. Nesse caso o problema é a oferta ou o atendimento, não a mídia. Se houver poucos leads, revisar palavras-chave e landing.

---

## 8. Melhorias no site que aumentam a conversão do tráfego pago

Em ordem de impacto e custo:
1. **Eventos de conversão** (seção 2.1). Bloqueante.
2. **Mensagem do WhatsApp por origem** (seção 2.2).
3. **Primeira dobra alinhada à busca:** com `?utm_term=` ou um parâmetro próprio (ex.: `?s=regularizacao`), trocar o subtítulo do hero para o tema do grupo. Exemplo: grupo B → "Regularização e Atestados no CBMSC". Isso melhora o Índice de Qualidade e reduz o CPC.
4. **LCP no celular abaixo de 2,5 s.** Já é requisito do QA. A experiência na landing page conta no Índice de Qualidade.
5. Depois do teste: **páginas dedicadas** por segmento (condomínios, indústria, construtoras), se algum grupo mostrar volume.

---

## 9. KPIs semanais

| KPI | Fonte | Referência |
|---|---|---|
| Impressões, CTR | Google Ads | CTR ≥ 6% |
| CPC médio | Google Ads | ≤ R$ 8 |
| Conversões (WhatsApp + form + ligação) | Google Ads / GA4 | — |
| Custo por lead (CPL) | Ads | ≤ R$ 100 |
| % lead qualificado | Planilha | ≥ 40% |
| Contratos e valor fechado | Planilha | ≥ 1/mês no 2º mês |
| CAC e retorno sobre a verba | Planilha + Ads | CAC < lucro/contrato |
| Parcela de impressões perdida (orçamento) | Ads | Acima de 30% indica que vale escalar |

---

## 10. Pendências para fechar o plano

- [ ] **Ticket médio** e margem de um projeto de PPCI (necessário para o ponto de equilíbrio real).
- [ ] Capacidade de atendimento: quantos projetos novos por mês o escritório consegue absorver (teto da escala).
- [ ] Horário real de resposta no WhatsApp.
- [ ] Verba mensal aprovada pelo cliente.
- [ ] Quem gerencia a conta e o custo de gestão.
- [ ] Validar volumes e CPCs no Planejador de Palavras-chave antes de subir a campanha.
