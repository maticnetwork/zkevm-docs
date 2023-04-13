---
id: approve
title: approve
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: 'Kök token üzerinde gereken miktarı onaylar'
---

`approve` metot kök token üzerinde gereken miktarı onaylamak için kullanılabilir.

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
