---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'withdrawStart의 txHash를 사용해 출금 프로세스를 종료합니다.'
---

`withdrawExitMany` 메서드를 사용하면 `withdrawStartMany` 메서드의 txHash를 사용해 출금 프로세스를 종료할 수 있습니다.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
