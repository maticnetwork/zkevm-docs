---
id: deposit-ether
title: deposit ether
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Ethereum''dan polygon''a gereken miktarda ether yatırır.'
---

`depositEther` metodu, ethereum'dan polygon'a gereken miktarda **ether** yatırmak için kullanılabilir.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
