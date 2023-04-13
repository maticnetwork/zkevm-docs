---
id: transfer
title: paglipat
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'Maglipat ng mga token mula sa isang user papunta sa isa pang user.'
---

Maaaring gamitin ang paraang `transfer` upang maglipat ng mga token mula sa isang user papunta sa isa pang user.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.transfer({
    tokenId: <tokenId>,
    amount: <amount>,
    from : <from address>,
    to : <to address>,
    data : <data to sent>, // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
