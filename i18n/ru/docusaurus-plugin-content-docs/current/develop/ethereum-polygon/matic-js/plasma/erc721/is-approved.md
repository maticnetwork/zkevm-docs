---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Проверяет, утвержден ли токен с указанным tokenId.'
---

Метод `isApproved` проверяет, утвержден ли токен с указанным tokenId. Он возвращает логическое значение.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
