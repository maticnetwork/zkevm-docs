---
id: transfer
title: transfer
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Trasferisce i token da un utente a un altro utente.'
---

Il metodo `transfer` può essere utilizzato per trasferire token da un utente all'altro utente.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
