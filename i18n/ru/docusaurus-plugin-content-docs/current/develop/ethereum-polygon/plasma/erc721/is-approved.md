---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Начните работать с maticjs'
---

# isApproved {#isapproved}

Метод `isApproved` проверяет, утвержден ли токен для указанного tokenId. Он возвращает логическое значение.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
