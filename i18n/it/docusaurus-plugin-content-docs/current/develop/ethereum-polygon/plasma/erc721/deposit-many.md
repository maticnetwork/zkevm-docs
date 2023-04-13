---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# deplasmaitMany {#deplasmaitmany}

`deplasmaitMany` può essere utilizzato per effettuare il deplasmait di più token da Ethereum alla catena di Polygon.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
