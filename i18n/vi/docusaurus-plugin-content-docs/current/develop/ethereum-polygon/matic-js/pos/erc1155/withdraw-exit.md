---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'Thoát quy trình rút tiền bằng txHash từ withdrawStart.'
---

Có thể sử dụng phương pháp `withdrawExit` để thoát quy trình rút tiền bằng txHash từ phương pháp `withdrawStart`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
