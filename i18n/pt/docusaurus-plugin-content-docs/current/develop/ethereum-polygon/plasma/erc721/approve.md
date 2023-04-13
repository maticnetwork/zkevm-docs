---
id: approve
title: approve
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Introdução ao maticjs'
---

# approve {#approve}

O método `approve` pode ser usado para aprovar o valor necessário no token ROOT.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
