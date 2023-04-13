---
id: withdraw-start
title: iniciar retirada
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawStart {#withdrawstart}

O método `withdrawStart` pode ser usado para iniciar o processo de retirada, o que irá fazer burn do valor especificado de tokens filho.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

armazenar o txHash que será usado para fazer o desafio no processo de retirada.
