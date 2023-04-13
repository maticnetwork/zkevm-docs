---
id: transfer
title: übertragen
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'RCC20-Plasma-Token übertragen.'
---

Mit dieser `transfer`-Methode kann ein Betrag von einer Adresse an eine andere Adresse übertragen werden.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## MATIC-Token übertragen {#transfer-matic-token}

MATIC ist ein natives Token auf Polygon. Wir unterstützen also die Übertragung von Matic-Token ohne Token-Adresse.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
