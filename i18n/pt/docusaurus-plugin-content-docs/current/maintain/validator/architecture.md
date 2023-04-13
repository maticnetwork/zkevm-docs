---
id: architecture
title: Arquitetura
description: Camadas de Ethereum, Heimdall e Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

A rede da Polygon está essencialmente dividida em três camadas:

* **Camada** de Ethereum — um conjunto de contratos no mainnet Ethereum.
* **Camada** Heimdall — um conjunto de nós Heimdall de prova de estaca executados em paralelo com a rede do Ethereum, monitorando o conjunto de contratos de estaca implantados na rede do Ethereum e comprometendo os pontos de verificação da Rede Polygon na rede do mainnet do Ethereum. Heimdall é baseado em Tendermint.
* Camada de **bor** — um conjunto de nós Bor produtores de blocos embaralhados pelos nós Heimdall. BOR é baseado em Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

## Staking e contratos inteligentes Plasma em Ethereum {#staking-and-plasma-smart-contracts-on-ethereum}

Para ativar o mecanismo [Proof of Stake (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) na Polygon, o sistema recorre a um conjunto de contratos de gestão [staking](/docs/maintain/glossary.md#staking) na mainnet Ethereum.

O contrato staking implementa as seguintes características:

* A capacidade de qualquer pessoa fazer stake de tokens MATIC nos contratos staking na mainnet Ethereum e aderir ao sistema como um [validador](/docs/maintain/glossary.md#validator).
* Ganhar recompensas de staking por validar transições de estado na rede da Polygon.
* Guardar [checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) na mainnet Ethereum.

O mecanismo PoS também atua como um atenuante para o problema de indisponibilidade de dados para as Polygon sidechains.

## Heimdall (camada de validação) {#heimdall-validation-layer}

A camada Heimdall lida com a agregação de blocos produzidos por [BOR](/docs/maintain/glossary.md#bor) para uma árvore Merkle e a publicação periódica da raiz Merkle na chain ROOT. A publicação periódica de snapshots da sidechain BOR é denominada [checkpoints](/docs/maintain/glossary.md#checkpoint-transaction).

Por cada poucos blocos em BOR, um validador na camada Heimdall:

1. Valida todos os blocos desde o último checkpoint.
2. Cria uma árvore Merkle de hashes do bloco.
3. Publica o Merkle ROOT hash na Mainnet Ethereum.

Os checkpoints são importantes por duas razões:

1. Proporcionar finalidade na chain ROOT.
2. Proporcionar uma prova de burn na retirada de ativos.

Uma visão geral do processo:

* Um subconjunto de validadores ativos são selecionados a partir do pool para agirem como [produtores de bloco](/docs/maintain/glossary.md#block-producer) para um [span](/docs/maintain/glossary.md#span). Estes produtores de blocos são responsáveis por criarem blocos e transmitirem estes blocos criados para a rede.
* Um checkpoint inclui o Merkle ROOT hash de todos os blocos criados durante um determinado intervalo. Todos os nós validam a Merkle ROOT hash e anexam a esta as suas assinaturas.
* Um [proponente](/docs/maintain/glossary.md#proposer) selecionado do conjunto de validadores é responsável por recolher todas as assinaturas para um checkpoint específico e por vincular o checkpoint na mainnet Ethereum.
* A responsabilidade de criar blocos e propor checkpoints é variável e dependente da taxa de stake de um validador no pool geral.

Ver também [arquitetura Heimdall](/docs/pos/heimdall/overview).

## BOR (camada produtora de bloco) {#bor-block-producer-layer}

BOR é um produtor de blocos sidechain da Polygon, — a entidade responsável por agregar transações em blocos.

Produtores de blocos BOR são um subconjunto de validadores e são reorganizados periodicamente pelos validadores [Heimdall](/docs/maintain/glossary.md#heimdall).

Ver também [Arquitetura BOR](/docs/pos/bor/overview).
