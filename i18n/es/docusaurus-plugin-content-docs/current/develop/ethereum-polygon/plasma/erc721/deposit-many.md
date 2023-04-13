---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Empieza con Matic.js'
---

# deplasmaitMany {#deplasmaitmany}

El método `deplasmaitMany` se puede utilizar para deplasmait múltiples tokens de Ethereum en la cadena de Polygon.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
