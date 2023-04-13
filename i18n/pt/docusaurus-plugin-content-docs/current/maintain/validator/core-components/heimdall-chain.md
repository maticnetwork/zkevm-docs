---
id: heimdall-chain
title: Heimdall chain
description: Camada de verificador de prova na Rede Polygon
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

O Heimdall é a camada de verificador de prova de estaca, que é responsável por [verificar](/docs/maintain/glossary.md#checkpoint-transaction) a representação dos blocos do Plasma na rede do Mainnet Ethereum. Heimdall é baseado em [Tendermint](https://tendermint.com/).

O contrato staking na mainnet Ethereum funciona em conjunto com o nó Heimdall para agir como o mecanismo de gestão de stake não fiável para a maquina PoS, incluindo selecionar o conjunto [validador](/docs/maintain/glossary.md#validator), atualizar validadores, etc. Uma vez que staking é feito no contrato na mainnet Ethereum, a Polygon não se baseia apenas na honestidade do validador e, em vez disso, herda a segurança da mainnet Ethereum.

A camada Heimdall trata da agregação de blocos produzidos por [BOR](/docs/maintain/glossary.md#bor) para uma árvore Merkle e publica a Merkle ROOT periodicamente na mainnet Ethereum. Esta publicação periódica chama-se *checkpointing*.

Por cada pequeno conjunto de blocos em BOR, um validador (na camada Heimdall):

1. Valida todos os blocos desde o último checkpoint.
2. Cria uma árvore Merkle de hashes do bloco.
3. Publica a Merkle ROOT na mainnet Ethereum.

Os Checkpoints são importantes por duas razões:

1. Proporcionar finalidade na chain ROOT.
2. Proporcionar uma prova de burn na retirada de ativos.

Uma visão geral do processo:

* Um subconjunto de validadores ativos do pool é selecionado para agir como [produtores de bloco](/docs/maintain/glossary.md#block-producer) para um [span](/docs/maintain/glossary.md#span). Estes produtores de blocos são responsáveis por criar blocos e transmitir os blocos criados na rede.
* Um checkpoint inclui a Merkle ROOT hash de todos os blocos criados durante um determinado intervalo. Todos os nós validam a Merkle ROOT hash e anexam a esta as suas assinaturas.
* Um [proponente](/docs/maintain/glossary.md#proposer) selecionado do conjunto de validadores é responsável por recolher todas as assinaturas para um checkpoint específico e por vincular o checkpoint na mainnet Ethereum.
* A responsabilidade de criar blocos e propor checkpoints é variável e dependente da taxa de stake de um validador no pool geral.

Ver também [Arquitetura Heimdall](/docs/pos/heimdall/overview).
