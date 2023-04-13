---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Maticjsを始めましょう'
---

`withdrawExitFasterMany`メソッドは、すべてのトークンを承認するために使用できます。

バックエンドでプルーフを生成するため高速です。バックエンドは、専用のプライベートのリモートプロシージャコール（RPC）を用いて設定できます。

**注記**- 引き出しを終了するには、withdrawStartトランザクションにチェックポイントを設定する必要があります。

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
