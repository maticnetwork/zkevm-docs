---
id: transfer
title: transfer
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'Erc20 plasma token''lar aktar'
---

# Aktar {#transfer}

`transfer` metodu bir adresten diğer adrese miktar aktarmak için kullanılabilir.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## MATIC token aktar {#transfer-matic-token}

MATIC, polygon'un yerel token'ıdır. Bu yüzden, token adresi olmadan matic token aktarımını destekliyoruz.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
