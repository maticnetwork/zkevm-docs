---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Maticjs를 시작합니다'
---

# approveMax {#approvemax}

`approveMax` 메서드를 사용해 루트 토큰의 최대 금액을 승인할 수 있습니다.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
