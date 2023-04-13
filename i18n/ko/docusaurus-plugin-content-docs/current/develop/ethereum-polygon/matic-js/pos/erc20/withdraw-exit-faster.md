---
id: withdraw-exit-faster
title: 빠른 출금 종료
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'withdrawStart의 txHash를 사용해 출금 프로세스를 더 빨리 종료합니다.'
---

`withdrawExitFaster` 메서드를 사용하면 `withdrawStart` 메서드의 txHash를 사용해 출금 프로세스를 더 빨리 종료할 수 있습니다.

백엔드에서 증명을 생성하기 때문에 일반적으로 빠릅니다. [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)를 구성해야 합니다.

**참고**- 출금을 종료하려면 withdrawStart 트랜잭션을 체크포인트로 설정해야 합니다.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

트랜잭션이 완료되고 체크포인트가 설정되면, 금액이 루트 체인에 입금됩니다.
