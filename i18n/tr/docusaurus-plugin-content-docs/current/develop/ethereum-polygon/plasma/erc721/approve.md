---
id: approve
title: approve
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# approve {#approve}

`approve` metodu kök token üzerindeki gerekli miktarı onaylamak için kullanılabilir.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
