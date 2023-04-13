---
id: transfer
title: transfer
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Выполните трансфер определенного количества с одного адреса на другой.'
---

Метод `transfer` можно использовать для трансфера определенного количества с одного адреса на другой.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
