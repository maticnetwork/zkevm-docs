---
id: deposit-many
title: DeplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Mehrere Token von Ethereum auf Polygon-Chain einzahlen.'
---

`deplasmaitMany` Methode kann zum Einzahlen mehrerer Token von Ethereum auf die Polygon-Chain verwendet werden.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
