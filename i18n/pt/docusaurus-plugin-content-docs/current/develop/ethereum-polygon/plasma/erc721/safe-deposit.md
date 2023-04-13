---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Introdução ao maticjs'
---

# safeDeposit {#safedeposit}

O método `safeDeposit` pode ser usado para depositar um token da blockchain da Ethereum para a blockchain da Polygon.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
