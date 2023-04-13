---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'withdrawStart의 txHash를 사용해 출금 프로세스를 종료합니다.'
---

`withdrawExitFaster` 메서드를 사용하면 `withdrawStart` 메서드의 txHash를 사용해 출금 프로세스를 종료할 수 있습니다.

백엔드에서 증명을 생성하기 때문에 빠릅니다. [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)를 구성해야 합니다.

**참고**- 출금을 종료하려면 withdrawStart 트랜잭션을 체크포인트로 설정해야 합니다.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
