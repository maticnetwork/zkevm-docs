---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: '引き出しが終了したかどうかを確認します。'
---

`isWithdrawExited`メソッドは、引き出しが終了したかどうかを確認します。これは、ブーリアンバリューを返します。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
