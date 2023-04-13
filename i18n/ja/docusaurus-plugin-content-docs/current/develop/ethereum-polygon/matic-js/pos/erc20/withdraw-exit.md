---
id: withdraw-exit
title: 引き出しの終了
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'withdrawStartからtxHashを使用して引き出すプロセスを終了します。'
---

`withdrawExit`メソッドは、`withdrawStart`メソッドからtxHashを使用して引き出すプロセスを終了するために使用できます。

**注意事項**- 引き出しを終了するには、withdrawStartトランザクションにチェックポイントを設定する必要があります。

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


このメソッドは、証明を生成し、終了処理するために、複数のRPCコールを実行します。そのため、withdrawExitFasterメソッドを使用することをお勧めします。
>

