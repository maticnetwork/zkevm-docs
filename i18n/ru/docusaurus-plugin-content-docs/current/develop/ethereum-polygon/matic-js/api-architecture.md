---
id: api-architecture
title: Архитектура API
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: API чтения и записи плюс настройки транзакции.
---

Библиотека придерживается общей архитектуры api во всех отношениях, при этом API разделены на два типа:

1. API чтения
2. API записи

## API чтения {#read-api}

API чтения ничего не публикуют на блокчейне, поэтому они не потребляют газ. Примеры API чтения: `getBalance`, `isWithdrawExited` и т. д.

Рассмотрим пример API чтения:

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

API чтения очень просты и возвращают результат напрямую.

## 2. API записи {#2-write-api}

API записи публикуют определенные данные в блокчейне, поэтому они потребляют газ. Примеры API записи: `approve`, `deposit` и т. д.

При вызове API записи вам необходимы два вида данных из результата.

1. TransactionHash
2. TransactionReceipt

Рассмотрим пример API записи и получим transactionhash и квитанцию:

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### Опции транзакции {#transaction-option}

Существует несколько конфигурируемых опций, которые доступны для всех API. Эти конфигурации можно передать в параметрах.

Доступные конфигурации:

- from?: string | number — Адрес, с которого должны выполняться транзакции.
- to?: string — Адрес, на который должны выполняться транзакции.
- value?: number | string | BN — Значение в wei, переданное в отношении транзакции.
- gasLimit?: number | string — Максимальное количество газа, предоставленного для транзакции (лимит газа).
- gasPrice?: number | string | BN — Цена газа в wei для использования в транзакциях.
- data?: string — Байтовый код контракта.
- nonce?: number;
- chainId?: number;
- chain?: string;
- hardfork?: string;
- returnTransaction?: boolean — В случае установки значения «истина» вернет объект транзакции, который можно использовать для отправки транзакции вручную.

Рассмотрим пример с конфигурированием gasPrice

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
