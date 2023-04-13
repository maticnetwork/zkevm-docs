---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Sair do processo de retirada usando txHash de `withdrawStartMany`.'
---

O método `withdrawExitFasterMany` pode ser usado para sair do processo de retirada ao utilizar o txHash do método `withdrawStartMany`.


É rápido porque produz prova no backend. Você precisa configurar o [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**- a transação withdrawStart deve incluir um checkpoint para poder sair da retirada.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
