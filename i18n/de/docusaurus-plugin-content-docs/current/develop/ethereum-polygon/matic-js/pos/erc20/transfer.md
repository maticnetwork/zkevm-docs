---
id: transfer
title: Übertragung
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Betrag von einer Adresse an eine andere übertragen.'
---

Mit dieser `transfer`-Methode kann ein Betrag von einer Adresse an eine andere Adresse übertragen werden.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
