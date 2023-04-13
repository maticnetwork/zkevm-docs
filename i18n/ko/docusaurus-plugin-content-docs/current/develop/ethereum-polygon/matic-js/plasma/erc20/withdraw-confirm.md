---
id: withdraw-confirm
title: 출금 챌린지
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: '출금을 확인합니다.'
---

`withdrawConfirm` 메서드는 플라스마 출금 프로세스의 두 번째 단계입니다. 이 단계에서는 소각 트랜잭션 증명(첫 번째 트랜잭션)이 제출되고 동일한 값의 ERC20 토큰이 생성됩니다.

이 프로세스가 성공하면 챌린지 기간이 시작되고, 챌린지 기간이 만료되면 사용자는 출금된 금액을 루트 체인의 사용자 계정으로 돌려받을 수 있습니다.

메인넷의 챌린지 기간은 7일입니다.

**참고**- 출금 챌린지를 하려면 withdrawStart 트랜잭션을 체크포인트로 설정해야 합니다.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

챌린지 기간이 만료되면 `withdrawExit`를 호출해 출금 프로세스를 종료하고 출금 금액을 돌려받을 수 있습니다.
