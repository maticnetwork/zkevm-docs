---
id: transfer
title: transfer (Transferencia)
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'Transfiere tokens de un usuario a otro.'
---

El método `transfer`puede utilizarse para transferir tokens de un usuario a otro.

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
