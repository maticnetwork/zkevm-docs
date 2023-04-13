---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Déposez un jeton de l''Ethereum à la chaîne de polygone.'
---

`safeDeposit` la méthode peut être utilisée pour déposer un jeton d'ethereum à la chaîne de polygone.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
