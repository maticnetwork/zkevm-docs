---
id: withdraw-start
title: запуск вывода
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Начните работать с maticjs'
---

# withdrawStart {#withdrawstart}

Метод `withdrawStart` можно использовать для запуска процесса вывода, который сжигает указанное количество на дочернем токене.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

сохраните txHash, который будет использоваться для запроса процесса вывода.
