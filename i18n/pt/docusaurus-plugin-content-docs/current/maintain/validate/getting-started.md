---
id: validator-index
title: Índice de validador
description: Uma coleção de instruções sobre como executar e operar nós de validador na Rede Polygon
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Mantenha-se informado

Acompanhe as atualizações mais recentes de nós e validadores da equipe do Polygon e da comunidade assinando [notificações do Polygon](https://polygon.technology/notifications/).

:::

Os validadores são fundamentais para a manutenção da rede Polygon. Validadores executam um nó completo e protegem a rede fazendo staking de MATIC para produzir blocos, validar e participar do consenso de PoS.

:::info

Há um espaço limitado para a aceitação de novos validadores. Novos validadores só podem participar do conjunto ativo quando um validador ativo se desvincula.

Será lançado um novo processo de leilão para a substituição de validadores.

:::

## Visão geral {#overview}

A Polygon é composta por três camadas:

* Camada de Ethereum — um conjunto de contratos na mainnet Ethereum
* Camada Heimdall — um conjunto de nós Heimdall proof of stake que funcionam em paralelo com a mainnet Ethereum, supervisionam o conjunto de contratos staking implantados na mainnet Ethereum e vinculam os checkpoints da rede da Polygon para a mainnet Ethereum. Heimdall é baseado em Tendermint.
* Camada BOR — um conjunto de nós BOR produtores de blocos reorganizados por nós Heimdall BOR é baseado em Go Ethereum.

Para ser um validador na rede Polygon, é preciso executar:

* Nó sentry — uma máquina separada que executa um nó Heimdall e um nó BOR. Um nó de sentry está aberto a todos os nós na rede Polygon.
* Nó de validador — uma máquina separada que executa um nó Heimdall e um nó BOR. O nó de validador está aberto ao nó sentry e fechado ao resto da rede.
* Faça stake de tokens MATIC nos contratos de staking implantados na mainnet Ethereum.

## Componentes {#components}

### Heimdall {#heimdall}

O Heimdall faz o seguinte:

* Monitoriza contratos de staking na Mainnet Ethereum.
* Verifica todas as transições de estados na chain BOR.
* Vincula os checkpoints de estados de chain BOR para mainnet Ethereum.

Heimdall é baseado em Tendermint.

:::info Ver também

* Repositório GitHub: [Heimdall](https://github.com/maticnetwork/heimdall)
* Repositório GitHub: [Contratos de staking](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* Post do blog: [Heimdall e BOR](https://blog.polygon.technology/heimdall-and-bor/)

:::

### BOR {#bor}

O BOR faz o seguinte:

* Produz blocos na rede Polygon.

O BOR é camada e nó produtor de blocos para a rede Polygon. Ele é baseado no Go Ethereum. Blocos produzidos no BOR são validados por nós Heimdall.

:::info Ver também

* Repositório GitHub: [BOR](https://github.com/maticnetwork/bor)
* Post do blog: [Heimdall e BOR](https://blog.polygon.technology/heimdall-and-bor/)

:::

Esta seção guia-o através dos seguintes tópicos:

* [Responsabilidades de validador](validator-responsibilities.md)
* Aderir à rede como validador:
  * [Iniciar e executar os nós com o Ansible](run-validator-ansible.md)
  * [Iniciar e executar os nós com binários](run-validator-binaries.md)
  * [Fazer stake como validador](validator-staking-operations.md)
* Manter os nós validadores:
  * [Alterar o seu endereço de signatário](change-signer-address.md)
  * [Alterar a comissão](validator-commission-operations.md)

Assistência de comunidade:

* [Discord](https://discord.com/invite/0xPolygon)
* [Fórum](https://forum.polygon.technology/)
