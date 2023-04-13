---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Начните работать с maticjs'
---

# withdrawStart {#withdrawstart}

Метод `withdrawStart` можно использовать для запуска процесса вывода, который сжигает указанный токен в цепочке polygon chain.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
