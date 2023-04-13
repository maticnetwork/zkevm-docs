---
id: approve
title: approve
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: '루트 토큰에서 필요한 금액을 승인합니다.'
---

`approve` 메서드를 사용해 루트 토큰에서 필요한 금액을 승인할 수 있습니다.

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
