---
id: transfer
title: transfer
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'Выполните трансфер токенов erc20 plasma.'
---

Метод `transfer` можно использовать для трансфера определенного количества с одного адреса на другой.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Трансфер токена MATIC {#transfer-matic-token}

MATIC — нативный токен polygon. Поэтому мы поддерживаем трансфер токенов matic без какого-либо адреса токена.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
