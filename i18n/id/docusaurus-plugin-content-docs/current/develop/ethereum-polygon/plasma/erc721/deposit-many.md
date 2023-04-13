---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# deplasmaitMany {#deplasmaitmany}

Metode `deplasmaitMany` dapat digunakan untuk melakukan deplasmait atas beberapa token dari ethereum ke rantai polygon.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
