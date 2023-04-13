---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: 'Keluar dari proses penarikan menggunakan txHash dari `withdrawStartMany`'
---

Metode `withdrawExitMany` dapat digunakan untuk keluar dari proses penarikan dengan menggunakan txHash dari metode `withdrawStartMany`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
