---
id: key-management
title: Key-Management
description: Signer- und owner
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Jeder Validator verwendet zwei Schlüssel, um validatorbezogene Aktivitäten auf Polygon zu verwalten:

* Signierschlüssel
* Eigentümerschlüssel

## Signierschlüssel {#signer-key}

Der Signierschlüssel ist die Adresse, die zum Signieren von Heimdall-Blöcken, Checkpoints und anderen signierbezogenen Aktivitäten verwendet wird.

Der private Schlüssel der Signieradresse muss sich auf dem Rechner befinden, auf dem der Validierungsknoten zum Zwecke des Signierens läuft.

Der Signierschlüssel kann Staking, Belohnungen oder Delegationen nicht verwalten.

Der Validator muss ETH auf der Signieradresse im Ethereum Mainnet behalten, um [Checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) zu senden.

## Eigentümerschlüssel {#owner-key}

Der Eigentümerschlüssel ist die Adresse, die zum Stoppen, Wiedereinspielen, Ändern des Signierschlüssels, Auszahlungen abzunehmen und delegation Parameter im Ethereum Mainnet verwaltet. Der private Schlüssel für den Eigentümerschlüssel muss auf jeden Fall sicher sein.

Alle Transaktionen über den Eigentümerschlüssel werden im Ethereum Mainnet durchgeführt.

Der Signierschlüssel wird am Knoten gehalten und wird im Allgemeinen als **Hot** Wallet betrachtet, während der Eigentümerschlüssel sehr sicher gehalten wird, selten verwendet wird und im Allgemeinen als **Cold** Wallet gilt. Das eingesetzte Geld wird durch den Eigentümerschlüssel kontrolliert.

Diese Trennung der Zuständigkeiten zwischen dem Signierer und dem Eigentümer der Schlüssel erfolgt, um einen effizienten Kompromiss zwischen Sicherheit und Benutzerfreundlichkeit zu gewährleisten.

Beide Schlüssel sind Ethereum-kompatible Adressen und arbeiten auf die gleiche Weise.

## Signiererwechsel {#signer-change}

Siehe [Ändern Ihrer Signieradresse](/docs/maintain/validate/change-signer-address).
