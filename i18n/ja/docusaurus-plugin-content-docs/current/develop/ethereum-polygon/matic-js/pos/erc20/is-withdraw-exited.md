---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: '引き出しが終了したかどうかを確認します。'
---

`isWithdrawExited`メソッドは、引き出しが終了したかどうかを知るために使用できます。

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
