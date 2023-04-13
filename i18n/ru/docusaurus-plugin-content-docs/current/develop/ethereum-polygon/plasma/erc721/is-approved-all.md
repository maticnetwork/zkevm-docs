---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Начните работать с maticjs'
---

# isApprovedAll {#isapprovedall}

Метод `isApprovedAll` проверяет статус утверждения всех токенов. Он возвращает логическое значение.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
