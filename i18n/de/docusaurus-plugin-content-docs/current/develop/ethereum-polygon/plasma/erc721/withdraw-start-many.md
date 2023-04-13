---
id: withdraw-start-many
title: WithdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# WithdrawStartMany {#withdrawstartmany}

Die `withdrawStartMany`-Methode kann angewandt werden, um den Auszahlungsvorgang einzuleiten, mit dem der multiple Token auf der Polygon-Chain ausgeschieden wird.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
