---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Commencer à utiliser maticjs'
---

# deplasmaitMany {#deplasmaitmany}

La méthode `deplasmaitMany` peut être utilisée pour faire le deplasmait de plusieurs jetons Ethereum à la chaîne polygonale.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
