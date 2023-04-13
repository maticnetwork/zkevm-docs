---
id: adding-a-custom-token
title: Hinzufügen eines benutzerdefinierten Tokens
sidebar_label: Adding a Custom Token
description: Erstelle deine nächste Blockchain-App auf Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Die Funktion **Benutzerdefinierten Token hinzufügen** ermöglicht es dir, jeden Token explizit hinzuzufügen und mit der Polygon Wallet Suite zu verwenden. Du musst den Token nur über dessen Vertragsadresse suchen, entweder Root oder Child-Adresse:

* Die **Root** ist der Token-Vertrag auf Ethereum
* Das **Child** ist der Vertrag auf Polygon

### Wie finde ich den Token-Contract? {#how-do-i-find-the-token-contract}

Du kannst den Token nach seinem Namen entweder auf [Coingecko](http://coingecko.com) oder auf [Coinmarketcap](https://coinmarketcap.com/) suchen, wo du die Adresse auf der Ethereum-Chain (bei ERC 20-Token) und anderen unterstützten nachgeordneten Chains wie Polygon sehen kannst. Die Token-Adresse auf anderen Chains wurde möglicherweise nicht aktualisiert, doch kannst du die Root für alle Zwecke verwenden.

Wenn du einen Token auswählst, kannst du nach folgenden Kriterien suchen:
* Token-Symbol
* Token-Name
* Vertrag

So funktioniert es:

1. Füge deinen Token einfach deiner Liste hinzu, indem du die Vertragsadresse als benutzerdefinierten Token hinzufügst (wir unterstützen

Vertragsadressen auf Polygon oder Ethereum):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. Sobald die Token-Informationen abgerufen wurden, siehst du einen Bestätigungsbildschirm mit allen Token-Informationen. Du kannst ihn dann als benutzerdefinierten Token hinzufügen, der lokal in deinem System gespeichert wird. Wir empfehlen dir, die Token-Verträge doppelt zu überprüfen, da es eine Menge geklonter oder betrügerischer Token gibt:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. Dein hinzugefügter Token wird jetzt angezeigt, wenn du einen Token auswählst:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

Du kannst einen Token auch direkt aus dem Tab Token im Bildschirm **verwalten:**

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>