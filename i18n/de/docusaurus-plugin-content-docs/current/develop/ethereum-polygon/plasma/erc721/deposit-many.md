---
id: deposit-many
title: DeplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# DeplasmaitMany {#deplasmaitmany}

Die `deplasmaitMany`-Methode kann für die Deplasmait-Operation mehrerer Token von Ethereum zu Polygon verwendet werden

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
