---
id: approve
title: 승인
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Maticjs를 시작합니다'
---

# 승인 {#approve}

`approve` 메서드를 사용해 루트 토큰에서 필요한 금액을 승인할 수 있습니다.

Polygon 체인에서 금액을 입금하려면 승인이 필요합니다.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
