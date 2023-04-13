---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Выйдите из процесса вывода с помощью txHash из `withdrawStart`'
---

Метод `withdrawExit` можно использовать для выхода из процесса вывода с помощью txHash из метода `withdrawStart`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Этот метод предусматривает множественные вызовы RPC для генерации доказательства и выхода из процесса. Поэтому рекомендуется использовать метод withdrawExitFaster.
>
