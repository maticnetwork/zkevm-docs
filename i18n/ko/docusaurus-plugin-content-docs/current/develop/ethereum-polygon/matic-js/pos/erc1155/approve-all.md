---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'ERC1155 토큰을 승인합니다.'
---

# approveAll {#approveall}

`approveAll` 메서드를 사용해 루트 토큰의 모든 토큰을 승인할 수 있습니다.

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
