---
id: what-is-proof-of-stake
title: Was ist Proof of Stake?
description: Erfahre was ist Proof of Stake Consensus Mechanismus
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Was ist Proof of Stake? {#what-is-proof-of-stake}

Proof of Stake (PoS) ist eine Kategorie von Konsensalgorithmen für öffentliche Blockchains, die von der wirtschaftlichen [Beteiligung](/docs/maintain/glossary.md#staking) eines Validators an dem Netzwerk abhängen.

In öffentlichen Blockchains, die auf Proof of Work (PoW) basieren, belohnt der Algorithmus Teilnehmer, die kryptografische Rätsel lösen, um Transaktionen zu validieren und neue Blöcke zu erstellen. PoW Blockchain Beispiele: Bitcoin, Ethereum (vor dem Merge).

Bei PoS-basierten öffentlichen Blockchains schlägt eine Gruppe von Validatoren abwechselnd den nächsten Block vor und stimmt darüber ab. Das Gewicht der Stimme eines jeden Validators hängt von der Höhe seiner Einlage ab – [Stake](/docs/maintain/glossary.md#staking). Zu den wesentlichen Vorteilen von PoS gehören Sicherheit, geringeres Risiko der Zentralisierung und Energieeffizienz. PoS blockchain Beispiele: Ethereum 2.0, Polygon.

Im Allgemeinen sieht ein PoS-Algorithmus wie folgt aus. Die Blockchain verfolgt einen Überblick über einen Satz von Prüfern, und jeder, der die Basis-Kryptowährung der Blockchain hält (im Fall von Ethereum) kann ein Prüfer werden, indem eine spezielle Art von Transaktion sendet, die ihre ETH in eine Einzahlung einschließt. Der Prozess der Erstellung und Genehmigung neuer Blöcke erfolgt dann über einen Konsensalgorithmus, an dem alle aktuellen Validatoren teilnehmen können.

Es gibt viele Arten von Konsensalgorithmen und viele Möglichkeiten, den Validatoren, die am Konsensalgorithmus teilnehmen, Prämien zukommen zu lassen. Dadurch gibt es viele Varianten des Proof of Stake. Aus algorithmischer Sicht gibt es zwei große Arten: chain-based PoS und [BFT-Style PoS](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

Beim **Chain-basierten Proof of Stake** wählt der Algorithmus in jedem Zeitfensters (z. B. alle von 10 Sekunden könnte ein Zeitfenster sein) pseudo-zufällig einen Validator aus und weist diesem Validator das Recht zu, einen einzelnen Block zu erstellen. Dieser Block muss auf einen vorherigen Block zeigen (normalerweise der Block am Ende der zuvor längsten Chain), sodass die meisten Blöcke mit der Zeit zu einer einzigen, stetig wachsenden Chain konvergieren.

In **BFT-style Proof of Stake** werden Prüfer **zufällig** das Recht zugewiesen, Blöcke **vorzuschlagen.** Einigung, auf welchem Block **kanonisch** ist, wird durch einen multi-round durchgeführt, bei dem jeder Prüfer während jeder Runde eine **Vote** für einen bestimmten Block sendet, und am Ende des Prozesses stimmen alle (ehrlich und online) Prüfer dauerhaft zu, ob ein bestimmter Block Teil der Chain ist oder nicht. Beachten Sie, dass Blöcke noch **zusammen verkettet** werden können. Der wesentliche Unterschied ist, dass der Konsens über einen Block in einem Block kommen kann und nicht von der Länge oder Größe der Chain abhängt.

Weitere Details findest du unter [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

## Siehe auch {#see-also}

* [Delegator](/docs/maintain/glossary.md#delegator)
* [Validator](/docs/maintain/glossary.md#validator)
