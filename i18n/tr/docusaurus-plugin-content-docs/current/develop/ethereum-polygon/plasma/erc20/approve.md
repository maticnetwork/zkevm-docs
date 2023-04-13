---
id: approve
title: approve
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# approve {#approve}

`approve` metodu, kök token üzerinde gereken miktarı onaylamak için kullanılabilir.

approve (onaylama), polygon zincirinde miktar yatırmak için gereklidir.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
