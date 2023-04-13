---
id: approve
title: 承認
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "ルートトークンで必要な量を承認します。"
---

`approve`メソッドはルートトークンで必要量を承認するために使用することができます。

Polygonチェーンに入金するために承認が必要です。

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

承認が与えられたアドレスは、`spenderAddress`と呼ばれます。これは、サードパーティのユーザーまたはスマートコントラクトであり、代わりにトークンを転送できます。

デフォルトでは、spenderAddress値はERC20述語アドレスです。

スペンダーアドレス値を手動で指定できます。

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
