---
id: approve
title: approve
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# approve {#approve}

`approve` può essere utilizzato per approvare l'importo richiesto sul root token.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
