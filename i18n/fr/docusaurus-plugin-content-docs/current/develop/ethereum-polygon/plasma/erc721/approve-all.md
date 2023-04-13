---
id: approve-all
title: approuverTout
keywords:
- 'plasma client, erc721, approveAll, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# approuver {#approve}

`approveAll`méthode peut être utilisée pour approuver tous les jetons.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
