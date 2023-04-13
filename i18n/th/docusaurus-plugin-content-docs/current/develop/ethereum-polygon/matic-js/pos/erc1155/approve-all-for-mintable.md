---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'อนุมัติโทเค็น ERC1155 ที่มินต์ได้'
---

# approveAllForMintable {#approveallformintable}

ใช้เมธอด `approveAllForMintable` เพื่ออนุมัติโทเค็นที่มินต์ได้ทั้งหมดบนโทเค็นต้นทาง

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
