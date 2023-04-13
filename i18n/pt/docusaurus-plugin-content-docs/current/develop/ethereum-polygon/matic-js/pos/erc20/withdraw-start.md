---
id: withdraw-start
title: iniciar retirada
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Iniciar o processo de retirada.'
---

O método `withdrawStart` pode ser usado para iniciar o processo de retirada que irá fazer burn do valor específico na chain da Polygon.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

A transação hash recebida será usada para sair do processo de retirada. Por isso recomendamos que a armazene.

