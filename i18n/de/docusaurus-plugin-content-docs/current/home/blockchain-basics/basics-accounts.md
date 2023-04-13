---
id: accounts
title: Was sind Konten?
sidebar_label: Accounts
description: "EOAs und Vertragskonten."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Was sind Konten? {#what-are-accounts}

Global gesehen setzt sich Ethereum aus Konten zusammen, die untereinander über ein Nachrichtenübertragungs-Framework interagieren. Die grundlegende Interaktion ist, dass du einen Wert sendest, wie MATIC Token, Polygon native Token oder $ETH, den native Token der Ethereum Blockchain (nativ) versendest.

Jedes Konto wird durch eine 20-Byte-Hex-Identifikation identifiziert, die als Adresse bezeichnet wird - die aus dem öffentlichen Key des Accounts generiert wird.

Es gibt zwei Arten von Konten: **Externes Owned Account** und **Contract Accounts**.

## Externe Besitzkonten {#externally-owned-accounts}

EOA sind Konten, die von einem privaten Key kontrolliert werden, mit der Möglichkeit, Token und Nachrichten zu senden.

1. Sie können Transaktionen senden (ether oder trigger
2. werden von privaten Keys kontrolliert,
3. und keinen zugehörigem Code haben.

## Vertragliche Besitzkonten {#contract-owned-accounts}
Contract Owned Account sind Konten, die einen zugehörigen Smart contract mit ihm haben, und ihr Private Key ist nicht im Besitz von niemandem.

1. Sie haben Code zugeordnet,
2. ihre Code-Ausführung durch Transaktionen oder Nachrichten (Calls) ausgelöst wird, die von anderen Kontrakten erhalten werden,
3. und wenn dieser Code ausgeführt wird - er führt Operationen der willkürlichen Komplexität (Turing Vollständigkeit) - manipuliert seine eigene persistente Speicherung und kann andere Verträge aufrufen.

### Ressourcen {#resources}

- [Mehr über Konten erfahren](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
