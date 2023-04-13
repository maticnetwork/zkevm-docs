---
id: architecture
title: Architektur
description: Ethereum, Heimdall und Bor-Layer
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

Das Polygon-Netzwerk ist im Großen und Ganzen in drei Layer unterteilt:

* **Ethereum Layer** — eine Menge von Verträgen auf dem Ethereum mainnet.
* **Heimdall Layer** – eine Reihe von Proof-of-Stake Heimdall-Knoten, die parallel zum Ethereum mainnet laufen, die Menge der Staking von Verträgen überwacht, die auf dem Ethereum mainnet bereitgestellt werden, und die Polygon Network Checkpoints auf dem Ethereum mainnet übergeben. Heimdall basiert auf Tendermint.
* **Bor Layer** — ein Satz von blockproduzierenden Bor Knoten gemischt von Heimdall-Knoten. Bor basiert auf Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

## Staking und Plasma intelligente Verträge auf Ethereum {#staking-and-plasma-smart-contracts-on-ethereum}

Um den [Proof of Stake (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) auf Polygon zu aktivieren, verwendet das System eine Reihe von [Staking](/docs/maintain/glossary.md#staking) Managementverträgen auf dem Ethereum Mainnet.

Die Staking-Verträge implementieren die folgenden Funktionen:

* Die Fähigkeit für jeden, MATIC-Token auf die Staking Contracts auf dem Ethereum Mainnet zu stecken und dem System als [Prüfer](/docs/maintain/glossary.md#validator) beizutreten.
* Staking-Belohnungen für die Prüfung von Zustandsübergängen auf dem Polygon-Netzwerk zu verdienen
* [Checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) im Ethereum Mainnet zu speichern.

Der PoS-Mechanismus dient auch dazu, das Problem der Nichtverfügbarkeit von Daten für die Polygon-Sidechains zu mildern.

## Heimdall (Validierungsschicht) {#heimdall-validation-layer}

Der Heimdall-Layer sorgt für die Aggregation der von [Bor](/docs/maintain/glossary.md#bor) erzeugten Blöcke zu einem Merkle-Tree und veröffentlicht die Merkle-Root regelmäßig in der Root-Chain. Die regelmäßige Veröffentlichung von Snapshots der Bor werden [Checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) genannt.

Für alle paar Blöcke auf Bor ein Validator auf Heimdall:

1. Überprüft alle Blöcke seit dem letzten Checkpoint.
2. Erstellt einen Merkle-Baum des Block-Hashes.
3. Veröffentlicht den Merkle-Root-Hash im Ethereum Mainnet.

Checkpoints sind aus zwei Gründen wichtig:

1. Bereitstellung von Finalität auf der Root Chain.
2. Gewährleistung des Proof-of-Burn bei der Abhebung von Assets.

Eine Übersicht des Prozesses:

* Eine Untermenge von aktiven Validatoren aus dem Pool wird ausgewählt, um für eine [Spanne](/docs/maintain/glossary.md#span) als [Blockproduzenten](/docs/maintain/glossary.md#block-producer) zu fungieren. Diese Blockproduzenten sind für die Erstellung von Blöcken und die Verbreitung der erstellten Blöcke im Netzwerk verantwortlich.
* Ein Checkpoint enthält die Merkle-Root-Hash aller Blöcke, die während eines bestimmten Intervalls erstellt wurden. Alle Knoten prüfen dieselbe Merkle-Root-Hash und fügen ihr ihre Signatur hinzu.
* Ein ausgewählter [Proposer](/docs/maintain/glossary.md#proposer) aus der Validatoren-Gruppe ist dafür verantwortlich, alle Signaturen für einen bestimmten Checkpoint zu sammeln und in das Ehtereum Mainnet zu übertragen.
* Die Zuständigkeit für die Erstellung von Blöcken und das Vorschlagen von Checkpoints hängt von dem Stake eines Validators am Gesamtpool ab.

Siehe auch [Heimdall-Architektur](/docs/pos/heimdall/overview).

## Bor (Block Producer Layer) {#bor-block-producer-layer}

Bor ist Polygons Sidechain-Blockproduzent – die Entität, die für die Zusammenfassung von Transaktionen zu Blöcken verantwortlich ist.

Bor-Blockproduzenten sind eine Untermenge der Validatoren und werden regelmäßig von den Validatoren von [Heimdall](/docs/maintain/glossary.md#heimdall) durchgemischt.

Siehe auch [Bor-Architektur](/docs/pos/bor/overview).
