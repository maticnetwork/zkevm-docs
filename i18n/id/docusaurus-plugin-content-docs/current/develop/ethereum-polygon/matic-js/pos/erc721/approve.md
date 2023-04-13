---
id: approve
title: approve
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: 'Menyetujui jumlah token root yang diperlukan'
---

Metode `approve` dapat digunakan untuk menyetujui jumlah token root yang diperlukan.

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
