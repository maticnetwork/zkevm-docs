---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# deplasmaitMany {#deplasmaitmany}

Có thể sử dụng phương pháp `deplasmaitMany` để deplasmait nhiều token từ ethereum sang chuỗi polygon.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
