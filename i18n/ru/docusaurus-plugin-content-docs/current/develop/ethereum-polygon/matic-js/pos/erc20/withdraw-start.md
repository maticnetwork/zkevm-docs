---
id: withdraw-start
title: withdraw start
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Инициируйте процесс вывода.'
---

Метод `withdrawStart` можно использовать для инициации процесса вывода, который сжигает указанное количество в polygon chain.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Полученный хэш транзакции будет использоваться для выхода из процесса вывода. Поэтому рекомендуем сохранить его.

