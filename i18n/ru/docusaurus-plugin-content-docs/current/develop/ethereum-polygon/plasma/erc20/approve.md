---
id: approve
title: approve
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Начните работать с maticjs'
---

# approve {#approve}

Метод `approve` можно использовать для утверждения требуемого количества на корневом токене.

Утверждение требуется для того, чтобы внести это количество на polygon chain.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
