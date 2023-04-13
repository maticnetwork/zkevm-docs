---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Проверяет, утверждены ли все токены.'
---

Метод `isApprovedAll` проверяет, утверждены ли все токены. Он возвращает логическое значение.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
