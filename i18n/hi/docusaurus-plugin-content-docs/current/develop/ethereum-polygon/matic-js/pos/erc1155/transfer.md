---
id: transfer
title: ट्रांसफ़र
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'एक यूज़र से दूसरे यूज़र को टोकन ट्रांसफ़र करें.'
---

`transfer`तरीका एक यूज़र से दूसरे यूज़र को टोकन ट्रांसफ़र करने के लिए इस्तेमाल किया जा सकता है.

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
