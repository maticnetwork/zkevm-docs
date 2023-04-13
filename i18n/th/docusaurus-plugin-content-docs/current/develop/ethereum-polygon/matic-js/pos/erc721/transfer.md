---
id: transfer
title: transfer
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'โอนโทเค็นจากผู้ใช้รายหนึ่งไปยังผู้ใช้อีกรายหนึ่ง'
---

ใช้เมธอด `transfer` เพื่อโอนโทเค็นจากผู้ใช้รายหนึ่งไปยังผู้ใช้อีกรายหนึ่ง

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
