---
id: transfer
title: transfer
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'Trasferisce i token da un utente a un altro utente.'
---

Il metodo `transfer` può essere utilizzato per trasferire token da un utente all'altro utente.

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
