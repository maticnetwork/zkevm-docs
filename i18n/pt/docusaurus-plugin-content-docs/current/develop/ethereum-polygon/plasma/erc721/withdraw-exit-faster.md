---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawExitFaster {#withdrawexitfaster}

O método `withdrawExitFaster` pode ser usado para aprovar todos os tokens.

É rápido porque produz prova no backend. O backend pode ser configurado com um rpc privado dedicado.

**Nota**- a transação withdrawStart deve incluir um checkpoint para conseguir sair da retirada.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
