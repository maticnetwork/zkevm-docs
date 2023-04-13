---
id: deposit
title: deposit
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'ฝากโทเค็นจาก Ethereum ไปยังเชน Polygon'
---

ใช้เมธอด `deposit` เพื่อฝากโทเค็นจาก Ethereum ไปยังเชน Polygon

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
