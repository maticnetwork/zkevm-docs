---
id: rewards
title: Recompensas
sidebar_label: Rewards
description: Aprenda sobre os incentivos de staking da rede da Polygon.
keywords:
  - docs
  - matic
  - polygon
  - rewards
  - staking
  - incentives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Para obter uma introdução ao algoritmo Polygon e à Prova de Stake, consulte [O que é Prova de](/docs/home/polygon-basics/what-is-proof-of-stake) Stake

Na Polygon, os validadores fazem stake dos seus tokens MATIC como garantia para trabalhar para a segurança da rede e em troca do seu serviço ganham recompensas.

Para beneficiar da economia da Polygon, deve tornar-se um validador ou um delegador.

Para ser um [validador](/docs/maintain/glossary.md#validator), precisa de **executar um nó de validador completo** e fazer stake de MATIC. Ver [Validar](/docs/maintain/validate/validator-index).

Verifique também a página [Responsabilidades do](/docs/maintain/validate/validator-responsibilities) Validador.

Para ser um [delegador](/docs/maintain/glossary.md#delegator), apenas precisa de **delegar MATIC a um validador**. Ver [Delegar](/docs/maintain/delegate/delegate).

## Qual é o incentivo? {#what-is-the-incentive}

A Polygon atribui 12% da sua oferta total de 10 mil milhões de tokens para financiar as recompensas staking. Isto é para garantir que a rede está bem implantada até que as taxas de transação ganhem tração. Estas recompensas destinam-se principalmente a dar um impulso à rede, enquanto o protocolo, a longo prazo, se destina a sustentar-se com base nas taxas de transação.

**Recompensas do Validador = Recompensas Staking + Taxas de Transação**

Isto é atribuído de forma a assegurar a dissociação gradual das recompensas staking de serem o componente dominante das recompensas do validador.

| Ano | Stake Alvo (30% da oferta circulante) | Taxa de recompensa por 30% de ligação | Pool Recompensa |
|---|---|---|---|
| Primeiro | 1,997,909,431 | 20% | 312,917,369 |
| Segundo | 2,556,580,023 | 12% | 275,625,675 |
| Terceiro | 2,890,642,855 | 9% | 246,933,140 |
| Quarto | 2,951,934,048 | 7% | 204,303,976 |
| Quinto | 2,996,518,749 | 5% | 148,615,670 + **11,604,170** |

Abaixo está um snapshot como exemplo das recompensas anuais esperadas para os primeiros 5 anos considerando a oferta staked que varia de 5% a 40% com um intervalo de 5%

| % da oferta staked circulante | 5% | 10% | 15% | 20% | 25% | 30% | 35% | 40% |
|---|---|---|---|---|---|---|---|---|
| Recompensa anual para o ano |
| Primeiro | 120% | 60% | 40% | 30% | 24% | 20% | 17,14% | 15% |
| Segundo | 72% | 36% | 24% | 18% | 14,4% | 12% | 10,29% | 9% |
| Terceiro | 54% | 27% | 18% | 13,5% | 10,8% | 9% | 7,71% | 6,75% |
| Quarto | 42% | 21% | 14% | 10,5% | 8,4% | 7% | 6% | 5,25% |
| Quinto | 30% | 15% | 10% | 7,5% | 6% | 5% | 4,29% | 3,75% |

## Quem recebe os incentivos? {#who-gets-the-incentives}

Stakers que executam nós de validador e stakers que delegam os seus tokens a um validador que eles preferem.

Os validadores têm a opção de cobrar uma comissão sobre a recompensa recebida pelos delegadores.

Os fundos pertencentes a todos os stakers estão bloqueados num contrato colocado na mainnet Ethereum.

Nenhum validador detém a custódia sobre os tokens do delegador.

## Recompensas staking {#staking-rewards}

O incentivo anual é absoluto — independentemente do stake geral ou da taxa do alvo de ligação na rede, o valor de incentivo é dado periodicamente como recompensa a todos os signatários.

Na Polygon, existe um elemento adicional de vincular [checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) periódicos para a mainnet Ethereum. Esta é uma parte importante das responsabilidades do validador e eles são incentivados a realizar esta atividade. Isto constitui um custo para o validador, que é exclusivo a uma solução de Camada 2 como a Polygon. Esforçamo-nos por acomodar este custo no mecanismo de pagamento de recompensa de staking do validador como um bónus a ser pago ao [proponente](/docs/maintain/glossary.md#proposer), que é responsável por vincular o checkpoint. Recompensas menos o bónus são para serem partilhadas proporcionalmente entre todos os stakers, proponentes e [signatários](/docs/maintain/glossary.md#signer-address).

## Incentivar o proponente a incluir todas as assinaturas {#encouraging-the-proposer-to-include-all-signatures}

Para beneficiar completamente do bónus, o [proponente](/docs/maintain/glossary.md#proposer) deve incluir todas as assinaturas no [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction). Porque o protocolo deseja ⅔ +1 do peso total da stake, o checkpoint é aceite mesmo com 80% de votos. No entanto, neste caso, o proponente obtém apenas 80% do bónus calculado.

## Taxas de transação {#transaction-fees}

Cada produtor de bloco no [BOR](/docs/maintain/glossary.md#bor) recebe uma determinada percentagem das taxas de transação cobradas em cada bloco. A seleção de produtores para um determinado span depende também da taxa do validador no stake geral. As taxas de transação restantes seguem pelo mesmo canal das recompensas, que são partilhadas entre todos os validadores que trabalham na camada [Heimdall](/docs/maintain/glossary.md#heimdall).
