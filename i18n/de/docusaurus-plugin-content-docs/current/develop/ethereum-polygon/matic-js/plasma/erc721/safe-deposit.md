---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Einen Token von Ethereum auf Polygon Chain einzahlen.'
---

Die `safeDeposit`-Methode kann genutzt werden, um einen Token von Ethereum in die Polygon-Chain einzuzahlen.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
