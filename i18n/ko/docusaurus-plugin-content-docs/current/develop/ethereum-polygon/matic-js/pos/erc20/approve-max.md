---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: '루트 토큰의 최대 금액을 승인합니다.'
---

`approveMax` 메서드를 사용해 루트 토큰의 최대 금액을 승인할 수 있습니다.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

승인이 이루어지는 주소는 `spenderAddress`라고 합니다. 사용자를 대신하여 토큰을 이전할 수 있는 제삼자 사용자 또는 스마트 계약입니다.

기본적으로 spenderAddress 값은 ERC20 조건자 주소입니다.

지출자 주소 값은 수동으로 지정할 수 있습니다.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
