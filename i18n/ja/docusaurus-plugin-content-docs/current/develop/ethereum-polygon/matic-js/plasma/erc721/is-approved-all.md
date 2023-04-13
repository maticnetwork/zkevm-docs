---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'すべてのトークンが承認されているかどうかを確認します。'
---

`isApprovedAll`メソッドは、すべてのトークンが承認されているかどうかを確認します。これは、ブーリアン値を返します。

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
