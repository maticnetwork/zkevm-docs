---
id: glossary
title: Glossar
description: Key Polygon Begriffe
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Block Producer {#block-producer}

Ein Block Producer ist ein aktiver [Prüfer](#validator), der ausgewählt wird, und fungiert für eine [Spanne](#span) als Prüfer.

Ein Block Producer ist dafür verantwortlich, Blöcke zu erstellen und die erstellten Blöcke an das Netzwerk zu senden.

## Bor {#bor}

Ein Bor-Knoten ist ein Knoten, der Blöcke im Polygon-Netzwerk produziert.

Bor basiert auf [Go Ethereum](https://geth.ethereum.org/).

## Checkpoint-Transaktion {#checkpoint-transaction}

Eine Checkpoint-Transaktion ist eine Transaktion, die die Merkle-Root der Blöcke des [Bor](#bor)-Layers zwischen den Checkpoint-Intervallen enthält.

Die Transaktion wird von einem [Heimdall](#heimdall)-Knoten an die Polygon Staking-Contracts im Ethereum Mainnet übertragen.

Siehe auch:

* [Heimdall-Architektur: Checkpoint](/docs/pos/heimdall/checkpoint)
* [Checkpoint-Mechanismus](/docs/maintain/validator/core-components/checkpoint-mechanism)

## Provision {#commission}

Eine Provision ist der prozentuale Anteil der Prämien, den die [Prüfer](#validator) von den [Delegatoren](#delegator) erhalten, die mit den Prüfern staken.

Siehe auch [Prüfer-Betriebskommission](/docs/maintain/validate/validator-commission-operations)

## Delegator {#delegator}

Die Delegator-Rolle setzt die MATIC-Token ein, um das Polygon-Netzwerk mit bestehenden [Prüfern](#validator) zu sichern, ohne die Knoten selbst zu betreiben.

Siehe auch [Wer ist ein Delegator](/docs/maintain/polygon-basics/who-is-delegator).

## Vollknoten {#full-node}

Ein Vollknoten ist ein vollständig synchronisierter [Sentry-Knoten](#sentry), auf dem sowohl [Heimdall](#heimdall) als auch [Bor](#bor) ausgeführt werden.

Siehe auch [Vollknoteneinsatz](/docs/develop/network-details/full-node-deployment).

## Heimdall {#heimdall}

Ein Heimdall-Knoten ist ein Knoten, der parallel zum Ethereum Mainnet läuft, die im Ethereum Mainnet eingesetzten Contracts überwacht und die Polygon-Network [Checkpoints](#checkpoint-transaction) an das Ethereum Mainnet überträgt.

Heimdall basiert auf [Tendermint](https://tendermint.com/).

## Eigentümeradresse {#owner-address}

Eine Eigentümeradresse ist die Adresse, die verwendet wird, um im Ethereum Mainnet Einsätze zu tätigen, die Signer-Adresse zu ändern, Prämien abzuheben und delegationsbezogene Parameter zu verwalten.

Während der [Signer-Key](#signer-address) auf dem Knoten gehalten wird und als **Hot**-Wallet gilt, muss der Inhaberschlüssel sehr sicher aufbewahrt werden. Er wird nur selten benutzt und gilt als **Cold**-Wallet.

Siehe auch [Key-Management](validator/core-components/key-management.md).

## Antragsteller {#proposer}

Ein Antragsteller ist der [Prüfer](#validator), der vom Algorithmus ausgewählt wird, um einen neuen Block vorzuschlagen.

Ein Antragsteller ist auch dafür verantwortlich, alle Unterschriften für einen bestimmten [Checkpoint](#checkpoint-transaction) zu sammeln und den Checkpoint an das Ethereum Mainnet zu übermitteln.

## Sentry {#sentry}

Ein Sentry-Knoten ist ein Knoten, der sowohl den [Heimdall](#heimdall)-Knoten als auch den [Bor](#bor)-Knoten ausführt, um die Daten von anderen Knoten im Netzwerk herunterzuladen und die [Prüfer](#validator)-Daten im Netzwerk zu verteilen.

Ein Sentry-Knoten ist offen für alle anderen Sentry-Knoten im Netzwerk.

## Spanne {#span}

Eine logisch definierte Menge von Blöcken, für die ein Satz von Prüfern aus allen verfügbaren [Prüfern](#validator) ausgewählt wird.

Die Auswahl eines jeden Feldes wird von mindestens 2/3 der Prüfer in Bezug auf die Einsatzstärke entschieden.

Siehe auch [Bor Konsens: Spanne](/docs/pos/bor/consensus.md#span).

## Staking {#staking}

Beim Staking werden Token in ein Depot gesperrt, um das Recht zu erwerben, Blöcke auf einer Blockchain zu validieren und zu produzieren. Normalerweise wird Staking im nativen Token für das Netzwerk durchgeführt, denn der MATIC Token wird von Prüfern / Stakers im Polygon Network gesperrt. Andere Beispiele sind ETH in Ethereum (post-merge), ATOM in Cosmos usw.

Siehe auch [Was ist der Proof of Stake?](polygon-basics/what-is-proof-of-stake.md).

## Signer-Adresse {#signer-address}

Eine Signer-Adresse ist die Adresse eines Ethereum-Kontos des [Heimdall](#heimdall)-Prüfknotens. Die Signer-Adresse unterschreibt und reicht die [Checkpoint-Transaktionen](#checkpoint-transaction) ein.

Während der Signer-Key auf dem Knoten gehalten wird und als Ho**t-W**allet gilt, muss der In[haberschl](#owner-address)üssel sehr sicher aufbewahrt werden. Er wird nur selten benutzt und g**ilt **als Cold-Wallet.

Siehe auch [Key-Management](validator/core-components/key-management.md).

## Validator {#validator}

Prüfer [stake ihre MATIC-Token](/docs/maintain/validate/validator-staking-operations) über Staking Contracts, die auf dem Ethereum Mainnet bereitgestellt werden, und führen sowohl den [Heimdall](#heimdall)-Knoten als auch den [Bor](#bor) Knoten aus, um die Netzwerk-Checkpoints auf dem Ethereum Mainnet zu begehen und Blöcke im Netzwerk zu erzeugen.

Ein Prüfknoten ist nur für seinen [Sentry](#sentry)-Knoten offen und für den Rest des Netzwerks geschlossen.

Siehe auch [Wer ist ein Prüfer](polygon-basics/who-is-validator.md).
