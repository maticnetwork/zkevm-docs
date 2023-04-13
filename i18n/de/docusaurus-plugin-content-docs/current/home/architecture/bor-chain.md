---
id: bor-chain
title: Was ist BoR-Chain?
sidebar_label: Bor Chain
description: Einführung in die Bor Chain oder die Sidechain VM für Polygon PoS
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bor Chain {#bor-chain}

Der Bor Knoten oder die block ist im Grunde der Sidechain-Operator. Die Sidechain-VM ist EVM-kompatibel. Derzeit handelt es sich um eine grundlegende Geth-Implementierung mit benutzerdefinierten Änderungen am Konsensalgorithmus. Sie wird jedoch von Grund auf neu aufgebaut, um sie schlank und fokussiert zu machen.

Die Block Producer werden aus dem Validator-Set ausgewählt und unter Verwendung historischer Ethereum-Blockhashes für den gleichen Zweck gemischt. Wir erforschen jedoch Quellen der Zufälligkeit für diese Auswahl.