---
id: withdraw-start
title: 출금 시작하기
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: '출금 프로세스를 시작합니다.'
---

`withdrawStart` 메서드를 사용해 하위 토큰에서 지정된 금액을 소각하는 출금 프로세스를 시작할 수 있습니다.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

출금 프로세스를 챌린지하는 데 사용될 txHash를 저장하세요.
