---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'ルートトークンで最大量を承認します。'
---

`approveMax`メソッドはルートトークンで最大量を承認するために使用することができます。

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

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
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
