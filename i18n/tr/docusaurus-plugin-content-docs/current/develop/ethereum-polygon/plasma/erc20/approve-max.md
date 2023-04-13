---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# approveMax {#approvemax}

`approveMax` metodu kök token üzerindeki maksimum miktarı onaylamak için kullanılabilir.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
