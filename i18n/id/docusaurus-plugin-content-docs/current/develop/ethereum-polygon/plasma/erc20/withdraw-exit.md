---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# withdrawExit  {#withdrawexit}

Metode `withdrawExit` dapat digunakan untuk keluar dari proses penarikan setelah periode tantangan selesai.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
