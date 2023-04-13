---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: '「withdrawStart」からtxHashを使用して、引き出しプロセスを終了します。'
---

`withdrawExit`メソッドは、`withdrawStart`メソッドからtxHashを使用して、引き出すプロセスを終了するために使用できます。

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


このメソッドは、証明を生成し、終了処理するために、複数のRPCコールを実行します。そのため、withdrawExitFasterメソッドを使用することをお勧めします。
>
