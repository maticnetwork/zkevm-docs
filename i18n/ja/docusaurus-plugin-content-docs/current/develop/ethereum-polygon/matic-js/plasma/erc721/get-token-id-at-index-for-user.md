---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'ユーザーに付与されたインデックスでトークンIDを返します。'
---

`getTokenIdAtIndexForUser`メソッドは、ユーザーに付与されたインデックスのトークンIDを返します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
