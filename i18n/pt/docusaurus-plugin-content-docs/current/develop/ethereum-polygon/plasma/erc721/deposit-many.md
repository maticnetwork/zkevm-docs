---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Introdução ao maticjs'
---

# deplasmaitMany {#deplasmaitmany}

O método `deplasmaitMany` pode ser usado para fazer deplasmait de vários tokens da blockchain da Ethereum para a blockchain da Polygon.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
