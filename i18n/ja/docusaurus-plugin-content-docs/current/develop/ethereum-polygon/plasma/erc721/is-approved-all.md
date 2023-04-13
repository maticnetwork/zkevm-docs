---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# isApprovedAll {#isapprovedall}

`isApprovedAll`メソッドは、トークンが承認されているかどうをチェックします。これは、ブーリアンバリューを返します。

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
