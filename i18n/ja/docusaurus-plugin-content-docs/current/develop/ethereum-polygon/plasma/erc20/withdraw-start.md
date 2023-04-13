---
id: withdraw-start
title: スタートを引き出す
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# withdrawStart {#withdrawstart}

`withdrawStart`メソッドを使用して、子トークンに指定された額をバーンする引き出すプロセスを開始できます。

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

引き出すプロセスにチャレンジするために使用するtxHashを格納します。
