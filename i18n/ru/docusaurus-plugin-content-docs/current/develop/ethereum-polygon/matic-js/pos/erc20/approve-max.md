---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Утвердите максимальное количество на корневом токене.'
---

Метод `approveMax` можно использовать для утверждения максимального количества на корневом токене.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

Адрес, на котором происходит утверждение, называется `spenderAddress`. Это сторонний пользователь или смарт-контракт, который может выполнить трансфер вашего токена от вашего имени.

По умолчанию значением spenderAddress является адрес predicate стандарта erc20.

Указать адрес исполнителя трансфера можно вручную.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
