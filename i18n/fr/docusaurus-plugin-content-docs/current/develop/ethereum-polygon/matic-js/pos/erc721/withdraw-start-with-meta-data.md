---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Lancer le processus de retrait avec des métadonnées.'
---

`withdrawStartWithMetaData`La méthode peut être utilisée pour lancer le processus de retrait qui brûlera le jeton spécifié sur la chaîne de polygone. Sous le capot, elle appelle `withdrawWithMetadata`la méthode sur le contrat du jeton.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
