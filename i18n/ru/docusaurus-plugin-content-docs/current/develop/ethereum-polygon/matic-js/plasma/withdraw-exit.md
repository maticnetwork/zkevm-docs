---
id: withdraw-exit
title: withdraw exit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Выйдите из процесса вывода.'
---

В plasma из процесса вывода может выйти кто угодно с помощью метода `withdrawExit`. Процесс выхода сработает только после завершения периода запроса.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Также существует возможность выхода из нескольких токенов посредством предоставления списка токенов в массиве.
