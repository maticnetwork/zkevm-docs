---
id: polygon-architecture
title: A arquitetura da Polygon
description: A arquitetura da Polygon
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# A arquitetura da Polygon {#the-architecture-of-polygon}

O **Polygon** é uma plataforma de aplicativos de blockchain que fornece sidechains híbridos de Prova de Estaca e Proof-of-Stake

Em termos de arquitetura, a beleza da Polygon reside no design elegante, que inclui uma camada de validação genérica separada de ambientes de execução variáveis, como chains habilitadas para Plasma, sidechains de EVM completos e, no futuro, outras abordagens de Layer 2, como Optimistic Rollups.

A rede Polygon PoS tem uma arquitetura de três camadas:

* **Camada** de Ethereum — um conjunto de contratos no mainnet Ethereum.
* **Camada** Heimdall — um conjunto de nós Heimdall de prova de estaca executados paralelamente à rede do Ethereum, monitorando o conjunto de contratos de estaca implantados no mainnet Ethereum e comprometendo os pontos de verificação da Rede Polygon ao mainnet Ethereum. Heimdall é baseado em Tendermint.
* Camada de **bor** — um conjunto de nós Bor produtores de blocos embaralhados pelos nós Heimdall. BOR é baseado em Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

Atualmente, os programadores podem utilizar **Plasma** para transições de estado específicas para as quais os predicados Plasma
foram escritos, como ERC-20, ERC-721, trocas de ativos ou outros predicados personalizados. Para transições de estado arbitrárias,
estes podem utilizar PoS. Ou ambos! Isto é possível graças à construção híbrida da Polygon.

Para ativar o mecanismo PoS na nossa plataforma, são implantados um conjunto de contratos de gestão de **staking** em
Ethereum, e um conjunto de validadores incentivados que executam nós **Heimdall** e **Bor**. Ethereum é
a primeira basechain que a Polygon suporta, mas a -Polygon pretende dar suporte a basechains adicionais para
oferecer uma plataforma blockchain de camada 2 descentralizada e interoperável, com base nas sugestões e consenso da comunidade.

<img src={useBaseUrl("img/matic/Architecture.png")} />

## Contratos de staking {#staking-contracts}

Para ativar o mecanismo [Proof of Stake (PoS)](docs/home/polygon-basics/what-is-proof-of-stake) na Polygon,
o sistema emprega um conjunto de contratos de gestão de [staking](/docs/maintain/glossary#staking) na Mainnet Ethereum.

Os contratos staking implementam as seguintes características:

* Qualquer pessoa pode fazer stake de tokens MATIC nos contratos de staking na Mainnet Ethereum e aderir ao sistema como um [validador](/docs/maintain/glossary#validator).
* Ganhar recompensas de staking por validar transições de estado na rede da Polygon.
* Guardar [checkpoints](/docs/maintain/glossary#checkpoint-transaction) na mainnet Ethereum.

O mecanismo PoS também atua como um atenuante para o problema de indisponibilidade de dados para as Polygon sidechains.

## Heimdall {#heimdall}

Heimdall é a camada -Proof of Stake de validação que lida com a agregação de blocos produzidos
pela [Bor](/docs/maintain/glossary#bor) numa árvore Merkle e publica a ROOT Merkle periodicamente na
ROOT chain. A publicação periódica de snapshots da sidechain BOR é denominada [checkpoints](/docs/maintain/glossary#checkpoint-transaction).

1. Valida todos os blocos desde o último checkpoint.
2. Cria uma árvore Merkle de hashes do bloco.
3. Publica o Merkle ROOT hash na Mainnet Ethereum.

Os checkpoints são importantes por duas razões:

1. Proporcionar finalidade na chain ROOT.
2. Proporcionar uma prova de burn na retirada de ativos.

Uma visão geral do processo:

* Um subconjunto de validadores ativos são selecionados a partir do pool para agirem como [produtores de bloco](/docs/maintain/glossary#block-producer) para um [span](/docs/maintain/glossary#span). Estes produtores de blocos são responsáveis por criarem blocos e transmitirem estes blocos criados para a rede.
* Um checkpoint inclui o Merkle ROOT hash de todos os blocos criados durante um determinado intervalo. Todos os nós validam a Merkle ROOT hash e anexam a esta as suas assinaturas.
* Um [proponente](/docs/maintain/glossary#proposer) selecionado do conjunto de validadores é responsável por recolher todas as assinaturas para um checkpoint específico e por vincular o checkpoint na mainnet Ethereum.
* A responsabilidade de criar blocos e propor checkpoints é variável e dependente da taxa de stake de um validador no pool geral.

Estão disponíveis mais detalhes sobre o Heimdall no guia de [arquitetura Heimdall](/docs/pos/heimdall/overview).

## BOR {#bor}

O Bor é a camada de produtor de blocos de sidechain do Polygon - entidade responsável por agregar transações em blocos. Atualmente, é uma implementação Geth básica com mudanças personalizadas feitas no algoritmo de consenso.

Os produtores de blocos são uma subrede dos validadores e são periodicamente embaralhados através da seleção do comitê na [Heimdall](/docs/maintain/glossary#heimdall) nas durações denominadas como `span` na Polygon. Os blocos são produzidos no nó **BOR** , e a sidechain VM é compatível com EVM.
Os blocos produzidos na BOR também são validados periodicamente por nós Heimdall e um checkpoint que consiste no
hash da árvore Merkle de um conjunto de blocos BOR é comprometido na Ethereum periodicamente.

Estão disponíveis mais detalhes no guia [arquitetura BOR](/docs/pos/bor/overview)

## Recursos {#resources}

* [Arquitetura BOR](https://wiki.polygon.technology/docs/pos/bor)
* [Arquitetura Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [Mecanismo de Checkpoint](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
