---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Выйдите из процесса вывода с помощью txHash из withdrawStart.'
---

Метод `withdrawExit` можно использовать для выхода из процесса вывода с помощью txHash из метода `withdrawStart`.

**Примечание**: для выхода из процесса вывода необходимо установить контрольные точки для транзакции withdrawStart.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Этот метод предусматривает множественные вызовы RPC для генерации доказательства и выхода из процесса. Поэтому рекомендуется использовать метод withdrawExitFaster.
>

