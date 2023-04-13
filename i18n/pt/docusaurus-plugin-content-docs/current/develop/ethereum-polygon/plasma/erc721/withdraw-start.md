---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawStart {#withdrawstart}

`withdrawStart`O método pode ser usado para iniciar o processo de retirada que irá efetuar o burn do token especificado na blockchain da Polygon.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
