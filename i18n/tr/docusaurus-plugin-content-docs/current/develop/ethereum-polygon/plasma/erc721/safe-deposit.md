---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# safeDeposit {#safedeposit}

`safeDeposit` metodu bir token'ı ethereum'dan polygon zincirine yatırmak için kullanılabilir.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
