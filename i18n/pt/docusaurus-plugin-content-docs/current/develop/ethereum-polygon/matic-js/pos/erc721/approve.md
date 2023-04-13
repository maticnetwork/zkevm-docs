---
id: approve
title: aprovar
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: 'Aprovar o valor necessário no token ROOT'
---

O método `approve` pode ser usado para aprovar o valor necessário no token ROOT.

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
