---
id: transfer
title: transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Начните работать с maticjs'
---

# Трансфер {#transfer}

Метод `transfer` передает токены от одного пользователя другому.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
