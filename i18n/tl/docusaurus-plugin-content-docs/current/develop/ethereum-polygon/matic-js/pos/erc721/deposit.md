---
id: deposit
title: deposit
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'Magdeposito ng token mula sa ethereum papunta sa polygon chain.'
---

Maaaring gamitin ang paraang `deposit` upang magdeposito ng token mula sa ethereum papunta sa polygon chain.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
