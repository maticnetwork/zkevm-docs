---
id: deposit
title: 입금
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Maticjs를 시작합니다'
---

# 입금 {#deposit}

`deposit` 메서드를 사용해 루트 토큰에서 하위 토큰으로 필요한 금액을 입금할 수 있습니다.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
