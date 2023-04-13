---
id: withdraw-confirm-faster
title: withdraw challenge faster
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Подтвердите вывод, генерируя доказательство на серверном уровне.'
---

Метод `withdrawConfirmFaster` — это второй шаг в процессе вывода plasma. На этом этапе отправляется подтверждение вашей транзакции сжигания (первая транзакция) и создается токен erc721 эквивалентной ценности.

После успеха этого процесса начинается период запроса, и после завершения этого периода пользователь может получить сумму вывода обратно на счет в корневой цепочке.

Для mainnet период запроса составляет 7 дней.

Он выполняется быстро, потому что генерирует доказательство на серверном уровне. Вам необходимо конфигурировать [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Примечание**: для запроса вывода транзакция withdrawStart должна иметь контрольные точки.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

После завершения периода запроса можно произвести вызов `withdrawExit` для выхода из процесса вывода и возвращения выведенной суммы.
