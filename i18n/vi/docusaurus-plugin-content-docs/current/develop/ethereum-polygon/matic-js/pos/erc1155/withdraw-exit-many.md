---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'Thoát quy trình rút tiền bằng txHash từ withdrawStart.'
---

Có thể sử dụng phương pháp `withdrawExitMany` để thoát quy trình rút tiền bằng txHash từ phương pháp `withdrawStartMany`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
