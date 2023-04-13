---
id: getting-started
title: PoS-Bridge
sidebar_label: Introduction
description: Mehr Flexibilität und schnellere Auszahlungen mit Polygon POS.
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

Bitte lies die neueste [Matic.js-Dokumentation über PoS](../matic-js/get-started.md), um loszulegen.

Eine Bridge besteht aus einer Reihe von Verträgen und ermöglicht es dir, Assets von der Root-Chain zur Child-Chain zu verschieben. Es gibt zwei Haupt-Bridges, um Assets zwischen Ethereum und Polygon zu verschieben. Die erste ist die Plasma-Brücke und die zweite wird als **PoS Bridge** oder **Proof of Stake Bridge** bezeichnet. **Die Plasma-Bridge** bietet aufgrund des Plasma-Exit-Mechanismus eine erhöhte Sicherheitsgarantie.

Allerdings gibt es bestimmte Einschränkungen für das Child-Token und eine 7-tägige Einspruchsfrist für alle Exits/Auszahlungen von Polygon zu Ethereum über die Plasma-Bridge.

Das ist ein Problem für alle DApps/Nutzer, die eine gewisse **Flexibilität** und **schnellere Auszahlungen** benötigen und mit dem Sicherheitsniveau der Polygon Proof-of-Stake-Bridge zufrieden sind, welche durch robuste externe Validatoren gesichert ist.

Assets auf Proof-of-Stake-Basis bieten PoS-Sicherheit und einen schnelleren Ausstieg mit einem Checkpoint-Intervall.

## So nutzt du die PoS-Bridge {#steps-to-use-the-pos-bridge}

Bevor wir in diesen Abschnitt der Dokumente einsteigen, kann es helfen, ein gründliches Verständnis für einige Begriffe zu haben, während du mit ihnen interagierst, während du versuche, die Bridge zu verwenden: [Mapping](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) und den [State Sync Mechanismus](https://docs.polygon.technology/docs/pos/state-sync/state-sync/) zu verwenden.

Der erste Schritt zur Verwendung der PoS-Bridge ist dann das Zuordnen von **Root Token** und **Child Token**. Das bedeutet, dass der Token-Vertrag über die Root-Chain und der Token-Vertrag über die Child-Chain eine Verbindung aufrechterhalten müssen (genannt Mapping), um Assets zwischen sich zu übertragen. Wenn du an einer Mapping-Anfrage interessiert bist, mache dies mit [diesem Leitfaden](/docs/develop/ethereum-polygon/submit-mapping-request/).

Auf einer niedrigeren Ebene und mit mehr Details geschieht das:

### Einzahlung {#deposit}

  1. Der Inhaber des Asset-Tokens **(ERC20/ERC721/ERC1155)** muss einen bestimmten Vertrag über die PoS-Bridge genehmigen, um die übertragenen Token auszugeben. Dieser Vertrag wird **Prädikatvertrag** (im Ethereum-Netzwerk bereitgestellt) genannt und **sperrt die einzuzahlenden Token**.
  2. Sobald die Genehmigung erteilt wurde, ist der nächste Schritt **das Einzahlen des Assets**. Auf `RootChainManager`dem Vertrag muss ein Funktionsaufruf erfolgen, der wiederum den `ChildChainManager`Vertrag auf der Polygon Chain auslöst.
  3. Das passiert über einen State-Sync-Mechanismus, über den du [hier](/docs/pos/state-sync/state-sync/) mehr erfährst.
  4. Der ruft `ChildChainManager`intern die `deposit`Funktion des Child-Token-Vertrags auf, und die entsprechende Menge an Asset-Token wird **auf das Konto des Benutzers angezeigt.** Es ist wichtig zu beachten, dass nur die auf die `deposit`Funktion auf dem Child-Token-Vertrag zugreifen `ChildChainManager`können.
  5. Sobald der Benutzer die Token bekommt, können diese **sofort gegen eine sehr geringe Gebühr auf die Polygon-Chain übertragen** werden.

### Auszahlungen {#withdrawals}

  1. Die Zurückziehung von Assets an Ethereum ist ein 2-stufiger Prozess, in dem der Asset-Token **zuerst auf der Polygon-Chain verbrannt** werden muss und dann der **Nachweis dieser** Burn-Transaktion auf der Ethereum-Chain übermittelt werden muss.
  2. Es dauert zwischen 20 Minuten und 3 Stunden, bis die Burn-Transaktion einen Checkpoint in der Ethereum-Chain erreicht. Das wird über Proof of Stake-Validatoren durchgeführt.
  3. Sobald die Transaktion zum Checkpoint hinzugefügt wurde, kann der Nachweis der Burn-Transaktion auf dem `RootChainManager`Vertrag auf Ethereum übermittelt werden, indem du die Funktion `exit`aufrufst.
  4. Dieser Funktionsaufruf **überprüft die Checkpoint-Einbindung** und löst dann den Predicate-Vertrag aus, der die Asset-Token gesperrt hatte, nachdem die Assets eingezahlt wurden.
  5. Als letzten Schritt gibt der **predicate die gesperrten Token frei** und erstattet sie dem Benutzerkonto auf Ethereum zurück.

:::tip

Sobald das Mapping abgeschlossen ist, kannst du das **matic.js SDK** verwenden, um mit den Verträgen zu kommunizieren. Das ist auch ohne SDK möglich. Das matic.js SDK ist allerdings eine sehr benutzerfreundliche Möglichkeit, um die Asset-Übertragung einfach in jede Anwendung zu integrieren.

:::