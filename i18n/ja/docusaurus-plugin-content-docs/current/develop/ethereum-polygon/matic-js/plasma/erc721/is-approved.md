---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: '指定されたtokenIdに対して、トークンが承認されているかどうかを確認します。'
---

`isApproved`メソッドは、指定されたtokenIdに対して、トークンが承認されているかどうかを確認します。これは、ブーリアンバリューを返します。

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
