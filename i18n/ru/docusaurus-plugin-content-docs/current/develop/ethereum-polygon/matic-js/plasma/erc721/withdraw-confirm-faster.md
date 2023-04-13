---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Подтвердите вывод, генерируя доказательство на серверном уровне.'
---

Метод `withdrawConfirmFaster` — второй шаг процесса вывода plasma. На этом этапе отправляется подтверждение вашей транзакции сжигания (первая транзакция) и создается токен erc721 эквивалентной ценности.

После успешного завершения данного процесса начинается период запроса, и после завершения этого периода пользователь может получить сумму вывода обратно на счет в цепочке root.

Для mainnet период запроса составляет 7 дней.

Он выполняется быстро, потому что генерирует доказательство на серверном уровне. Вам необходимо конфигурировать [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
