---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# safeDeposit {#safedeposit}

`safeDeposit` méthode peut être utilisée pour déposer un jeton d'ethereum à la chaîne de Polygon.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
