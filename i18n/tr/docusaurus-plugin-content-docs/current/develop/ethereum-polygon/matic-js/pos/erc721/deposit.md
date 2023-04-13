---
id: deposit
title: deposit
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'Ethereum''dan polygon zincirine token yatırır.'
---

`deposit` metot bir token'ı ethereum'dan polygon zincirine yatırmak için kullanılabilir.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
