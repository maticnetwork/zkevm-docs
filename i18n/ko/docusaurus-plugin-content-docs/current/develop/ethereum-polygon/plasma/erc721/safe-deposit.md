---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Maticjs를 시작합니다'
---

# safeDeposit {#safedeposit}

`safeDeposit` 메서드를 사용해 이더리움에서 Polygon 체인으로 토큰을 입금할 수 있습니다.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
