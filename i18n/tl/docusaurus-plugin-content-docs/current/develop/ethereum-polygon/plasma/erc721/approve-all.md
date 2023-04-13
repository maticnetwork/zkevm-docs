---
id: approve-all
title: approveAll
keywords:
- 'plasma client, erc721, approveAll, polygon, sdk'
description: 'Pagsisimula sa maticjs'
---

# pag-apruba {#approve}

Puwedeng gamitin ang paraang `approveAll` para maaprubahan ang lahat ng token.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
