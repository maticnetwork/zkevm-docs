---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: '複数のトークンに対して引き出しが終了したかどうか確認します。'
---

`isWithdrawExitedMany`メソッドは、複数のトークンに対して引き出しが終了したかどうかを確認します。これは、ブーリアン値を返します。

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
