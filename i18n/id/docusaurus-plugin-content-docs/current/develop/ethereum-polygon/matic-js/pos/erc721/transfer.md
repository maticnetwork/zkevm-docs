---
id: transfer
title: transfer
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Mentransfer token dari satu pengguna ke pengguna lainnya.'
---

Metode `transfer` dapat digunakan untuk mentransfer token dari satu pengguna ke pengguna lainnya.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
