---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawExitFasterMany {#withdrawexitfastermany}

O método `withdrawExitFasterMany` pode ser usado para aprovar todos os tokens.

É rápido porque produz prova no backend. O backend pode ser configurado com um rpc privado dedicado.

**Nota**- a transação withdrawStart deve incluir um checkpoint para conseguir sair da retirada.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
