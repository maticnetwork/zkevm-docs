---
id: transfer
title: chuyển
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'Chuyển token từ người dùng này sang người dùng khác.'
---

Có thể sử dụng phương pháp `transfer` để chuyển token từ người dùng này sang người dùng khác.

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
