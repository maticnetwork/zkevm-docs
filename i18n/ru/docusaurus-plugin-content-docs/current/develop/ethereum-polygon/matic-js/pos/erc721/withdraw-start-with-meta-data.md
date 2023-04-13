---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Инициируйте процесс вывода с метаданными.'
---

Метод `withdrawStartWithMetaData` можно использовать для инициации процесса вывода, который сжигает указанный токен в polygon chain. На внутреннем уровне он вызывает метод `withdrawWithMetadata` в контракте токена.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
