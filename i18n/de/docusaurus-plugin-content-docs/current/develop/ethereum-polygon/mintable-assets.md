---
id: mintable-assets
title: Polygon Mintable Assets
description: Mint und erstelle Assets im Polygon Netzwerk mit Fx-Portal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - mintable assets
  - mint
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Mit der PoS-Bridge können Assets hin und zurück über Ethereum und die Polygon-Kette übertragen werden. Diese Assets umfassen ERC20, ERC721, ERC1155 und viele andere Token-Standards. Die meisten Assets existieren schon auf der Ethereum-Chain. Aber auch auf der Polygon-Kette können neue Assets erstellt und nach Bedarf wieder in die Ethereum-Kette zurückgegeben. Dies kann viel Gas und Zeit sparen, die für token auf Ethereum ausgegeben wird.

Erstellen von Assets auf der Polygon-Kette ist viel einfacher. Von daher ist dieser Ansatz vorzuziehen. **Diese Assets können bei Bedarf in die Ethereum Chain verschoben werden**. Solche Assets werden **Polygon mintable Assets** genannt.

Im Falle von Polygon Mintable Tokens werden Assets im Polygon Netzwerk erstellt. Wenn ein Polygon Minted Asset zu Ethereum verschoben werden muss, muss dieser Asset zuerst gebrannt werden. Dann muss ein Nachweis für diese Burn-Transaktion auf der Ethereum-Kette übermittelt werden. Die empfohlene Art, Polygon Mintable Token zu nutzen, ist die Nutzung des [fx-portal](/develop/l1-l2-communication/fx-portal.md).
