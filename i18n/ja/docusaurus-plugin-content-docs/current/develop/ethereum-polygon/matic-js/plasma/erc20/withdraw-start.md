---
id: withdraw-start
title: 引き出しの開始
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: '引き出すプロセスを開始します。'
---

`withdrawStart`メソッドを使用して、子トークンに指定された金額をバーンする引き出すプロセスを開始できます。

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

引き出すプロセスにチャレンジするために使用するtxHashを格納します。
