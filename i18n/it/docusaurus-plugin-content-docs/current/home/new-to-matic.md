---
id: new-to-polygon
title: Benvenuti a Polygon
description: Costruire la tua prossima app blockchain su Polygon
keywords:
  - docs
  - matic
  - polygon
  - new to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Benvenuti a Polygon {#welcome-to-polygon}

Polygon è una soluzione di scaling per le blockchain pubbliche. La PoS di Polygon supporta tutti gli strumenti di Ethereum nonché transazioni più veloci ed economiche.

## Tipologie di interazione su Polygon {#types-of-interaction-on-polygon}

* [Catena ](/docs/develop/getting-started)Polygon PoS
* [Ethereum + Polygon con bride PoS](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started)
* [Ethereum + Polygon con bridge Plasma](https://docs.polygon.technology/docs/develop/ethereum-polygon/plasma/getting-started)

## Query la blockchain {#query-the-blockchain}

La maggior parte delle interazioni blockchain coinvolge la lettura del suo stato.

Alchemy offre una guida di riferimento su come effettuare le richieste di base alla blockchain. Consulta la loro guida su [come interrogare Polygon](https://docs.alchemy.com/reference/polygon-sdk-examples).

## Implementare smart contract {#deploy-smart-contracts}

* Implementa i tuoi contratti su Polygon
    - [Usare Alchemy](/docs/develop/alchemy)
    - [Usare Chainstack](/docs/develop/chainstack)
    - [Usare Quicknode](/docs/develop/quicknode)
    - [Usare Remix](/docs/develop/remix)
    - [Usare Truffle](/docs/develop/truffle)
    - [Usare Hardhat](/docs/develop/hardhat)

:::note

Configurare the Web3 su "https://rpc-mumbai.matic.today", tutto il resto rimane lo stesso.

:::

## Che cos'è la blockchain? {#what-is-a-blockchain}

Per spiegarla in modo semplice, la blockchain è un registro condiviso, trasparente e immutabile per la registrazione di transazione, il monitoraggio degli asset e la costruzione della fiducia. Per ulteriori informazioni, consulta le [Basi della blockchain](blockchain-basics/basics-blockchain.md).

## Che cos'è una sidechain? {#what-is-a-sidechain}

Puoi vedere la sidechain come un clone di una blockchain "genitore", la quale supporta il trasferimento di asset da e verso la mainchain. È semplicemente un'alternativa alla catena genitore che crea una nuova blockchain con il proprio meccanismo di creazione dei blocchi (meccanismo di consenso). Il collegamento di una sidechain a una catena genitore prevede la creazione di un metodo per scambiare gli asset tra le due catene.

## Validatori e delegatori {#validator-and-delegator-roles}

Sulla rete di Polygon Network, puoi rivestire il ruolo di validatore o di delegatore. Consultare:

* [Chi è un Validatore](/docs/maintain/polygon-basics/who-is-validator)
* [Chi è un Delegatore](/docs/maintain/polygon-basics/who-is-delegator)

## Architettura {#architecture}

Se il tuo obiettivo è quello di diventare un validatore, è essenziale comprendere l'architettura di Polygon.

Consulta l'[Architettura di Polygon.](/docs/maintain/validator/architecture)

### Componenti {#components}

Per ottenere una comprensione dettagliata dell'architettura di Polygon, consulta i vari componenti principali:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Contratti](/docs/pos/contracts/stakingmanager)

#### Code base {#codebases}

Per ottenere una comprensione dettagliata dei componenti principali, consulta i code base:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contratti](https://github.com/maticnetwork/contracts)

## Istruzioni {#how-tos}

### Configurazione del nodo {#node-setup}

Se vuoi eseguire un nodo completo sulla Polygon Mainnet o su Mumbai Testnet, puoi seguire il [Esegui una guida per il nodo di](/maintain/validate/run-validator.md) Validatore.

### Operazioni di staking {#staking-operations}

* [Operazioni di staking del validatore](/docs/maintain/validate/validator-staking-operations)
* [Delegare](/docs/maintain/delegate/delegate)

### Risorse esterne {#external-resources}
- [La tua prima dApp](https://www.youtube.com/watch?v=rzvk2kdjr2I)
- [Le sidechains e le Childchains](https://hackernoon.com/what-are-sidechains-and-childchains-7202cc9e5994)