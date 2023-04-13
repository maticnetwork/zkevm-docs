---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Начните работать с maticjs'
---

# withdrawExit {#withdrawexit}

Метод `withdrawExit` можно использовать для выхода из процесса вывода после завершения периода запроса.

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
