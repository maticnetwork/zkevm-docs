---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Pagsisimula sa maticjs'
---

# withdrawStartMany {#withdrawstartmany}

Maaaring gamitin ang paraang `withdrawStartMany`upang pasimulan ang proseso ng pag-withdraw na siyang magbu-burn sa maraming token sa polygon chain.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
