---
id: deposit
title: nạp
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Nạp token ERC1155 bằng matic.js'
---

Có thể sử dụng phương pháp `deposit` để nạp số lượng token yêu cầu từ ethereum sang chuỗi polygon.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.deposit({
    amount: 1,
    tokenId: '123',
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Việc cung cấp **dữ liệu** là tùy chọn.