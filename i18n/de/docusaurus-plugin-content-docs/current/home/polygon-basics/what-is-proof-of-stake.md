---
id: what-is-proof-of-stake
title: Was ist Proof of Stake?
description: Ein Konsensalgorithmus, der auf Validatoren angewiesen ist.
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

# Proof of Stake (PoS) {#proof-of-stake-pos}

Proof of Stake (PoS) ist eine Kategorie von Konsensalgorithmen für öffentliche Blockchains, die von der wirtschaftlichen [Beteiligung](/docs/maintain/glossary#staking) eines Validators an dem Netzwerk abhängen.

In öffentlichen Blockchains, die auf Proof of Work (PoW) basieren, belohnt der Algorithmus Teilnehmer, die kryptografische Rätsel lösen, um Transaktionen zu validieren und neue Blöcke zu erstellen. PoW Blockchain Beispiele: Bitcoin, früher Ethereum.

Bei PoS-basierten öffentlichen Blockchains schlägt eine Gruppe von Validatoren abwechselnd den nächsten Block vor und stimmt darüber ab. Das Gewicht der Stimme eines jeden Validators hängt von der Höhe seiner Einlage ab – [Stake](/docs/maintain/glossary#staking). Zu den wesentlichen Vorteilen von PoS gehören Sicherheit, geringeres Risiko der Zentralisierung und Energieeffizienz. PoS Blockchain Beispiele: Eth2, Polygon.

Im Allgemeinen sieht ein PoS-Algorithmus wie folgt aus. Die Blockchain verfolgt eine Reihe von Validatoren, und jeder, der die Basis-Kryptowährung der Blockchain besitzt (im Fall von Ethereum Ether), kann ein Validator werden, indem er eine spezielle Art von Transaktion sendet, die seinen Ether in eine Einlage verwandelt. Der Prozess der Erstellung und Genehmigung neuer Blöcke erfolgt dann über einen Konsensalgorithmus, an dem alle aktuellen Validatoren teilnehmen können.

Es gibt viele Arten von Konsensalgorithmen und viele Möglichkeiten, den Validatoren, die am Konsensalgorithmus teilnehmen, Prämien zukommen zu lassen. Dadurch gibt es viele Varianten des Proof of Stake. Aus algorithmischer Sicht gibt es zwei Haupttypen: Chain-basiertes PoS und [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance)-artiges PoS.

Beim **Chain-basierten Proof of Stake** wählt der Algorithmus in jedem Zeitfensters (z. B. alle von 10 Sekunden könnte ein Zeitfenster sein) pseudo-zufällig einen Validator aus und weist diesem Validator das Recht zu, einen einzelnen Block zu erstellen. Dieser Block muss auf einen vorherigen Block zeigen (normalerweise der Block am Ende der zuvor längsten Chain), sodass die meisten Blöcke mit der Zeit zu einer einzigen, stetig wachsenden Chain konvergieren.

Beim **BFT-artigen Proof of stake** wird den Validatoren **nach dem Zufallsprinzip** das Recht zuerkannt, Blöcke *vorzuschlagen*. *Die Einigung darüber, welcher Block kanonisch ist*, erfolgt in einem Mehrrundenprozess, bei dem jeder Validator in jeder Runde eine „Stimme“ für einen bestimmten Block abgibt. Am Ende des Prozesses sind sich alle (ehrlichen und online arbeitenden) Validatoren dauerhaft einig, ob ein bestimmter Block Teil der Chain ist oder nicht. Blöcke können jedoch immer noch *verkettet* werden. Der Hauptunterschied besteht darin, dass der Konsens über einen Block innerhalb eines Blocks zustande kommen kann und nicht von der Länge oder Größe der nachfolgenden Chain abhängt.

Weitere Informationen findest du unter [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

Siehe auch:

* [Delegator](/docs/maintain/glossary#delegator)
* [Validator](/docs/maintain/glossary#validator)
