---
id: transfer
title: paglipat
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Maglipat ng mga token mula sa isang user papunta sa isa pang user.'
---

Maaaring gamitin ang paraang `transfer` upang maglipat ng mga token mula sa isang user papunta sa isa pang user.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
