---
id: approve-all
title: approveAll
keywords:
- 'plasma client, erc721, approveAll, polygon, sdk'
description: 'Empieza con Matic.js'
---

# aprobar {#approve}

El método `approveAll` se puede utilizar para aprobar todos los tokens.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
