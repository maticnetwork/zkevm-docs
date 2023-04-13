---
id: transfer
title: 転送
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'ユーザーからユーザーにトークンを転送します。'
---

`transfer`メソッドはユーザーから別のユーザーにトークンを転送するために使用できます。

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
