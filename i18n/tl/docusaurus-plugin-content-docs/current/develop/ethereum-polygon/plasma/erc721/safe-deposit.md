---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# safeDeposit {#safedeposit}

Maaaring gamitin ang paraang `safeDeposit` upang magdeposito ng token mula sa ethereum papunta sa polygon chain.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
