---
id: approve
title: approve
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: 'Approva l''importo richiesto sul token root'
---

Il metodo `approve` può essere utilizzato per approvare l'importo richiesto sul token root.

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
