---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: 'Pasimulan ang proseso ng pag-withdraw.'
---

Maaaring gamitin ang paraang `withdrawStartMany` upang pasimulan ang proseso ng pag-withdraw na siyang magbu-burn sa maraming token sa polygon chain.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
