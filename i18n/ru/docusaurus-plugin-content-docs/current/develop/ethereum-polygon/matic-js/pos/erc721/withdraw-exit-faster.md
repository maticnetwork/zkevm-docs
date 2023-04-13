---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Выйдите из процесса вывода с помощью txHash из `withdrawStart`'
---

Метод `withdrawExitFaster` можно использовать для выхода из процесса вывода с помощью txHash из метода `withdrawStart`.


Он выполняется быстро, потому что генерирует доказательство на серверном уровне. Вам необходимо конфигурировать [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Примечание**: для выхода из процесса вывода необходимо установить контрольные точки для транзакции withdrawStart.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
