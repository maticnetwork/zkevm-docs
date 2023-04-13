---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# safeDeposit {#safedeposit}

ใช้เมธอด `safeDeposit` เพื่อฝากโทเค็นจาก Ethereum ไปยังเชน Polygon

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
