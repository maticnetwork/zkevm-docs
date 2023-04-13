---
id: checkpoint-mechanism
title: Checkpoint-Mechanismus
sidebar_label: Checkpoints
description: Überprüfen des Systemzustandes auf das Ethereum Mainnet
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

:::info Polygon ist keine Layer 1 Plattform.

Polygon hängt von dem Ethereum Mainnet als Layer 1 Settlement Layer ab. Alle Staking-Mechanismen müssen mit den Verträgen im Ethereum Mainnet synchronisiert sein.

:::

[Proposer](/docs/maintain/glossary.md#proposer) für einen Checkpoint werden zunächst über [den gewichteten Round-robin-Algorithmus von Tendermint’s](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) ausgewählt. Eine weitere benutzerdefinierte Prüfung wird auf der Grundlage der erfolgreichen Übermittlung des Checkpoints durchgeführt. Dies ermöglicht es dem Polygon-System, sich von der Tendermint-Proposer-Auswahl zu entkoppeln und bietet Polygon die Möglichkeit, einen Proposer nur dann auszuwählen, wenn die Checkpoint-Transaktion im Ethereum Mainnet erfolgreich ist, oder eine Checkpoint-Transaktion für die Blöcke früherer fehlgeschlagener Checkpoints einzureichen.

Die erfolgreiche Übermittlung eines Checkpoints auf Tendermint ist ein 2-Phasen-Commit-Prozess:

* Ein über den Round-Robin-Algorithmus ausgewählter Proposer sendet einen Checkpoint mit der Adresse des Proposers und dem Merkle-Hash im Proposer-Feld.
* Alle anderen Proposer validieren die Daten im Feld „Proposer“, bevor sie den Merkle-Hash in ihren Status aufnehmen.

Der nächste Proposer sendet dann eine Bestätigungstransaktion, um zu beweisen, dass die vorherige [Checkpoint-Transaktion](/docs/maintain/glossary.md#checkpoint-transaction) im Ethereum Mainnet erfolgreich war. Jede Änderung der Validatoren wird von dem Validator-Knoten auf [Heimdall](/docs/maintain/glossary.md#heimdall) übertragen, die auf den Validator-Knoten eingebettet ist. Dies ermöglicht es Heimdall, jederzeit mit dem Polygon-Vertragsstatus im Ethereum Mainnet synchronisiert zu bleiben.

Der Polygon-Vertrag, der im Ethereum-Mainnet eingesetzt wird, gilt als die ultimative Quelle der Wahrheit, und daher erfolgt die gesamte Validierung durch Abfrage des Ethereum-Mainnet-Vertrags.
