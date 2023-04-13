---
id: withdraw-exit
title: sair da retirada
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawExit {#withdrawexit}

O método `withdrawExit` pode ser usado para sair do processo de retirada assim que o período de desafio for concluído.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
