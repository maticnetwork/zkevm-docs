---
id: submit-mapping-request
title: Token zuordnen
description:  Ein Leitfaden zur Abbildung von Token zwischen Ethereum und Polygon Chains mit der PoS Bridge
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Das Mapping ist notwendig, um deine Assets an und von Ethereum und Polygon PoS zu übertragen. Wir bieten dafür zwei Bridges an. Mehr Details zur Bridge können [hier](/develop/ethereum-polygon/getting-started.md) verstanden werden.

:::tip

Die Polygon PoS Bridge ist sowohl für Polygon Mainnet als auch für Mumbai Testnet verfügbar.

:::

## Schritte zur Übermittlung einer Mapping-Anfrage {#steps-to-submit-a-mapping-request}

Um Token zwischen Ethereum und Polygon PoS abzubilden, kannst du den [Polygon Token Mapper](https://mapper.polygon.technology/) verwenden. Öffne den Link und klicke auf den Button **Map New Token**, um eine neue Mapping-Anfrage zu initiieren.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Schritt 1 →** Wählen Sie das Netzwerk aus, auf dem Sie Ihren Token zuordnen möchten. Du kannst **Goerli-Mumbai** für Testnet und **Ethereum-Polygon PoS** für den Mainnet wählen.

**Schritt 2 →** Wählen Sie den Token-Typ aus, den Sie zuordnen möchten, - **ERC20**, **ERC721** oder **ERC1155**.

**Schritt 3 →** Gib deine **Ethereum/Goerli** Token-Adresse im Feld **Ethereum Token Address** ein. Vergewissere dich, dass dein Token-Vertragscode auf den **Ethereum/Goerli** Ethereum/Goerli überprüft wurde.

**Schritt 4 →** Nach dem Hinzufügen der **Ethereum Token-Adresse** werden die entsprechenden Felder viz. **Token-Name, Token-Symbol und Token Decimal** automatisch mit den Vertragsdetails ausgefüllt.

**Schritt 5 →** Klicken Sie nun auf die **Schaltfläche Zuordnung** beginnen, um den Zuordnungsvorgang zu initiieren. Da dies eine Ethereum-Transaktion beinhaltet, musst du deine Wallet verbinden, um fortzufahren.

**Schritt 6 →** Dir wird ein Review Modal mit den Token-Informationen und den geschätzten Gasgebühren angezeigt, um die Zuordnung abzuschließen. Überprüfe die Details und starte die mapping indem du die Schaltfläche **Pay Gas Fee To Map** auswählst.

Nachdem du die Transaktion von deinem Wallet bestätigt hast, musst du warten, bis die Transaktion auf Ethereum abgeschlossen ist. Sobald die Transaktion abgeschlossen ist, werden dir die success mit deiner Child-Token-Adresse im Polygon PoS Netzwerk angezeigt. Du kannst die Zuordnung weiterhin überprüfen, indem du die generierte Child-Token-Adresse auf [Polygonscan](https://polygonscan.com/) überprüfst.

Für eine erfolgreiche Mainnet können Sie Ihre token [hier](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) angeben, die auf der [**Polygon Token-Liste**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json) hinzugefügt werden.

:::tip

Im Falle einer [<ins>benutzerdefinierten token</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-) kannst du unsere [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) besuchen und die bereitgestellten Informationen verwenden, um deine benutzerdefinierte FX zu erstellen, um Token abzubilden.

:::

## Video Guide {#video-guide}

Hier ist ein schnelles Video-Tutorial zur Abbildung von Token zwischen **Ethereum Goerli ↔ Polygon Mumbai Testnet**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Dein Browser unterstützt das Video-Element nicht.</p>
</video>
