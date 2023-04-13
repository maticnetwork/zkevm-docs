---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# deplasmaitMany {#deplasmaitmany}

`deplasmaitMany` metodu birden fazla token'ı ethereum'dan polygon zincirine deplasmait yapmak için kullanılabilir.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
