---
id: approve
title: approve
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "Утвердите требуемое количество на корневом токене."
---

Метод `approve` можно использовать для утверждения требуемого количества на корневом токене.

Утверждение требуется для того, чтобы внести это количество в качестве депозита на polygon chain.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

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
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
