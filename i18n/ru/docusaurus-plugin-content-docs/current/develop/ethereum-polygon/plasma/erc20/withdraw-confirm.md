---
id: withdraw-confirm
title: запрос вывода
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Начните работать с maticjs'
---

# withdrawConfirm {#withdrawconfirm}

Метод `withdrawConfirm` — второй шаг процесса вывода plasma. На этом этапе отправляется подтверждение вашей транзакции сжигания (первая транзакция) и создается токен erc721 эквивалентной ценности.

После успешного завершения этого процесса начинается период запроса, а после завершения периода запроса пользователь сможет получить обратно выведенное количество на свой аккаунт в корневой цепочке.

Для mainnet период запроса составляет 7 дней.

**Примечание**: для запроса вывода транзакция withdrawStart должна иметь контрольные точки.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

После завершения периода запроса можно произвести вызов `withdrawExit` для выхода из процесса вывода и возвращения выведенной суммы.
