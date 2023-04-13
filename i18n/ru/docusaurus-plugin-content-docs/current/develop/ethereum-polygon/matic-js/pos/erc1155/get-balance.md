---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Получите данные об остатке токена ERC1155 с помощью matic.js.'
---

Метод `getBalance` можно использовать для получения данных об остатке токена у пользователя. Он доступен как для дочернего, так и для родительского токенов.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
