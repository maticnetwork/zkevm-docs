---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Проверьте, были ли утверждены все токены.'
---

Метод `isApprovedAll` обеспечивает проверку того, были ли утверждены все токены для пользователя. Он возвращает логическое значение.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
