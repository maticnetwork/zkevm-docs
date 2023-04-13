---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawStart {#withdrawstart}

`withdrawStart` metodu polygon zinciri üzerinde belirlenen token miktarını yakacak olan fon çekme işlemini başlatmak için kullanılabilir.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
