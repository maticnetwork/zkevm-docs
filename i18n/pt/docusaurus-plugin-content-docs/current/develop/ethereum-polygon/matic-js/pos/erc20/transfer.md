---
id: transfer
title: transferência
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Transferir um valor de um endereço para outro endereço.'
---

O método `transfer` pode ser usado para transferir valores de um endereço para outro.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
