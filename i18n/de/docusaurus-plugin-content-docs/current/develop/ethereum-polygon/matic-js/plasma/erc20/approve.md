---
id: approve
title: Freigeben
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Den erforderlichen Betrag auf Root-Token freigeben.'
---

Die `approve`-Methode kann zur Freigabe eines erforderlichen Betrags für den Root-Token angewandt werden.

Approve wird benötigt, um den Betrag in die Polygon-Chain einzuzahlen.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
