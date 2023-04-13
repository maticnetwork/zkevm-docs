---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'Проверьте, утвержден ли токен с указанным tokenId.'
---

Метод `isApproved` проверяет, утвержден ли токен с указанным tokenId. Он возвращает логическое значение.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
