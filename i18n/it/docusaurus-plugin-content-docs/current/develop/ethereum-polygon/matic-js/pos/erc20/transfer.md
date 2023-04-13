---
id: transfer
title: transfer
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Trasferisce un importo da un indirizzo a un altro.'
---

Il metodo `transfer` può essere utilizzato per trasferire l'importo da un indirizzo a un altro.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
