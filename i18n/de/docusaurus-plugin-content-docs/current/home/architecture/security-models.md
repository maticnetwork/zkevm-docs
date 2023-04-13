---
id: security-models
title: Sicherheitsmodelle
description: PoS, Plasma und Hybrid Securities
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Sicherheitsmodelle {#security-models}

Polygon bietet drei Arten von Sicherheitsmodellen für einen Entwickler, um ihre dApps zu erstellen:

1. [Proof of Stake-Sicherheit](#proof-of-stake-security)
2. [Plasma-Sicherheit](#plasma-security)
3. [Hybrid (Plasma + PoS)](#hybrid)

Wir haben jedes dieser Sicherheitsmodelle beschrieben, die von Polygon angeboten werden, und den developer für jedes mit einem Beispiel dApp unten beschrieben.

## Proof of Stake-Sicherheit {#proof-of-stake-security}

Der Proof of Stake (PoS) wird von der Heimdall & Bor-Ebene bereitgestellt, die auf Tendermint aufbaut. Ein Checkpoint wird der Rootchain nur dann zugefügt, wenn 2/3 der Prüfer es angemeldet haben.

Um den PoS-Mechanismus auf unserer Plattform zu ermöglichen, setzen wir eine Reihe von Staking Management Contracts auf Ethereum sowie eine Reihe von anreizbasierten Prüfern auf Heimdall- und Bor-Knoten ein. Dies setzt die folgenden Funktionen um:

- Die Fähigkeit für jedermann, MATIC-Token auf dem Ethereum intelligenten Vertrag zu verwenden und dem System als Prüfer beizutreten
- Staking-Belohnungen für die Prüfung von Zustandsübergängen auf Polygon zu verdienen

Der PoS-Mechanismus wirkt auch als eine Minderung des Problems der Nichtverfügbarkeit von Daten für unsere Sidechains in Bezug auf Plasma.

Wir haben eine schnelle Endebene, die den Sidechain-Status periodisch über Checkpoints abschließt. Das schnelle Ende hilft uns, den Sidechain-Status festzuhalten. Die EVM-kompatible Kette hat wenige Prüfer und eine schnellere Blockzeit mit hohem Durchsatz. Es wählt Skalierbarkeit über hohe Grade der Dezentralisierung. Heimdall stellt sicher, dass der Endzustand sicher ist und über einen großen Prüfer läuft und somit eine hohe Dezentralisierung aufweist.

**Für Entwickler**

Als dApp Developer auf der Basis der PoS Sicherheit ist das Verfahren so einfach wie die Annahme deines Smart Contracts und die Bereitstellung auf dem Polygon PoS Netzwerk. Dies ist aufgrund der kontenbasierten Architektur möglich, die eine EVM-kompatible Sidechain ermöglicht.

## Plasma-Sicherheit {#plasma-security}

Polygon stellt "Plasma in Bezug auf verschiedene Angriffsszenarien zur Verfügung. Zwei betrachtete Hauptfälle sind:

- Chain Operator (oder in Polygon, der Heimdall ist korrupt oder
- Der Benutzer ist beschädigt

In jedem Fall, wenn die Assets eines Benutzers auf der plasma kompromittiert wurden, müssen sie mit dem mass beginnen. Polygon bietet Konstruktionen auf dem Rootchain intelligenten Vertrag, die genutzt werden können. Für weitere Details und technische Spezifikationen zu diesem betrachteten Bau- und Angriffsvektoren lies [hier](https://ethresear.ch/t/account-based-plasma-morevp/5480).

Im Prinzip bieten die Polygon-Wallets mit Plasma-Verträgen Sicherheit für Ethereum. Die Mittel von Benutzern sind nur Gefahren ausgesetzt, wenn Ethereum ausfällt. Einfach ausgedrückt, ist eine Plasma-Chain ebenso sicher wie die Haupt-Chain eines Konsensmechanismus. Dies kann extrapoliert werden, um zu sagen, dass die plasma wirklich einfache Konsensmechanismen verwenden kann und trotzdem sicher sein kann.

**Für Entwickler**

Als dApp Entwickler musst du benutzerdefinierte Prädikate für deine Smart Contracts schreiben, wenn du auf Polygon mit Plasma-Sicherheitsgarantie aufbauen möchtest. Das bedeutet im Grunde das Schreiben der externen Verträge, die die dispute behandeln, die von den Polygon plasma festgelegt werden.

## Hybrid {#hybrid}

Neben der reinen Plasma-Sicherheit und der reinen Proof of Stake-Sicherheit, die in dApps auf Polygon bereitgestellt wird, gibt es auch einen Hybrid-Ansatz, dem Entwickler folgen können - was einfach bedeutet, dass sowohl Plasma- als auch Proof of Stake-Garantien für einige bestimmte Workflows der dApp gewährleistet werden.

Dieser Ansatz wird besser mit einem Beispiel verstanden.

Betrachte eine Gaming dApp mit einer Reihe von Smart Contracts, die die Logik des Spiels beschreiben. Nehmen wir an, das Spiel verwendet seinen eigenen erc20-Token, um die Spieler zu belohnen. Die intelligenten Verträge, die die Spiellogik definieren, können jetzt direkt auf der Polygon-Sidechain bereitgestellt werden. So wird die Proof of Stake-Sicherheit der Verträge gewährleistet, während die erc20-Token-Übertragung mit Plasma-Garantie und Betrugsnachweis in den Polygon Rootchain-Verträgen gesichert werden kann.
