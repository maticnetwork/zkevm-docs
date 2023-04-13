---
id: transfer
title: transferir
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'Transferir tokens plasma ERC-20'
---

# Transferir {#transfer}

O método `transfer` pode ser usado para transferir valores de um endereço para outro.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Transferir tokens MATIC {#transfer-matic-token}

MATIC é o token nativo da Polygon. Por isso permitimos a transferência de tokens MATIC sem nenhum endereço de token.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
