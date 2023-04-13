---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: 'Thoát quy trình rút tiền bằng txHash từ "withdrawStartMany"'
---

Có thể sử dụng phương pháp `withdrawExitMany` để thoát quy trình rút tiền bằng txHash từ phương pháp `withdrawStartMany`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
