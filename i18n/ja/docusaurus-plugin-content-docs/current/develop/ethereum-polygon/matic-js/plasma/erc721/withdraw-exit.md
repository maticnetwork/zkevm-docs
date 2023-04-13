---
id: withdraw-exit
title: 引き出しの終了
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: '引き出すプロセスを終了します。'
---

挑戦する期間が完了したら、`withdrawExit`メソッドを使用して引き出すプロセスを終了できます。

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
