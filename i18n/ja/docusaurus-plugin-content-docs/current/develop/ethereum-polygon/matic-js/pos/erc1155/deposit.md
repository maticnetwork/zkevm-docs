---
id: deposit
title: 入金
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Matic.jsを使用してERC115トークンの入金'
---

`deposit`メソッドはEthereumからPolygonチェーンに必要な量のトークンを入金するために使用することができます。

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.deposit({
    amount: 1,
    tokenId: '123',
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

**データの**供給はオプションです。