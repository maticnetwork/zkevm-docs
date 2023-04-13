---
id: transfer
title: transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Выполните трансфер токенов от одного пользователя другому.'
---

Метод `transfer` выполняет трансфер токенов от одного пользователя другому.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
