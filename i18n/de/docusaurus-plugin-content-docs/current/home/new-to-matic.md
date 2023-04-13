---
id: new-to-polygon
title: Willkommen bei Polygon
description: Baue deine nächste Blockchain-App auf Polygon
keywords:
  - docs
  - matic
  - polygon
  - new to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Willkommen bei Polygon {#welcome-to-polygon}

Polygon ist eine Skalierungslösung für öffentliche Blockchains. Polygon PoS unterstützt alle bestehenden Ethereum-Tools und ermöglicht schnellere und günstigere Transaktionen.

## Arten von Interaktion auf Polygon {#types-of-interaction-on-polygon}

* [Polygon PoS Chain](/docs/develop/getting-started)
* [Ethereum + Polygon mit PoS-Brücke](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started)
* [Ethereum + Polygon mit Plasma-Brücke](https://docs.polygon.technology/docs/develop/ethereum-polygon/plasma/getting-started)

## Abfrage der Blockchain {#query-the-blockchain}

Die meisten blockchain beinhalten das Lesen seines Zustands.

Alchemy bietet einen Referenzleitfaden zur Erstellung von grundlegenden Anfragen an die Blockchain. Sieh dir ihren Leitfaden [an, wie du Polygon abfragst](https://docs.alchemy.com/reference/polygon-sdk-examples).

## Smart Contracts bereitstellen {#deploy-smart-contracts}

* Bereitstellung deiner Contracts auf Polygon
    - [Alchemy verwenden](/docs/develop/alchemy)
    - [Chainstack verwenden](/docs/develop/chainstack)
    - [QuickNode verwenden](/docs/develop/quicknode)
    - [Remix verwenden](/docs/develop/remix)
    - [Truffle verwenden](/docs/develop/truffle)
    - [Hardhat verwenden](/docs/develop/hardhat)

:::note

Konfiguriere die Web3 RPC-URL auf "https://rpc-mumbai.matic.today", alles andere bleibt gleich.

:::

## Was ist Blockchain? {#what-is-a-blockchain}

Blockchain ist ein gemeinsamer, nicht veränderbarer Ledger für die Aufzeichnung von Transaktionen, die Verfolgung von Assets und den Aufbau von Vertrauen. Gehe zu [Blockchain-Basics](blockchain-basics/basics-blockchain.md), um mehr zu erfahren.

## Was ist eine Sidechain? {#what-is-a-sidechain}

Stell dir eine Sidechain als einen Klon einer „Eltern“-Blockchain vor, der den Transfer von Assets zur und von der Mainchain unterstützt. Sie ist einfach eine Alternative zur Mainchain, die eine neue Blockchain mit einem eigenen Mechanismus zur Erstellung von Blöcken (Konsensmechanismus) erstellt. Die Verbindung einer Sidechain mit einer Eltern-Chain erfordert die Einrichtung einer Methode zur Übertragung von Assets zwischen den Chains.

## Validator- und Delegatorrollen {#validator-and-delegator-roles}

Im Polygon Netzwerk kannst du ein Validator oder ein Delegator sein. Siehe:

* [Wer ist ein Validator](/docs/maintain/polygon-basics/who-is-validator)
* [Wer ist ein Delegator](/docs/maintain/polygon-basics/who-is-delegator)

## Architektur {#architecture}

Wenn du ein Validator werden willst, ist es wichtig, dass du die Polygon-Architektur verstehst.

Siehe [Polygon Architektur](/docs/maintain/validator/architecture).

### Komponenten {#components}

Um ein detailliertes Verständnis der Polygon-Architektur zu erlangen, siehe Kernkomponenten:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Contracts](/docs/pos/contracts/stakingmanager)

#### Codebases {#codebases}

Um ein detailliertes Verständnis der Kernkomponenten zu erhalten, siehe Codebases:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contracts](https://github.com/maticnetwork/contracts)

## Anleitungen (How-tos) {#how-tos}

### Knoten Setup {#node-setup}

Wenn du einen vollständigen Knoten auf dem Polygon Mainnet oder Mumbai Testnet ausführen möchtest, kannst du den folgenden folgen. [Führe einen Validator](/maintain/validate/run-validator.md) Guide aus.

### Staking Vorgänge {#staking-operations}

* [Validator-Staking Vorgänge](/docs/maintain/validate/validator-staking-operations)
* [Delegieren](/docs/maintain/delegate/delegate)

### Externe Ressourcen {#external-resources}
- [Deine erste dApp](https://www.youtube.com/watch?v=rzvk2kdjr2I)
- [Sidechains und Childchains](https://hackernoon.com/what-are-sidechains-and-childchains-7202cc9e5994)