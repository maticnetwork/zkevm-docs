---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "ユーザーの承認された量を取得します。"
---

`getAllowance`メソッドは、ユーザーの承認された量を取得するために使用することができます。

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

承認が与えられたアドレスは、`spenderAddress`と呼ばれます。これは、サードパーティのユーザーまたはスマートコントラクトであり、代わりにトークンを転送できます。

デフォルトでは、spenderAddress値はERC20述語アドレスです。

スペンダーアドレス値を手動で指定できます。

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
