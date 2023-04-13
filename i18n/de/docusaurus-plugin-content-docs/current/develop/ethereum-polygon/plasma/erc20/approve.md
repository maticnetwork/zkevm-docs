---
id: approve
title: Freigeben
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# Freigeben {#approve}

Mit dieser `approve`-Methode kann der erforderliche Betrag des root-Tokens freigegeben werden.

Approve wird benötigt, um den Betrag in die Polygon-Chain einzuzahlen.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
