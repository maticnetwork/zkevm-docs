---
id: approve
title: 승인
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Maticjs를 시작합니다'
---

# 승인 {#approve}

`approve` 메서드를 사용해 루트 토큰에서 필요한 금액을 승인할 수 있습니다.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
