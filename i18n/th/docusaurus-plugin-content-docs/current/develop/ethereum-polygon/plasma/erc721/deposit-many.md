---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# deplasmaitMany {#deplasmaitmany}

ใช้เมธอด `deplasmaitMany` เพื่อแยกหลายโทเค็นออกจาก Ethereum เป็นเชน Polygon

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
