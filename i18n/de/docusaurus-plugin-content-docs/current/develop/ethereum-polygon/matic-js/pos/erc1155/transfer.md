---
id: transfer
title: übertragen
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'Token von einem Benutzer zu einem anderen übertragen.'
---

`transfer` Methode kann verwendet werden, um Token von einem Benutzer an einen anderen zu übertragen.

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
