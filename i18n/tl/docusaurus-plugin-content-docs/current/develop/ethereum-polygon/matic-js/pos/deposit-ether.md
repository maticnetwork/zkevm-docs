---
id: deposit-ether
title: Pagdeposito ng ether
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Magdeposito ng kinakailangang halaga ng ether mula sa ethereum papunta sa polygon.'
---

Maaaring gamitin ang paraang `depositEther` upang ideposito ang kinakailangang halaga ng **ether** mula sa ethereum papunta sa polygon.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
