---
id: deposit-ether
title: fon yatırın
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# depositEther {#depositether}

`depositEther` metodu, ethereum'dan polygon'a gereken miktarda **ether** yatırmak için kullanılabilir..

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
