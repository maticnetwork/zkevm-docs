---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: '출금 프로세스를 시작합니다.'
---

`withdrawStartMany` 메서드를 사용해 Polygon 체인에서 특정 금액의 여러 토큰을 각각 소각하는 출금 프로세스를 시작할 수 있습니다.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
