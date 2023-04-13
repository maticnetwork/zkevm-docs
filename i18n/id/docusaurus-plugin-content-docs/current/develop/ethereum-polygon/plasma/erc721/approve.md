---
id: approve
title: approve
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# approve {#approve}

Metode `approve` dapat digunakan untuk menyetujui jumlah yang dibutuhkan pada token root.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
