---
id: transfer
title: transférez
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'Transférez des jetons d''un utilisateur à un autre.'
---

`transfer`la méthode peut être utilisée pour transférer des jetons d'un utilisateur à un autre.

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
