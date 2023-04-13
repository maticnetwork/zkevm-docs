---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'Lancez le processus de retrait.'
---

`withdrawStartMany`la méthode  peut être utilisée pour lancer le processus de retrait qui brûlera les quantités spécifiées de plusieurs jetons, de façon respective, sur la chaîne Polygone.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
