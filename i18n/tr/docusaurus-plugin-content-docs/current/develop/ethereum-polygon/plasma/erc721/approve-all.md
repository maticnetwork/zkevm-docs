---
id: approve-all
title: approveAll
keywords:
- 'plasma client, erc721, approveAll, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# approve {#approve}

`approveAll` metodu tüm token'ları onaylamak için kullanılabilir.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
