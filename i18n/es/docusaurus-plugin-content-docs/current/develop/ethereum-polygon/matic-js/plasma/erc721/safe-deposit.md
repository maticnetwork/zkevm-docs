---
id: safe-deposit
title: safeDeposit (Depósito seguro)
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Deposita un token de Ethereum a la cadena de Polygon'
---

El método `safeDeposit` se puede utilizar para depositar un token de Ethereum a la cadena de Polygon.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
