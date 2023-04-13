---
id: deposit
title: Einzahlung
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'Einen Token von Ethereum auf Polygon Chain einzahlen.'
---

Die `deposit`-Methode kann genutzt werden, um einen Token von Ethereum in die Polygon-Chain einzuzahlen.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
