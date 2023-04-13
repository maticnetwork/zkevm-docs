---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# safeDeposit {#safedeposit}

Có thể sử dụng phương pháp `safeDeposit` để nạp một token từ ethereum sang chuỗi polygon.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
