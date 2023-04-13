---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'Keluar dari proses penarikan menggunakan txHash dari withdrawStart.'
---

Metode `withdrawExit` dapat digunakan untuk keluar dari proses penarikan dengan menggunakan txHash dari metode `withdrawStart`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
