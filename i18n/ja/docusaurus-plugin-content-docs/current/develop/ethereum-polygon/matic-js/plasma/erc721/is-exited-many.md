---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: '引き出しが終了したかどうかを確認します。'
---

`isExitedMany`メソッドは、引き出しが終了したかどうかを確認します。これは、ブーリアンバリューを返します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
