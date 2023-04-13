---
id: custom-tokens
title: Benutzerdefinierte Token konfigurieren
description: Konfiguriere benutzerdefinierte Token auf Metamask.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Diese Seite zeigt den Prozess der Konfiguration/Hinzufügen von benutzerdefinierten Token zu Metamask.

Du kannst denselben Prozess verwenden, um benutzerdefinierte Token in jedem Netzwerk auf Metamask. hinzuzufügen. Du kannst auf [diese Tabelle](#tokens-and-contract-adresses) verweisen, um einige Beispiele von Test-Token mit ihren jeweiligen Vertragsadressen zu visualisieren.

## Hinzufügen eines benutzerdefinierten Tokens zu deinem MetaMask {#adding-a-custom-token-to-your-metamask-account}

Wählen Sie zuerst das geeignete Netzwerk für den neuen Token auf dem Startbildschirm Ihrer Metamask. Klicken Sie dann auf "Token importieren".

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

Es navigiert dich dann zu einem neuen Bildschirm. Kopiere auf dem Bildschirm Tokens importieren, eine Adresse im Feld Token Address ein.

:::info
Um diesen Prozess zu veranschaulichen, verwenden wir einen E**RC20-TESTV4 **Token im **Goerli-Netzwerk.** Weitere Test-Token aus anderen Netzwerken [<ins>findest du hier</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Die anderen Felder werden automatisch ausgefüllt. Klicken Sie auf Benutzerdefinierte Token hinzufügen und dann auf Token importieren. Das `TEST`-Token sollte nun auf deinem Konto bei Metamask angezeigt werden.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Hinzufügen eines ERC1155-Tokens zu deinem Metamask-Konto**

Während das Polygon-Netzwerk ERC1155 unterstützt, [unterstützt Metamask den Standard noch nicht](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). Dieses Update wird im vierten Quartal 2021 erwartet.

### Token und Vertragsadressen {#tokens-and-contract-adresses}

| Token | Netzwerk | Vertragsadresse |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |