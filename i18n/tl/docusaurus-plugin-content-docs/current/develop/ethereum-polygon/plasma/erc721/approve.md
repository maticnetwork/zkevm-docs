---
id: approve
title: pag-apruba
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Pagsisimula sa maticjs'
---

# pag-apruba {#approve}

Maaaring gamitin ang paraang `approve`upang aprubahan ang kinakailangang halaga sa root token.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
