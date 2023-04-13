---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# isExitedMany {#isexitedmany}

`isExitedMany`メソッドは、引き出しが終了したかどうかをチェックします。これは、ブーリアンバリューを返します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
