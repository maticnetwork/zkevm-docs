---
id: approve
title: approuver
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Commencer à utiliser maticjs'
---

# approuver {#approve}

La méthode `approve` peut être utilisée pour approuver le montant requis sur le jeton root.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
