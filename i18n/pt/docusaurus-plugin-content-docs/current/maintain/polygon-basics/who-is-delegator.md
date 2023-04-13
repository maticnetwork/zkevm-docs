---
id: who-is-delegator
title: O que é um Delegador
description: Titulares de tokens que não executam um nó
keywords:
  - docs
  - matic
  - polygon
  - delegator
  - Who is a Delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Os delegadores são portadores de token que não podem ou não querem eles próprios dirigir um nó [validador](/docs/maintain/glossary.md#validator). Em vez disso, protegem a rede ao delegar o respetivo stake a nós validadores e desempenham um papel crítico no sistema, uma vez que são responsáveis pela escolha dos validadores. Gerem a respetiva transação de delegação no contrato de staking na Mainnet Ethereum.

Os tokens MATIC estão ligados ao próximo [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) comprometido na Mainnet Ethereum. Os delegadores também têm a opção de desativar o sistema sempre que quiserem. À semelhança dos validadores, os delegadores têm de aguardar pelo período de desvinculação, que consiste em aproximadamente 9 dias para terminar antes de retirarem o respetivo stake.

## Taxas e recompensas {#fees-and-rewards}

Os delegadores fazem stake dos respetivos tokens delegando-os a um validador, obtendo em troca uma percentagem das suas recompensas. Uma vez que os delegadores partilham as recompensas com os seus validadores, os delegadores também partilham os riscos. Caso um validador se comporte indevidamente, cada um dos seus delegadores corre o risco de ser parcialmente cortado proporcionalmente ao stake delegado.

Os validadores fixam uma percentagem de [comissão](/docs/maintain/glossary.md#commission) para determinar a percentagem de recompensas que lhes será atribuída. Os delegadores conseguem ver a taxa de comissão de cada validador para compreender a distribuição de recompensas de cada validador e uma taxa relativa de retorno no respetivo stake.

:::caution Validadores com uma taxa de comissão de 100%

Estes são validadores que recebem todas as recompensas e não estão à procura de delegação, pois têm tokens suficientes para apostar sozinhos.

:::

Os delegadores têm a opção de redelegar os seus tokens a outros validadores. As recompensas são acumuladas em todos os checkpoints.

:::tip Ser um delegador ativo

A delegação não deve ser vista como uma atividade passiva, uma vez que os delegadores são parte integrante da manutenção
da rede da Polygon. Cada delegador é responsável pela gestão dos seus próprios riscos, mas, ao fazê-lo, os delegadores
devem ter como objetivo eleger validadores que estão a comportar-se bem.

:::

## Veja também {#see-also}

* [Delegue](/docs/maintain/delegate/delegate)
* [Perguntas frequentes sobre o validador](/docs/maintain/validate/faq/validator-faq)
