---
id: heimdall-chain
title: Heimdall Chain
description: Proof-of-Stake Verifier Layer auf dem Polygon Network
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

Heimdall ist die Proof-of-Stake Verifier-Schicht, die für die [Überprüfung](/docs/maintain/glossary.md#checkpoint-transaction) der Darstellung der Plasma-Blöcke auf das Ethereum mainnet zuständig ist. Heimdall basiert auf [Tendermint](https://tendermint.com/).

Der Staking-Vertrag im Ethereum Mainnet arbeitet mit dem Heimdall-Knoten zusammen, um als vertrauenswürdiger Stake-Management-Mechanismus für die PoS-Engine zu fungieren, einschließlich der Auswahl des [Validator](/docs/maintain/glossary.md#validator)-Sets, der Aktualisierung der Validatoren usw. Da der Einsatz im Vertrag auf dem Ethereum Mainnet erfolgt, verlässt sich Polygon nicht nur auf die Ehrlichkeit der Validatoren und übernimmt stattdessen die Sicherheit des Ethereum Mainnet.

Der Heimdall-Layer sorgt für die Aggregation der von [Bor](/docs/maintain/glossary.md#bor) erzeugten Blöcke zu einem Merkle-Tree und veröffentlicht die Merkle-Root regelmäßig im Ethereum Mainnet. Diese regelmäßige Veröffentlichung wird *Checkpointing* genannt.

Für alle paar Blöcke auf Bor wird ein Validator (auf dem Heimdall-Layer):

1. Überprüft alle Blöcke seit dem letzten Checkpoint.
2. Erstellt einen Merkle des Block-Hashes.
3. Veröffentlicht den Merkle-Root im Ethereum Mainnet.

Checkpoints sind aus zwei Gründen wichtig:

1. Bereitstellung von Finalität auf der Root Chain.
2. Gewährleistung des Proof-of-Burn bei der Abhebung von Assets.

Eine Übersicht des Prozesses:

* Eine Untermenge von aktiven Validatoren aus dem Pool wird ausgewählt, um für eine [Spanne](/docs/maintain/glossary.md#span) als [Blockproduzenten](/docs/maintain/glossary.md#block-producer) zu fungieren. Diese Blockproduzenten sind für die Erstellung von Blöcken und die Verbreitung der erstellten Blöcke im Netz verantwortlich.
* Ein Checkpoint enthält die Merkle-Root-Hash aller Blöcke, die während eines bestimmten Intervalls erstellt wurden. Alle Knoten prüfen dieselbe Merkle-Root-Hash und fügen ihr ihre Signatur hinzu.
* Ein ausgewählter [Proposer](/docs/maintain/glossary.md#proposer) aus der Validatoren-Gruppe ist dafür verantwortlich, alle Signaturen für einen bestimmten Checkpoint zu sammeln und in das Ehtereum Mainnet zu übertragen.
* Die Zuständigkeit für die Erstellung von Blöcken und das Vorschlagen von Checkpoints hängt von dem Stake eines Validators am Gesamtpool ab.

Siehe auch [Heimdall-Architektur](/docs/pos/heimdall/overview).
