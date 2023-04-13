---
id: deposit
title: depôt
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'Verser un jeton de l''Ethereum à la chaîne de polygone.'
---

`deposit` la méthode peut être utilisée pour déposer un jeton d'ethereum à la chaîne de polygone.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
