---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'Получите данные о количестве токенов для указанного пользователя.'
---

Метод `getTokensCount` возвращает данные о количестве токенов для указанного пользователя.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
