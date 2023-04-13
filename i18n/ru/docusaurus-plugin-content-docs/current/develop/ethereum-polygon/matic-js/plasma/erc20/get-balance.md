---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'Получите информацию об остатке пользователя.'
---

Метод `getBalance` можно использовать для получения информации об остатке пользователя. Он доступен как для дочернего, так и для родительского токенов.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
