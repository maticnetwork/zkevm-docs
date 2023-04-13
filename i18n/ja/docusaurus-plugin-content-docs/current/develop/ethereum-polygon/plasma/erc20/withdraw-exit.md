---
id: withdraw-exit
title: 終了を引き出す
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# withdrawExit {#withdrawexit}

チャレンジ期間が完了したら、`withdrawExit`メソッドを使用して引き出すプロセスを終了できます。

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
