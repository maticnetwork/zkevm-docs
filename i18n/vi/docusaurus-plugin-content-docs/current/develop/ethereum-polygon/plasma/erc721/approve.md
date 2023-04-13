---
id: approve
title: phê duyệt
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# phê duyệt {#approve}

Có thể sử dụng phương pháp `approve` để phê duyệt số lượng cần thiết cho token gốc.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
