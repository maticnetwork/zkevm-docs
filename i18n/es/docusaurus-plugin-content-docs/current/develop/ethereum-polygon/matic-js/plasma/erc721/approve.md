---
id: approve
title: approve (Aprobar)
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Aprueba la cantidad requerida en el token primario'
---

El método `approve` puede utilizarse para aprobar la cantidad requerida en el token primario.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
