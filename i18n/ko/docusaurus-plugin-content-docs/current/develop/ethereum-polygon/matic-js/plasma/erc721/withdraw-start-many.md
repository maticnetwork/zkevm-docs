---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: '출금 프로세스를 시작합니다.'
---

`withdrawStartMany` 메서드를 사용해 Polygon 체인에서 복수의 토큰을 소각하는 출금 프로세스를 시작할 수 있습니다.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
