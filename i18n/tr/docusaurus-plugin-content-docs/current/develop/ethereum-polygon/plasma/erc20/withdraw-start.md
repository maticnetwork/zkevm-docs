---
id: withdraw-start
title: withdraw start
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawStart {#withdrawstart}

`withdrawStart` metodu alt token üzerinde belirtilen miktarı yakacak olan fon çekme işlemini başlatmak için kullanılabilir.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Çekme işlemini sorgulamak için kullanılacak olan txHash'i kaydedin.
