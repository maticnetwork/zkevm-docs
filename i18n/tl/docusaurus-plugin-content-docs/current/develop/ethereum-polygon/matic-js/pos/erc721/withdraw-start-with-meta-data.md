---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Pasimulan ang proseso ng pag-withdraw gamit ang metadata.'
---

Maaaring gamitin ang paraang `withdrawStartWithMetaData` upang pasimulan ang proseso ng pag-withdraw na siyang magbu-burn sa tinukoy na token sa polygon chain. Sa panloob, ipinapatawag nito ang paraang `withdrawWithMetadata` sa kontrata ng token.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
