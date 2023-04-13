---
id: mintable-assets
title: Активы Polygon с возможностью произвольного минтинга
description: Мятный и создайте активы в сети Polygon с Fx-Portal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - mintable assets
  - mint
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Активы можно передавать в Ethereum и Polygon chain, а также из них и между ними, с помощью моста PoS. Эти активы включают ERC20, ERC721, ERC1155 и многие другие стандарты токенов. Большинство активов уже существуют в цепочке Ethereum. Однако в Polygon chain также можно создавать новые активы и перемещать их обратно в цепочку Ethereum по мере необходимости. Это может сэкономить много газа и времени, которое тратится на токен mining на Ethereum.

Создание активов в Polygon chain является гораздо более простым и рекомендуемым подходом. **Эти активы могут быть перемещены в цепочку Ethereum, когда это требуется**. Такой тип активов называется **mintable Polygon**.

В случае токены Polygon Mintable создаются активы в сети Polygon. Если актив, минтинг которого выполнен на Polygon, необходимо переместить в Ethereum, этот актив необходимо сначала сжечь, а затем необходимо отправить доказательство этой транзакции сжигания в цепочку Ethereum. Рекомендуемый способ использовать возможности токена Polygon Mintable заключается в использовании [fx-portal](/develop/l1-l2-communication/fx-portal.md).
