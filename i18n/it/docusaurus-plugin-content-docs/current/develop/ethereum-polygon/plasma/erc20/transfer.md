---
id: transfer
title: trasferire
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'Trasferire token plasma erc20'
---

# Il metodo Transfer {#transfer}

`transfer` può essere utilizzato per trasferire l'importo da un indirizzo a un altro indirizzo.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Trasferire un token MATIC {#transfer-matic-token}

MATIC è il token nativo di Polygon. Pertanto, supportiamo il trasferimento di token matic senza alcun indirizzo di token.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
