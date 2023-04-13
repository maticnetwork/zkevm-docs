---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Проверяет, все ли токены утверждены.'
---

Метод `isApprovedAll` проверяет, все ли токены утверждены. Он возвращает логическое значение.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
