---
id: approve
title: phê duyệt
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: 'Phê duyệt số lượng cần thiết cho token gốc'
---

Có thể sử dụng phương pháp `approve` để phê duyệt số lượng cần thiết cho token gốc.

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
