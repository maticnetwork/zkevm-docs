---
id: transfer
title: transfer
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'โอนยอดจากที่อยู่หนึ่งไปยังอีกที่อยู่หนึ่ง'
---

ใช้เมธอด `transfer` เพื่อโอนยอดจากที่อยู่หนึ่งไปยังอีกที่อยู่หนึ่ง

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
