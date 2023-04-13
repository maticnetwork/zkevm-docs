---
id: transfer
title: transférer
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Transférez le montant d''une adresse à une autre.'
---

`transfer` la méthode peut être utilisée pour transférer un montant d'une adresse à une autre.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
