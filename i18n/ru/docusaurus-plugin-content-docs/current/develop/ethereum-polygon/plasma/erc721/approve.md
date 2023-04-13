---
id: approve
title: approve
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Начните работать с maticjs'
---

# approve {#approve}

Метод `approve` можно использовать для утверждения требуемого количества на корневом токене.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
