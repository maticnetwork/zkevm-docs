---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Получите данные об утвержденном количестве для пользователя."
---

Метод `getAllowance` можно использовать для получения данных об утвержденном количестве для пользователя.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

Адрес, на котором происходит утверждение, называется `spenderAddress`. Это сторонний пользователь или смарт-контракт, который может выполнить трансфер вашего токена от вашего имени.

По умолчанию значением spenderAddress является адрес predicate стандарта erc20.

Указать адрес исполнителя трансфера можно вручную.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
