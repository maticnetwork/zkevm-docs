---
id: who-is-validator
title: Wer ist ein Validator
sidebar_label: Who is a Validator
description: "Ein Teilnehmer im Netzwerk, der die Knoten von Heimdall und Bor betreibt."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Validator ist Teilnehmer im Netzwerk, der MATIC-Token im System speichert und Heimdall Validator und Bor block ausführt, um das Netzwerk zu betreiben. Validatoren setzen ihre MATIC-Token als Sicherheit ein, um für die Sicherheit des Netzwerks zu arbeiten, und erhalten im Gegenzug für ihre Dienste Belohnungen.

Die Belohnungen werden an alle Staker proportional zu ihrem Einsatz an jedem Checkpoint verteilt, mit der Ausnahme, dass der Proposer einen zusätzlichen Bonus erhält. Das Belohnungs-Guthaben des Nutzers wird im Vertrag aktualisiert, auf den man sich bei der Inanspruchnahme von Belohnungen bezieht.

Es besteht die Gefahr, dass die Einsätze gekürzt werden, wenn der Validatorknoten eine böswillige Handlung wie z. B. eine doppelte Unterschrift vornimmt, die auch die verknüpften Delegatoren an diesem Checkpoint betrifft.

:::tip

Diejenigen, die an der Sicherung des Netzwerks interessiert sind, aber keinen vollständigen Knoten betreiben, können als [Delegierte](/docs/maintain/glossary.md#delegator) teilnehmen.

:::

## Übersicht {#overview}

Die Validatoren des Polygon-Netzes werden in regelmäßigen Abständen durch ein verknüpftes Auktionsverfahren ausgewählt. Diese ausgewählten Prüfer fungieren als Blockproduzenten und Prüfer. Sobald ein [Checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) von den Teilnehmern validiert wurde, werden Aktualisierungen auf der übergeordneten Instanz (dem Ethereum Mainnet) vorgenommen, wodurch die Belohnungen für die Validatoren entsprechend ihrem Anteil am Netzwerk freigegeben werden.

Polygon verlässt sich auf eine Reihe von [Validatoren](/docs/maintain/glossary.md#validator), um das Netzwerk zu sichern. Die Rolle der Validatoren besteht darin, einen vollständigen Knoten zu betreiben, [Blöcke zu produzieren](/docs/maintain/glossary.md#block-producer), zu validieren und am Konsens teilzunehmen und [Checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) im Ethereum Mainnet zu übertragen. Um ein Validator zu werden, muss man ihre MATIC-Token mit MATIC [einsetzen](/docs/maintain/glossary.md#staking), die sich im Ethereum Mainnet befinden.

## Kernkomponenten {#core-components}

[Heimdall](/docs/maintain/glossary.md#heimdall) liest die Ereignisse, die von den Staking-Verträgen ausgehen, um die Validatoren für den aktuellen Satz mit ihrem aktualisierten Einsatzverhältnis auszuwählen, das auch von [Bor](/docs/maintain/glossary.md#bor) bei der Erzeugung von Blöcken verwendet wird.

Die [Delegation](/docs/maintain/glossary.md#delegator) wird auch in den Staking-Verträgen festgehalten, und jede Aktualisierung der Validatorenleistung oder der Adresse des [Node-Unterzeichners](/docs/maintain/glossary.md#signer-address) oder der Aufhebung der Bindung wird mit der Übergabe des nächsten Checkpoints wirksam.


## End-to-End-Flow für einen Polygon-Validator {#end-to-end-flow-for-a-polygon-validator}

Validatoren richten ihre Signing Nodes ein, synchronisieren Daten und setzen dann ihre Token bei den Ethereum Mainnet Staking-Verträgen ein, um als Validator im aktuellen Set akzeptiert zu werden. Wenn ein Slot frei ist, wird der Validator sofort akzeptiert. Andernfalls muss man den Austauschmechanismus durchlaufen, um einen Slot zu erhalten.

:::warning

Es gibt nur wenige Möglichkeiten, neue Validatoren zu akzeptieren. Neue Validatoren können sich nur dann dem aktiven Set anschließen, wenn ein gegenwärtig aktiver Validator sich entbindet. Es wird ein neues Auktionsverfahren für den Austausch von Validatoren eingeführt.

:::

Die Blockproduzenten werden aus der Menge der Validatoren ausgewählt, wobei es die Aufgabe der ausgewählten Validatoren ist, Blöcke für eine bestimmte [Spanne](/docs/maintain/glossary.md#span) zu produzieren.

Die Nodes bei Heimdall validieren die produzierten Blöcke, nehmen am Konsens teil und übermitteln in bestimmten Abständen Checkpoints an das Ethereum Mainnet.

Die Wahrscheinlichkeit der Validatoren, als Blockproduzent oder Checkpoint [Proposer](/docs/maintain/glossary.md#proposer) ausgewählt zu werden, ist abhängig von der eigenen Beteiligungsquote einschließlich der Delegationen im Gesamtpool.

Die Validatoren erhalten an jedem Checkpoint Belohnungen entsprechend ihrem Einsatzverhältnis, nach Abzug des Poposer-Bonus, der an den Proposer des Checkpoints ausgezahlt wird.

Man kann jederzeit aus dem System aussteigen und nach Ablauf der Bindungsfrist Token abheben.

## Ökonomie {#economics}

Siehe [Belohnungen](/docs/maintain/validator/rewards).

## Einrichten eines Validatorknotens {#setting-up-a-validator-node}

Siehe [Validieren](/docs/maintain/validate/validator-index).

## Siehe auch {#see-also}

* [Zuständigkeiten der Prüfer](/docs/maintain/validate/validator-responsibilities)
* [Validieren](/docs/maintain/validate/validator-index)
* [Validator FAQ](/docs/maintain/validate/faq/validator-faq)
