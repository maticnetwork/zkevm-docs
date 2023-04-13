---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'Keluar dari proses penarikan menggunakan txHash dari withdrawStart.'
---

Metode `withdrawExitMany` dapat digunakan untuk keluar dari proses penarikan dengan menggunakan txHash dari metode `withdrawStartMany`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
