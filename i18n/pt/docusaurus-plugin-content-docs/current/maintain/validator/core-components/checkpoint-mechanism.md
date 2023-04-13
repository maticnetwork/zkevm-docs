---
id: checkpoint-mechanism
title: Mecanismo de Checkpoint
sidebar_label: Checkpoints
description: Verificando o estado do sistema para o mainnet Ethereum
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygon não é uma plataforma de camada 1

O Polygon depende do Mainnet Ethereum como sua camada de assentamento da camada 1. Todos os mecanismos de staking precisam de estar sincronizados com os contratos na mainnet Ethereum.

:::

[Os proponentes](/docs/maintain/glossary.md#proposer) para um checkpoint são inicialmente selecionados através [do algoritmo de round-robin ponderado do Tendermint](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html). Uma outra verificação personalizada é implementada com base no sucesso de submissão do checkpoint. Isto permite ao sistema Polygon desacoplar com a seleção do proponente Tendermint e fornece à Polygon capacidades como selecionar um proponente apenas quando a transação do checkpoint na mainnet Ethereum for bem sucedida ou submeter uma transação de checkpoint para os blocos pertencentes a checkpoints falhados anteriormente.

Submeter com sucesso um checkpoint no Tendermint é um processo de 2 fases:

* Um proponente, selecionado por meio do algoritmo round-robin, envia um checkpoint com o endereço do proponente e o hash Merkle no campo proponente.
* Todos os outros proponentes validam os dados no campo proponente antes de adicionar o hash Merkle nos seus estados.

O próximo proponente envia depois uma transação de confirmação para provar que a anterior [transação checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) teve sucesso na mainnet Ethereum. Cada alteração no conjunto de validadores é transmitida pelos nós de validador em [Heimdall](/docs/maintain/glossary.md#heimdall) que está integrado no nó de validador. Isto permite ao Heimdall permanecer em sincronia com o estado de contrato Polygon na mainnet Ethereum em todos os momentos.

O contrato Polygon implementado na mainnet Ethereum é considerado a fonte da verdade absoluta, e, portanto, toda a validação é feita por meio de consulta ao contrato mainnet Ethereum.
