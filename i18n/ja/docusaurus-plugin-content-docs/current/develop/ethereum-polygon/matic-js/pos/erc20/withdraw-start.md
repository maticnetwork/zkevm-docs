---
id: withdraw-start
title: 引き出しの開始
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: '引き出すプロセスを開始します。'
---

`withdrawStart`メソッドを使用して、引き出すプロセスを開始して、特定のトークンの量をPolygonチェーンにバーンできます。

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

受け取ったトランザクションハッシュは、引き出すプロセスを終了するために使用されます。そのため、保存することをお勧めします。

