---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: '메타데이터로 출금 프로세스를 시작하세요.'
---

`withdrawStartWithMetaData` 메서드를 사용해 Polygon 체인에서 지정된 토큰을 소각하는 출금 프로세스를 시작할 수 있습니다. 내부적으로 토큰 계약에서 `withdrawWithMetadata` 메서드를 호출합니다.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
