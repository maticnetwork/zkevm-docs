---
id: rewards
title: Belohnungen
sidebar_label: Rewards
description: Erfahren Sie mehr über die Anreize für das Polygon-Netzwerk.
keywords:
  - docs
  - matic
  - polygon
  - rewards
  - staking
  - incentives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Eine Einführung in Polygon und den Proof of Stake Algorithmus findest du unter [Was ist Proof of Stake](/docs/home/polygon-basics/what-is-proof-of-stake)

In Polygon setzen Validatoren ihre MATIC-Token als Sicherheiten ein, um für die Sicherheit des Netzwerks zu arbeiten. Im Austausch für ihren Dienst Belohnungen zu verdienen.

Um die Ökonomie von Polygon zu nutzen, sollten Sie entweder ein Validator oder ein Delegator werden.

Um ein [Validator](/docs/maintain/glossary.md#validator) zu sein, müssen Sie **einen vollständigen Validatorknoten** und Stake MATIC ausführen. Siehe [Validieren](/docs/maintain/validate/validator-index).

Überprüfe auch die Seite [Validator Responsibilities](/docs/maintain/validate/validator-responsibilities)

Um ein [Delegator](/docs/maintain/glossary.md#delegator) zu sein, müssen Sie **MATIC nur an einen Validator delegieren**. Siehe [Delegieren](/docs/maintain/delegate/delegate).

## Was ist der Anreiz? {#what-is-the-incentive}

Polygon weist 12 % seines Gesamtangebots von 10 Milliarden Token zu, um die Staking-Belohnungen zu finanzieren. Damit soll sichergestellt werden, dass das Netzwerk gut genug ausgestattet ist, bis die Transaktionsgebühren greifen. Diese Belohnungen sind in erster Linie dazu bestimmt, das Netzwerk zu starten, während das Protokoll auf lange Sicht auf die Grundlage von Transaktionsgebühren aufrechterhalten soll.

**Validator-Belohnungen = Staking-Belohnungen + Transaktionsgebühren**

Dieser Betrag wird so zugewiesen, dass eine allmähliche Entkopplung der Einsatzprämien von der dominierenden Komponente der Validatorprämien gewährleistet ist.

| Jahr | Zieleinsatz (30 % des zirkulierenden Angebots) | Belohnung für 30 % Verbindung | Belohnungspool |
|---|---|---|---|
| Erster | 1,977,909,431 | 20 % | 312,917,369 |
| Zweiter | 2,556,580,023 | 12 % | 275,625,675 |
| Dritter | 2,890,642,855 | 9 % | 246,933,140 |
| Vierter | 2,951,934,048 | 7 % | 204,303,976 |
| Fünfter | 2,996,518,749 | 5 % | 148,615,670 + **11,604,170** |

Nachfolgend finden Sie ein Beispiel für die erwarteten jährlichen Erträge der ersten 5 Jahre bei einem Einsatz von 5 % bis 40 % in einem Intervall von 5 %.

| % des zirkulierenden Angebots verwedet | 5 % | 10 % | 15 % | 20 % | 25 % | 30 % | 35 % | 40 % |
|---|---|---|---|---|---|---|---|---|
| Jährliche Belohnung für das Jahr |
| Erster | 120 % | 60 % | 40 % | 30 % | 24 % | 20 % | 17,14 % | 15 % |
| Zweiter | 72 % | 36 % | 24 % | 18 % | 14,4 % | 12 % | 10,29 % | 9 % |
| Dritter | 54 % | 27 % | 18 % | 13,5 % | 10,8 % | 9 % | 7,71 % | 6,75 % |
| Vierter | 42 % | 21 % | 14 % | 10,5 % | 8,4 % | 7 % | 6 % | 5,25 % |
| Fünfter | 30 % | 15 % | 10 % | 7,5 % | 6 % | 5 % | 4,29 % | 3,75 % |

## Wer erhält die Anreize? {#who-gets-the-incentives}

Staker, die Validatorknoten und Staker, die ihre Token an einen Validator delegieren, den sie bevorzugen.

Validatoren haben die Möglichkeit, eine Provision für die von Delegatoren verdiente Belohnung zu berechnen.

Die Gelder aller Staker sind in einem Vertrag im Ethereum Mainnet verankert.

Kein Validator hat das Recht auf Delegator-Token.

## Staking-Belohnungen {#staking-rewards}

Der jährliche Anreiz ist absolut – unabhängig vom Gesamteinsatz oder der angestrebten Bindungsrate im Netzwerk wird der Anreizbetrag regelmäßig als Belohnung an alle Signierer ausgezahlt.

In Polygon gibt es ein zusätzliches Element des Übertragens von regelmäßigen [Checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) im Ethereum Mainnet. Dies ist ein wichtiger Teil der Aufgaben der Validatoren, und sie werden dazu angehalten, diese Tätigkeit auszuführen. Dies ist ein Kostenfaktor für den Validator, der nur bei einer Layer-2-Lösung wie Polygon anfällt. Wir bemühen uns, diese Kosten in den Auszahlungsmechanismus des Validator Staking Rewards einzubeziehen, und zwar als Bonus, der an den [Proposer](/docs/maintain/glossary.md#proposer) gezahlt wird, der für die Begehung des Checkpoints verantwortlich ist. Prämien abzüglich des Bonus sind auf alle Staker, Proposer und [Signierer](/docs/maintain/glossary.md#signer-address), proportional zu teilen.

## Ermutigen des Proposers, alle Signaturen einzubeziehen {#encouraging-the-proposer-to-include-all-signatures}

Um den Bonus vollständig zu nutzen, muss der [Proposer](/docs/maintain/glossary.md#proposer) alle Signaturen im [Checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) enthalten. Da das Protokoll 2/3 +1 Gewicht des Gesamteinsatzes wünscht, wird der Checkpoint auch mit 80 % Stimmen angenommen. In diesem Fall erhält der Proposer jedoch nur 80 % des berechneten Bonus.

## Transaktionsgebühren {#transaction-fees}

Jeder Blockproduzent bei [Bor](/docs/maintain/glossary.md#bor) erhält einen bestimmten Prozentsatz der in jedem Block erhobenen Transaktionsgebühren. Die Auswahl der Produzenten für jede bestimmte Spanne ist auch von dem Verhältnis des Validators im Gesamteinsatz abhängig. Die verbleibenden Transaktionsgebühren fließen durch denselben Kanal wie die Belohnungen, die unter allen Validatoren aufgeteilt werden, die auf der Ebene von [Heimdall](/docs/maintain/glossary.md#heimdall) arbeiten.
