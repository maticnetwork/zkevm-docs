---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: '引き出しが終了したかどうかを確認します。'
---

`isWithdrawExited`メソッドは、引き出しが終了したかどうかを確認します。これは、ブーリアンバリューを返します。

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
