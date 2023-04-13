---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'ฝากหลายโทเค็นจาก Ethereum ไปยังเชน Polygon'
---

ใช้เมธอด `depositMany` เพื่อฝากหลายโทเค็นจาก Ethereum ไปยังเชน Polygon ได้

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
