---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: '''withdrawStart`의 txHash를 사용해 출금 프로세스를 종료합니다.'
---

`withdrawExit` 메서드를 사용하면 `withdrawStart` 메서드의 txHash를 사용해 출금 프로세스를 종료할 수 있습니다.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


이 메서드는 증명을 생성하고 종료를 처리하기 위해 여러 RPC 호출을 수행합니다. 그러므로 withdrawExitFaster 메서드 사용을 권장합니다.
>
