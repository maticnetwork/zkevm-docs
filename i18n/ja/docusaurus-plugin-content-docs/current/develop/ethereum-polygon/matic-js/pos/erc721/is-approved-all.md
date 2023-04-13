---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'すべてのトークンが承認されているかどうかを確認します。'
---

`isApprovedAll`メソッドは、トークンが承認されているかどうを確認します。これは、ブーリアンバリューを返します。

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
