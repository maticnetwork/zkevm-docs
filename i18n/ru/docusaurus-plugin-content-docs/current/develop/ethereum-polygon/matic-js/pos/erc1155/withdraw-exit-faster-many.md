---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
description: 'Выйдите из процесса вывода с помощью txHash из withdrawStartMany.'
---

Метод `withdrawExitFasterMany` можно использовать для выхода из процесса вывода с помощью txHash из метода `withdrawStartMany`.

Он выполняется быстро, потому что генерирует доказательство на серверном уровне. Вам необходимо конфигурировать [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).


**Примечание**: для выхода из процесса вывода необходимо установить контрольные точки для транзакции withdrawStart.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
