---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'ERC1155 발행 가능 토큰을 승인합니다.'
---

# approveAllForMintable {#approveallformintable}

`approveAllForMintable` 메서드를 사용해 루트 토큰에서 발행 가능한 토큰을 모두 승인할 수 있습니다.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
