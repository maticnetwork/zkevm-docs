---
id: withdraw-exit
title: withdraw exit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Начните работать с maticjs'
---

# withdrawExit {#withdrawexit}

Выход из процесса вывода plasma может быть выполнен кем угодно с помощью метода `withdrawExit`. Процесс выхода сработает только после завершения периода запроса.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Также существует возможность выхода из нескольких токенов посредством предоставления списка токенов в массиве.
