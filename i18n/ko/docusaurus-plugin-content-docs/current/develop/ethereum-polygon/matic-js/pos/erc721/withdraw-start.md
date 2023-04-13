---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: '출금 프로세스를 시작합니다.'
---

`withdrawStart` 메서드를 사용해 Polygon 체인에서 지정된 토큰을 소각하는 출금 프로세스를 시작할 수 있습니다.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
