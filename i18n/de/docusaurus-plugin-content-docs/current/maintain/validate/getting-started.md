---
id: validator-index
title: Prüfer Index
description: Eine Sammlung von Anweisungen zum Ausführen und Betreiben von Prüferknoten im Polygon Network
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Immer auf dem Laufenden

Behalte mit den neuesten Node und validator aus dem Polygon Team und der Community fort, indem du [Polygon Benachrichtigungen](https://polygon.technology/notifications/) abonnierst.

:::

Die Prüfer sind die Hauptakteure bei der Pflege des Polygon-Netzwerks. Prüfer betreiben einen Vollknoten und sichern
das Netzwerk, indem sie MATIC einsetzen, um Blöcke zu produzieren, zu validieren und am PoS-Konsens teilzunehmen.

:::info

Es gibt nur wenige Möglichkeiten, neue Validatoren zu akzeptieren. Neue Validatoren können sich nur dann dem aktiven Set anschließen, wenn ein derzeit aktiver Prüfer seine Bindung aufhebt.

Es wird ein neues Auktionsverfahren für den Austausch von Validatoren eingeführt.

:::

## Übersicht {#overview}

Polygon besteht aus den drei folgenden Layern:

* Ethereum-Layer – eine Reihe von Contracts auf dem Ethereum Mainnet.
* Heimdall-Layer – eine Reihe von Proof-of-Stake-Heimdall-Knoten, die parallel zum Ethereum Mainnet laufen und die im Ethereum Mainnet eingesetzten Staking-Contract überwachen und die Polygon Netzwerk.-Checkpoints an das Ethereum Mainnet übermitteln. Heimdall basiert auf Tendermint.
* Bor-Layer – eine Reihe von blockproduzierenden Bor-Knoten gemischt mit Heimdall-Knoten. Bor basiert auf Go Ethereum.

Um ein Prüfer im Polygon-Netzwerk zu sein, musst du Folgendes tun:

* Sentry-Knoten – – eine separate Maschine, auf der ein Heimdall-Knoten und ein Bor-Knoten ausgeführt werden. Ein Sentry-Knoten ist für alle Knoten im Polygon-Netzwerk offen.
* Prüfknoten – eine separate Maschine mit einem Heimdall-Knoten und einem Bor-Knoten. Ein Prüfknoten ist nur für seinen Sentry-Knoten offen und für den Rest des Netzwerks geschlossen.
* Setze die MATIC-Token in die Staking-Contracts ein, die im Ethereum Mainnet eingesetzt werden.

## Komponenten {#components}

### Heimdall {#heimdall}

Heimdall hat folgende Aufgaben:

* Überwacht die Staking-Contracts im Ethereum Mainnet.
* Überprüft alle Statusübergänge in der Bor-Chain
* Überträgt den Status der Bor Chain-Checkpoints an das Ethereum Mainnet.

Heimdall basiert auf Tendermint.

:::info Siehe auch

* GitHub-Repository: [Heimdall](https://github.com/maticnetwork/heimdall)
* GitHub-Repository: [Staking-Contracts](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* Blog-Post: [Heimdall und Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Bor hat folgende Aufgaben:

* Erstellt Blöcke im Polygon-Netzwerk.

Bor ist der Block Producer-Knoten und der Layer für das Polygon-Netzwerk. Es basiert auf Go Ethereum. Blöcke, die auf Bor produziert werden, werden von Heimdall-Knoten validiert.

:::info Siehe auch

* GitHub-Repository: [Bor](https://github.com/maticnetwork/bor)
* Blog-Post: [Heimdall und Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

Dieser Leitfaden führt dich durch die folgenden Themen:

* [Zuständigkeiten der Prüfer](validator-responsibilities.md)
* Dem Netzwerk als Prüfer beitreten:
  * [Knoten mit Ansible starten und ausführen](run-validator-ansible.md)
  * [Knoten mit Binaries starten und ausführen](run-validator-binaries.md)
  * [Stake als Prüfer](validator-staking-operations.md)
* Wartung deiner Prüfknoten:
  * [Ändere die Signier-Adresse](change-signer-address.md)
  * [Ändere die Provision](validator-commission-operations.md)

Gemeinschaftsbeteiligung

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
