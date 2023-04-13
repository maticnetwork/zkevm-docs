---
id: approve
title: 承認
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# 承認 {#approve}

`approve`メソッドは、ルートトークンで必要な額を承認するために使用できます。

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
