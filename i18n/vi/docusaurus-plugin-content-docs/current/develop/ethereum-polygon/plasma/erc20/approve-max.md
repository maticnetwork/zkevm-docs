---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# approveMax {#approvemax}

Có thể sử dụng phương pháp `approveMax` để phê duyệt số lượng tối đa cho token gốc.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
