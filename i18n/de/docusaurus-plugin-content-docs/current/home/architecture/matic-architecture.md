---
id: polygon-architecture
title: Polygon PoS Architektur
description: Polygon PoS Architecture einschließlich Heimdall und Bor Chains
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

# Polygon PoS Architektur {#polygon-pos-architecture}

Polygon Network ist eine Blockchain-Anwendungsplattform, die hybride Proof-of-Stake- und Plasma-fähige Sidechains anbietet.

Architecturally, ist die Schönheit von Polygon ihr elegantes Design, das eine generische Validierungsschicht aufweist, die von unterschiedlichen Ausführungsumgebungen wie full-blown Sidechains und anderen Layer-2-Ansätzen wie z.B. Zero-Knowledge Rollups getrennt ist.

Um den PoS-Mechanismus auf unserer Plattform zu ermöglichen, werden eine Reihe von **Staking** Management Contracts auf Ethereum sowie eine Reihe von anreizbasierten Validatoren auf **Heimdall**- und **Bor**-Knoten eingesetzt. Ethereum ist die erste Basechain, die Polygon unterstützt. Polygon hat aber außerdem vor, auf der Grundlage von Vorschlägen und Konsens der Community, Support für weitere Basechains anzubieten, um eine interoperable dezentrale Layer-2-Blockchain-Plattform zu ermöglichen.

Polygon PoS hat eine Drei-Layer-Architektur:

1. Das Staking von Smart Contracts auf Ethereum
2. Heimdall (Proof of Stake Layer)
3. Bor (Block Producer Layer)

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Polygon Smart Contracts (auf Ethereum) {#polygon-smart-contracts-on-ethereum}

Polygon unterhält eine Reihe von Smart Contracts auf Ethereum, die folgende Aufgaben erfüllen:

- Staking Management für den Proof-of-Stake-Layer
- Delegationsmanagement einschließlich der Validator-Aktien
- Checkpoints/Snapshots des Sidechain-Status

### Heimdall (Proof-of-Stake Validator-Layer) {#heimdall-proof-of-stake-validator-layer}

**Heimdall** ist der PoS-Validierungsknoten, der mit den Staking-Verträgen auf Ethereum zusammenarbeitet, um den PoS-Mechanismus auf Polygon zu ermöglichen. Wir haben dies durch den Aufbau der Tendermint-Konsens-Engine und der Änderung des Signaturschemas sowie verschiedener Datenstrukturen implementiert. Er ist für die Blockvalidierung, die Auswahl des Block Producer Gremiums, das Checkpointing einer Repräsentation der Sidechain-Blöcke auf Ethereum in unserer Architektur und verschiedene andere Aufgaben verantwortlich.

Der Heimdall-Layer sorgt für die Aggregation der von Bor erzeugten Blöcke zu einem Merkle-Tree und veröffentlicht die Merkle-Root regelmäßig in der Root-Chain. Diese periodischen Veröffentlichungen werden `checkpoints`aufgerufen. Für alle paar Blöcke auf Bor wird ein Validator (auf dem Heimdall-Layer):

1. Alle Blöcke seit dem letzten Checkpoint überprüfen
2. Einen Merkle-Tree der Block-Hashes erstellen
3. Die Merkle-Root in der Mainchain veröffentlichen

Checkpoints sind aus zwei Gründen wichtig:

1. Für die Gewährleistung der Endgültigkeit der Root Chain
2. Für die Gewährleistung des Proof of Burn bei der Entnahme von Assets

Allgemein lässt sich der Prozess folgendermaßen erklären:

- Es wird eine Teilmenge aktiver Validatoren aus dem Pool ausgewählt, um für eine gewisse Zeitspanne als Block Producer zu fungieren. Die Auswahl für jede Spanne wird ebenfalls mit mindestens 2/3 der Stimmen getroffen. Diese Blockproduzenten sind verantwortlich für die Erstellung von Blöcken und die Übertragung an das verbleibende Netzwerk.
- Ein Checkpoint enthält die Root aller Blöcke, die während eines bestimmten Intervalls erstellt wurden. Alle Knoten prüfen diesen und fügen ihm ihre Signatur hinzu.
- Ein ausgewählter Proposer aus dem validator ist für das Sammeln aller Signaturen für einen bestimmten Prüfpunkt verantwortlich und für den Auftrag auf der Hauptkette.
- Die Zuständigkeit für die Erstellung von Blöcken und das Vorschlagen von Checkpoints hängt von dem Anteil eines Validators am Gesamtpool ab.

### Bor (Block Producer Layer) {#bor-block-producer-layer}

Bor ist die Polygon Block Producer Layer – die für die Aggregation von Transaktionen zu Blöcken zuständige Einheit.

Die Block Producer werden in regelmäßigen Abständen, die im Polygon als ein`span` bezeichnet werden, durch ein Gremium auf Heimdall ausgewechselt. Blöcke werden am **Bor** Knoten erzeugt und die Sidechain-VM ist EVM-kompatibel. Die auf Bor produzierten Blöcke werden ebenfalls regelmäßig von Heimdall-Knoten validiert, und ein Checkpoint, der aus dem Merkle-Tree-Hash eines Satzes von Blöcken auf Bor besteht, wird regelmäßig an Ethereum übermittelt.

### Ressourcen {#resources}

- [Bor-Architektur](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Heimdall-Architektur](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [Checkpoint-Mechanismus](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
