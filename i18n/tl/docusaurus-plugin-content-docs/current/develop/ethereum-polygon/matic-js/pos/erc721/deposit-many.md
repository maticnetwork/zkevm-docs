---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'Magdeposito ng maraming token mula sa ethereum papunta sa polygon chain.'
---

Maaaring gamitin ang paraang `depositMany` upang magdeposito ng maraming token mula sa ethereum papunta sa polygon chain.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
