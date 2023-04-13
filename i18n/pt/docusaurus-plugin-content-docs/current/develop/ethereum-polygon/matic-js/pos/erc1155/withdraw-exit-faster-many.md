---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
description: 'Sair do processo de retirada ao usar txHash de withdrawStartMany.'
---

O `withdrawExitFasterMany` pode ser usado para sair do processo de retirada ao usar o txHash do método `withdrawStartMany`.

É rápido porque produz prova no backend. Você precisa configurar o [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).


**Nota**- a transação withdrawStart deve incluir um checkpoint para poder sair da retirada.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
