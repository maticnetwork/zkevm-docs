---
id: transfer
title: übertragen
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Token von einem Benutzer zu einem anderen übertragen.'
---

`transfer` Methode kann verwendet werden, um Token von einem Benutzer an einen anderen zu übertragen.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
