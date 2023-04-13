---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'すべてのトークンが承認されているかどうか確認します。'
---

`isApprovedAll`メソッドは、ユーザーのすべてのトークンが承認されているかどうかを確認します。これは、ブーリアン値を返します。

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
