---
id: deposit-ether
title: 입금
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: '이더리움에서 Polygon으로 필요한 금액의 **이더**를 입금합니다.'
---

`depositEther` 메서드를 사용해 이더리움에서 Polygon으로 필요한 금액의 **이더**를 입금할 수 있습니다.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
