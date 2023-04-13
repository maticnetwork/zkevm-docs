---
id: transfer
title: transfer
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Transferir tokens de um utilizador para outro.'
---

O método `transfer` pode ser usado para transferir tokens de um utilizador para outro.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
