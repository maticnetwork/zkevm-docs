---
id: approve
title: approve
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: 'Утвердите требуемое количество на корневом токене'
---

Метод `approve` можно использовать для утверждения требуемого количества на корневом токене.

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
