---
id: withdraw-start
title: 출금 시작하기
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: '출금 프로세스를 시작합니다.'
---

`withdrawStart` 메서드를 사용해 Polygon 체인에서 지정된 금액을 소각하는 출금 프로세스를 시작할 수 있습니다.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

수신한 트랜잭션 해시는 출금 프로세스를 종료하는 데 사용되므로 저장하시기 바랍니다.

