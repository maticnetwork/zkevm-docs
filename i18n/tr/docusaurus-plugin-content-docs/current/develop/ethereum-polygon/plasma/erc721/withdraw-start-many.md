---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawStartMany {#withdrawstartmany}

`withdrawStartMany` metodu polygon zinciri üzerinde birden fazla token yakacak olan fon çekme işlemini başlatmak için kullanılabilir.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
