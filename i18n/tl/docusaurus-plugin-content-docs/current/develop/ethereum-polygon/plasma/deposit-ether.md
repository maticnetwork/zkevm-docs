---
id: deposit-ether
title: ideposito
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# depositEther {#depositether}

Maaaring gamitin ang paraang `depositEther` upang ideposito ang kinakailangang halaga ng **ether** mula sa ethereum papunta sa polygon.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
