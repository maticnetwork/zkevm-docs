---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Iniciar o processo de retirada com metadados.'
---

O método `withdrawStartWithMetaData` pode ser usado para iniciar o processo de retirada que irá fazer burn do token especificado na chain da Polygon. De uma forma técnica, faz CALL do método `withdrawWithMetadata` no contrato do token.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
