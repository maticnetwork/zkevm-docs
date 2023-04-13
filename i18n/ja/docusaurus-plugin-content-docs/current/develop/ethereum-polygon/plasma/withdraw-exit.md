---
id: withdraw-exit
title: 終了を引き出す
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# withdrawExit {#withdrawexit}

Plasma引き出しプロセスでは、`withdrawExit`メソッドを使用して、誰でも終了できます。終了プロセスは、チャレンジ期間が完了した後にのみ機能します。

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

トークンリストを配列で指定することにより、複数のトークンを終了することもできます。
