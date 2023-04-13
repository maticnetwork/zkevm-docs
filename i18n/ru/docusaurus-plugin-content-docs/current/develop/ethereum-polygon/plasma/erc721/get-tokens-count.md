---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Начните работать с maticjs'
---

# getTokensCount {#gettokenscount}

Метод `getTokensCount` возвращает данные о количестве токенов для указанного пользователя.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
