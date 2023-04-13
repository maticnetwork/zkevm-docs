---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Получите информацию об одобренном количестве для пользователя.'
---

Метод `getAllowance` можно использовать для получения информации об одобренном количестве для пользователя.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
