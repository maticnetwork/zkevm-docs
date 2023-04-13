---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Начните работать с maticjs'
---

# withdrawStartMany {#withdrawstartmany}

Метод `withdrawStartMany` можно использовать для запуска процесса вывода, который сжигает множественные токены в цепочке polygon chain.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
