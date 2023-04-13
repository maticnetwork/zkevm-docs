---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: '출금 프로세스를 종료합니다.'
---

`withdrawExitFaster` 메서드를 사용해 모든 토큰을 승인할 수 있습니다.

백엔드에서 증명을 생성하기 때문에 빠릅니다. 백엔드는 전용 비공개 RPC로 구성할 수 있습니다.

**참고**- 출금을 종료하려면 withdrawStart 트랜잭션을 체크포인트로 설정해야 합니다.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
