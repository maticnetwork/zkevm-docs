---
id: transfer
title: transférez
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'Transférez les jetons plasma erc20.'
---

`transfer`méthode peut être utilisée pour transférer un montant d'une adresse à une autre.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Transférez les jetons MATIC {#transfer-matic-token}

MATIC est un jeton originaire  de polygone. Nous prenons en charge donc le transfert de jetons matic sans adresse de jeton.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
