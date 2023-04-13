---
id: withdraw-start
title: retirerCommencer
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Lancez le processus de retrait.'
---

`withdrawStart` la méthode peut être utilisée pour lancer le processus de retrait qui brûlera les jetons spécifiés sur la chaîne de polygone.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
