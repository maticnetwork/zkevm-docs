---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'อนุมัติโทเค็น ERC1155'
---

# approveAll {#approveall}

`approveAll`สามารถใช้วิธีการเพื่ออนุมัติโทเค็นทั้งหมดบนโทเค็นรากได้

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
