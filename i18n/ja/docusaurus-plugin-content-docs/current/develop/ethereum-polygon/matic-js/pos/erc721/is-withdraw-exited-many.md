---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: '複数のトークンに対して引き出しが終了したかどうかを確認します。'
---

`isWithdrawExitedMany`メソッドは、複数のトークンに対して引き出しが終了したかどうかを確認します。これは、ブーリアン値を返します。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
