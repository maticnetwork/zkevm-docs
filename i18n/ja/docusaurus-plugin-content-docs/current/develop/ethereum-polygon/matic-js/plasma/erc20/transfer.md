---
id: transfer
title: 転送
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'ERC20 Plasmaトークンを転送する'
---

`transfer`メソッドを使用して、金額を1つのアドレスから別のアドレスに転送できます。

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Maticトークンを転送する {#transfer-matic-token}

MATICは、Polygonのネイティブトークンです。そのためサポートは、アドレスなしでMaticトークンを転送します。

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
