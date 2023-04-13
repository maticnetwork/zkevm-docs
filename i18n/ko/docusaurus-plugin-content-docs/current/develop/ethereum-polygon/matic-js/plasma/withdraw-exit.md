---
id: withdraw-exit
title: 출금 종료하기
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: '출금 프로세스를 종료합니다.'
---

플라스마에서는 누구나 `withdrawExit` 메서드를 사용해 출금 프로세스를 종료할 수 있습니다. 종료 프로세스는 챌린지 기간이 만료된 후에만 작동합니다.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

토큰 목록을 배열로 제공하여 복수의 토큰을 종료할 수도 있습니다.
