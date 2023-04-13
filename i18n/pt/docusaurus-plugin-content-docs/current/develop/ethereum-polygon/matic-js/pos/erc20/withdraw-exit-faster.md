---
id: withdraw-exit-faster
title: Saída mais rápida da retirada
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'Sair do processo de retirada mais rápido ao usar txHash do withdrawStart.'
---

O método `withdrawExitFaster` pode ser usado para sair do processo de retirada mais rapidamente, usando o txHash do método `withdrawStart`.

É geralmente rápido porque gera prova no backend. É necessário configurar o [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**- a transação withdrawStart deve incluir um checkpoint para poder sair da retirada.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Assim que a transação e o checkpoint forem concluídos, o valor será depositado no ROOT chain.
