---
id: withdraw-exit
title: 출금 종료하기
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Maticjs를 시작합니다'
---

# withdrawExit {#withdrawexit}

챌린지 기간이 만료되면 `withdrawExit` 메서드를 사용해 출금 프로세스를 종료할 수 있습니다.

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
