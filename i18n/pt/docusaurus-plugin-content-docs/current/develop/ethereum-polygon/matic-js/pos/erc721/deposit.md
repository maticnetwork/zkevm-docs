---
id: deposit
title: depositar
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'Depositar um token de Ethereum para a chain da Polygon.'
---

O método `deposit` pode ser usado para depositar um token de Ethereum para a chain da Polygon.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
