---
id: polygon-architecture
title: Arquitetura PoS da Polygon
description: Arquitetura do Polygon PoS incluindo cadeias de Heimdall e Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Arquitetura PoS da Polygon {#polygon-pos-architecture}

A rede da Polygon é uma plataforma de aplicativo blockchain que fornece sidechains híbridas habilitadas para Proof of Stake e Plasma.

Architecturally, a beleza do Polygon é o seu design elegante, que apresenta uma camada de validação genérica separada de ambientes de execução variados como sidechains EVM e outras abordagens da camada 2, como rollups. de conhecimento zero

Para ativar o mecanismo PoS na nossa plataforma, empregamos um conjunto de contratos de gestão de **staking** na Ethereum, assim como um conjunto de validadores incentivados que executam os nós **Heimdall** e **BOR**. A Ethereum é a primeira basechain que a Polygon suporta, mas a Polygon pretende oferecer suporte a outras basechains, com base nas sugestões e consenso da comunidade, para possibilitar uma plataforma de blockchain de segunda camada descentralizada e interoperável.

O Polygon PoS tem uma arquitetura de três camadas:

1. Staking de contratos inteligentes na Ethereum
2. Heimdall (camada Proof of Stake)
3. BOR (camada produtora de blocos)

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Contratos inteligentes da Polygon (na Ethereum) {#polygon-smart-contracts-on-ethereum}

A Polygon mantém um conjunto de contratos inteligentes na Ethereum que lidam com o seguinte:

- Gestão de staking para a camada Proof of Stake
- Gestão de delegações, incluindo cotas dos validadores
- Checkpoints/instantâneos do estado das sidechains

### Heimdall (camada de validadores de Proof of Stake) {#heimdall-proof-of-stake-validator-layer}

**Heimdall** é o nó de validadores de PoS que funciona em consonância com os contratos de staking na Ethereum para habilitar o mecanismo de PoS na Polygon. Foi implementada através da construção sobre o mecanismo de consenso Tendermint com alterações no esquema de assinatura e diversas estruturas de dados. É responsável pela validação dos blocos, seleção da comissão de produtores de blocos, pela execução do checkpoint de uma representação dos blocos de sidechain da Ethereum na nossa arquitetura, entre outras tarefas.

A camada Heimdall lida com a agregação de blocos produzidos por BOR para uma árvore Merkle e a publicação periódica da raiz Merkle na chain ROOT. Estas publicações periódicas são chamadas `checkpoints`. Por cada pequeno conjunto de blocos em BOR, um validador (na camada Heimdall):

1. Valida todos os blocos desde o último checkpoint
2. Cria uma árvore Merkle dos hashes dos blocos
3. Publica a ROOT Merkle na chain principal

Os checkpoints são importantes por duas razões:

1. Garantem o caráter definitivo na chain ROOT
2. Garantem o Proof of Burn no saque de ativos

Numa visão panorâmica, o processo pode ser explicado da seguinte forma:

- Um subconjunto de validadores ativos da pool é selecionado para atuar como produtores de blocos para um período. A Seleção de cada período também será consentida por pelo menos 2/3 de ativos. Estes produtores de blocos são responsáveis pela criação de blocos e pela transmissão da rede remanescente.
- Um checkpoint inclui a ROOT de todos os blocos criados durante um determinado intervalo. Todos os nós validam o mesmo anexando a sua assinatura.
- Um proponente selecionado do conjunto de validadores é responsável por coletar todas as assinaturas para um determinado ponto de verificação e cometer o mesmo na chain principal.
- A responsabilidade de criar blocos e também de propor checkpoints é variavelmente dependente da taxa de participação de um validador na pool geral.

### BOR (camada produtora de blocos) {#bor-block-producer-layer}

A BOR é a camada produtora de blocos da Polygon - a entidade responsável pela agregação de transações em blocos.

Os produtores de blocos são baralhados periodicamente através da seleção das comissões na Heimdall por períodos denominados `span` na Polygon. Os blocos são produzidos no nó da **BOR** e a sidechain VM é compatível com a EVM. Os blocos produzidos na BOR também são validados periodicamente pelos nós Heimdall e um checkpoint que consiste no hash da árvore Merkle de um conjunto de blocos da BOR é alocado à Ethereum periodicamente.

### Recursos {#resources}

- [Arquitetura BOR](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Arquitetura Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [Mecanismo de Checkpoint](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
