---
id: withdraw-exit-faster
title: withdraw exit faster
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'Выйдите из процесса вывода быстрее с помощью txHash из withdrawStart.'
---

Метод `withdrawExitFaster` можно использовать для более быстрого выхода из процесса вывода с помощью txHash метода `withdrawStart`.

Он обычно выполняется быстро, потому что генерирует доказательство на серверном уровне. Вам необходимо конфигурировать [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Примечание**: для выхода из процесса вывода необходимо установить контрольные точки для транзакции withdrawStart.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

После завершения транзакции и завершения checkpoint количество вносится в качестве депозита на корневую цепочку.
