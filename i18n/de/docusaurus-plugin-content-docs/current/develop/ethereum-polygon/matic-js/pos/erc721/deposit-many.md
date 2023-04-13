---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'Mehrere Token von Ethereum auf Polygon-Chain einzahlen.'
---

Die `depositMany`-Methode kann zur Auszahlung mehrerer Token von Ethereum auf die Polygon-Chain verwendet werden

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
