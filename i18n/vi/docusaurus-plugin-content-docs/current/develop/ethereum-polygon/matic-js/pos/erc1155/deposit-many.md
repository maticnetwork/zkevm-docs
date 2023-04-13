---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Nạp nhiều lần cho token ERC1155 bằng matic.js'
---

Có thể sử dụng phương pháp `depositMany` để nạp số lượng cần thiết của nhiều token từ ethereum vào chuỗi polygon.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.depositMany({
    amount: [1,2],
    tokenId: ['123','456'],
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Việc cung cấp **dữ liệu** là tùy chọn.