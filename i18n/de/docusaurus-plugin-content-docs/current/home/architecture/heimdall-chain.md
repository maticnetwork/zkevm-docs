---
id: heimdall-chain
title: Was ist die Heimdall Chain?
sidebar_label: Heimdall Chain
description: Erstelle die nächste Blockchain-App auf Polygon.
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - checkpoint
  - pos
  - verifier
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Heimdall Chain {#heimdall-chain}

Heimdall ist der Polygon Proof-of-Stake Verifier-Layer, der für das Checkpointing einer Repräsentation der Plasma-Blöcke in die Mainchain in unserer Architektur verantwortlich ist. Wir haben dies implementiert, indem wir auf der Tendermint-Konsens-Engine aufbauten und das Signaturschema sowie verschiedene Datenstrukturen änderten.

Der Main Chain Stake Manager arbeitet in Verbindung mit dem Heimdall-Knoten daran, als vertrauensloser Stake management für die PoS Engine zu fungieren, einschließlich der Auswahl des Prüfer-Set, der Aktualisierung von Prüfern usw. Da das Staking tatsächlich auf dem Ethereum Smart Contract durchgeführt wird, verlassen wir uns nicht nur auf die validator und erbe stattdessen Ethereum Chain Security für diesen wichtigen Teil.

Der Heimdall-Layer sorgt für die Aggregation der von Bor erzeugten Blöcke zu einem Merkle-Tree und veröffentlicht die Merkle-Root regelmäßig in der Root-Chain. Dieses periodische Publishing nennt sich **"checkpoint"**. Für alle paar Blöcke auf Bor wird ein Validator (auf dem Heimdall-Layer):

1. Alle Blöcke seit dem letzten Checkpoint überprüfen
2. Einen Merkle-Tree der Block-Hashes erstellen
3. Die Merkle-Root in der Mainchain veröffentlichen

Checkpoints sind aus zwei Gründen wichtig:

1. Für die Gewährleistung der Endgültigkeit der Root Chain
2. Für die Gewährleistung des Proof of Burn bei der Entnahme von Assets

Allgemein lässt sich der Prozess folgendermaßen erklären:

- Es wird eine Teilmenge aktiver Validatoren aus dem Pool ausgewählt, um für eine gewisse Zeitspanne als Block Producer zu fungieren. Die Auswahl für jede Spanne wird ebenfalls mit mindestens 2/3 der Stimmen getroffen. Diese Blockproduzenten sind dafür verantwortlich, Blöcke zu erstellen und an das verbleibende Netzwerk zu übertragen.
- Ein Checkpoint enthält die Root aller Blöcke, die während eines bestimmten Intervalls erstellt wurden. Alle Knoten validieren dieselbe und fügen ihre Signaturen an sie an.
- Ein ausgewählter Proposer aus dem validator ist für das Sammeln aller Signaturen für einen bestimmten Prüfpunkt verantwortlich und für den Auftrag auf der Hauptkette.
- Die Zuständigkeit für die Erstellung von Blöcken und das Vorschlagen von Checkpoints hängt von dem Anteil eines Validators am Gesamtpool ab.