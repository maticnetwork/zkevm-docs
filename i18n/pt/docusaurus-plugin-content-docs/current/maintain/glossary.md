---
id: glossary
title: Glossário
description: Termos do Polygon
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Produtor de blocos {#block-producer}

Um produtor de blocos é um [validador](#validator) ativo selecionado para atuar como produtor de blocos por um [span](#span).

Um produtor de blocos é responsável por criar blocos e transmitir esses blocos criados para a rede.

## BOR {#bor}

Um nó BOR é um nó que produz blocos na rede Polygon.

BOR é baseado em [Go Ethereum](https://geth.ethereum.org/).

## Transação de checkpoint {#checkpoint-transaction}

Uma transação de checkpoint é uma transação que contém a raiz Merkle de blocos da camada [BOR](#bor) entre os intervalos de checkpoint.

A transação está vinculada aos contratos de staking da Polygon em mainnet Ethereum por um nó [Heimdall](#heimdall).

Ver também:

* [Arquitetura Heimdall: Checkpoint](/docs/pos/heimdall/checkpoint)
* [Mecanismo de Checkpoint](/docs/maintain/validator/core-components/checkpoint-mechanism)

## Comissão {#commission}

Uma comissão é a percentagem das recompensas tiradas por [validadores](#validator) dos [delegadores](#delegator) que fazem stake com os validadores.

Ver também [Operações de Comissão de Validador](/docs/maintain/validate/validator-commission-operations).

## Delegador {#delegator}

A função do delegador é fazer stake de tokens MATIC para proteger a rede Polygon com [validadores](#validator) existentes sem operar os nós eles mesmos.

Ver também [Quem é um Delegador](/docs/maintain/polygon-basics/who-is-delegator).

## Nó completo {#full-node}

Um nó completo é um [nó sentry](#sentry) totalmente sincronizado que executa tanto [Heimdall](#heimdall) como [BOR](#bor).

Ver também [Implantação de nó completo](/docs/operate/full-node-deployment).

## Heimdall {#heimdall}

Um nó Heimdall é um nó que opera em paralelo com mainnet Ethereum e monitoriza o conjunto de contratos implantados em mainnet Ethereum e vincula os [checkpoints](#checkpoint-transaction) da Rede Polygon para mainnet Ethereum.

Heimdall é baseado em [Tendermint](https://tendermint.com/).

## Endereço de proprietário {#owner-address}

Um endereço de proprietário é o endereço usado para stake, restaurar stake, alterar o endereço do signatário, retirar recompensas e gerir parâmetros relacionados com a delegação em mainnet Ethereum.

Embora a [chave do signatário](#signer-address) seja mantida no nó e considerada uma carteira **quente**, a chave do proprietário deve ser mantida em total segurança, usada raramente, e ser considerada uma carteira **fria**.

Ver também [Gestão de chave](validator/core-components/key-management.md).

## Proponente {#proposer}

Um proponente é o [validador](#validator) selecionado pelo algoritmo para propor um novo bloco.

Um proponente também é responsável por recolher todas as assinaturas para um [checkpoint](#checkpoint-transaction) específico e vincular o checkpoint para mainnet Ethereum.

## Sentry {#sentry}

Um nó sentry é o nó que executa tanto o nó [Heimdall](#heimdall) como o nó [BOR](#bor) para descarregar dados de outros nós na rede e propagar os dados do [validador](#validator) na rede.

Um nó sentry está aberto a todos os outros nós de sentry da rede.

## Span {#span}

Um conjunto de blocos logicamente definidos para o qual um conjunto de validadores é escolhido a partir de todos os [validadores](#validator) disponíveis.

A seleção de cada span é decidida por pelo menos 2/3 dos validadores em termos de poder de staking.

Ver também [Consenso de BOR: Span](/docs/pos/bor/consensus.md#span).

## Staking {#staking}

Staking é o processo de bloqueio de tokens num depósito para ganhar o direito de validar e produzir blocos num blockchain. Normalmente, o staking é feito no token nativo da rede - pois o token MATIC é bloqueado por validadores/stakers na Rede Polygon. Outros exemplos incluem ETH no Ethereum (pós-fusão), ATOM no Cosmos, etc.

Veja também [O que é Proof of Stake (PoS)](polygon-basics/what-is-proof-of-stake.md).

## Endereço de signatário {#signer-address}

Um endereço de signatário é o endereço de uma conta Ethereum do nó de validador do [Heimdall](#heimdall). O endereço de signatário assina e envia as [transações do checkpoint](#checkpoint-transaction).

Embora a chave do signatário seja mantida no nó e considerada uma carteira **quente**, a [chave do proprietário](#owner-address) deve ser mantida em total segurança, usada raramente, e ser considerada uma carteira**fria**.

Ver também [Gestão de chave](validator/core-components/key-management.md).

## Validador {#validator}

Os validadores [apostam seus tokens MATIC](/docs/maintain/validate/validator-staking-operations) através de contratos de staking implantados na mainnet Ethereum e estão executando tanto o nó [Heimdall](#heimdall) como o nó [Bor](#bor) para comprometer os pontos de verificação da rede na mainnet Ethereum e para produzir blocos na rede.

O nó de validador está aberto ao nó [sentry](#sentry) e fechado ao resto da rede.

Ver também [Quem é um Validador](polygon-basics/who-is-validator.md).
