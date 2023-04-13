---
id: deposit
title: deposit
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: '이더리움에서 Polygon 체인으로 토큰을 입금합니다.'
---

`deposit` 메서드를 사용해 이더리움에서 Polygon 체인으로 토큰을 입금할 수 있습니다.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
