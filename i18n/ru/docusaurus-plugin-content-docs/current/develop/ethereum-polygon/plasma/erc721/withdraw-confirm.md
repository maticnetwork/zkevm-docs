---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'Начните работать с maticjs'
---

# withdrawConfirm {#withdrawconfirm}

Метод `withdrawConfirm` — второй шаг процесса вывода plasma. На этом этапе отправляется подтверждение вашей транзакции сжигания (первая транзакция) и создается токен erc721 эквивалентной ценности.

После успешного завершения данного процесса начинается период запроса, и после завершения этого периода пользователь может получить сумму вывода обратно на счет в цепочке root.

Для mainnet период запроса составляет 7 дней.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
