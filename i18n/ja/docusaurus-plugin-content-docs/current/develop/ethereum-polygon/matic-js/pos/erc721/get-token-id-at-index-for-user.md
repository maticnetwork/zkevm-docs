---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'ユーザーに付与されたインデックスでトークンIDを取得します。'
---

`getTokenIdAtIndexForUser`メソッドは、ユーザーに付与されたインデックスのトークンIDを返します。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
