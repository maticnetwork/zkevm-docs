---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'withdrawStart의 txHash를 사용해 출금 프로세스를 종료합니다.'
---

`withdrawExit` 메서드를 사용하면 `withdrawStart` 메서드의 txHash를 사용해 출금 프로세스를 종료할 수 있습니다.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
