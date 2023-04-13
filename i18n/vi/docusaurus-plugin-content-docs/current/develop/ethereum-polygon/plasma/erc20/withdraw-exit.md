---
id: withdraw-exit
title: thoát quy trình rút tiền
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# withdrawExit {#withdrawexit}

Có thể sử dụng phương pháp `withdrawExit` để thoát quy trình rút tiền khi đã hoàn tất kỳ thử thách.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
