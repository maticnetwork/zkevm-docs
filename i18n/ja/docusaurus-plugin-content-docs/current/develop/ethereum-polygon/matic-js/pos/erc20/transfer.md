---
id: transfer
title: 転送
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'アドレスから他のアドレスにトークンの量を転送します。'
---

`transfer`メソッドを使用して、トークン の量を1つのアドレスから別のアドレスに転送できます。

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
