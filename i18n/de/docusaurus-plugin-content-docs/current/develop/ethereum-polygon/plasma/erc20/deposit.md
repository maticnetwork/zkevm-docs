---
id: deposit
title: Einzahlung
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Erste Schritte mit maticjs'
---

# Einzahlung {#deposit}

Mit dieser `deposit`-Methode kann der erforderliche Betrag vom Root-Token zum Child-Token eingezahlt werden.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
