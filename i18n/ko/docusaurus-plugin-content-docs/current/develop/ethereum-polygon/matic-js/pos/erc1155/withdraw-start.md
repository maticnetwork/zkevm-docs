---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: '출금 프로세스를 시작합니다.'
---

`withdrawStart` 메서드를 사용해 Polygon 체인에서 토큰 ID의 특정 금액을 소각하는 출금 프로세스를 시작할 수 있습니다.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
