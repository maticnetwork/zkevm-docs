---
id: approve-all
title: approveAll
keywords:
- 'plasma client, erc721, approveAll, polygon, sdk'
description: 'Начните работать с maticjs'
---

# утвердить {#approve}

Метод `approveAll` можно использовать для утверждения всех токенов.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
