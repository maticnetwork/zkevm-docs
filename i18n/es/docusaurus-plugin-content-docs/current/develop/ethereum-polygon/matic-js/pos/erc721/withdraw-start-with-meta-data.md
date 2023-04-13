---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData (Inicio del retiro con metadatos)
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Inicia el proceso de retiro con metadatos.'
---

El método `withdrawStartWithMetaData` se puede utilizar para iniciar el proceso de retiro que quemará el token especificado en la cadena de Polygon. En segundo plano este llama al método `withdrawWithMetadata` en el contrato de tokens.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
