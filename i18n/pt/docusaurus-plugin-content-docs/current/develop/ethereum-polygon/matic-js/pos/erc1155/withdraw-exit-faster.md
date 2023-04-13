---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'Sair do processo de retirada ao usar txHash de withdrawStart.'
---

O método `withdrawExitFaster` pode ser usado para sair do processo de retirada ao usar o txHash do método `withdrawStart`.

É rápido porque produz prova no backend. Você precisa configurar o [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**- a transação withdrawStart deve incluir um checkpoint para poder sair da retirada.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
