---
id: approve
title: approve (Aprobar)
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Empieza con maticjs'
---

# approve (Aprobar) {#approve}

El método `approve` se puede utilizar para aprobar el monto requerido en el token primario.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
