---
id: transfer
title: paglipat
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Maglipat ng halaga mula sa isang address papunta sa isa pang address.'
---

Maaaring gamitin ang paraang `transfer` upang maglipat ng halaga mula sa isang address papunta sa isa pang address.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
