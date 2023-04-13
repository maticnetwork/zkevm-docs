---
id: overview
title: Übersicht
description: Der Bor-Knoten ist im Grunde der Sidechain-Operator
keywords:
  - docs
  - matic
  - polygon
  - bor
  - geth
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor {#bor}

Der Bor Knoten oder die Block-Producer-Implementierung ist im Grunde der Sidechain-Operator. Die Sidechain-VM ist EVM-kompatibel. Derzeit handelt es sich um eine grundlegende Geth-Implementierung mit benutzerdefinierten Änderungen am Konsensalgorithmus. Sie wird jedoch von Grund auf neu aufgebaut, um sie schlank und fokussiert zu machen.

Die Block Producer werden aus dem Validator-Set ausgewählt und unter Verwendung historischer Ethereum-Blockhashes für den gleichen Zweck gemischt. Wir erforschen jedoch Quellen der Zufälligkeit für diese Auswahl.