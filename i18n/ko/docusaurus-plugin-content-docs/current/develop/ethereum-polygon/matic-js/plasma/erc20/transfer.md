---
id: transfer
title: 이전
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'ERC20 플라스마 토큰을 이전합니다.'
---

`transfer` 메서드를 사용해 한 주소에서 다른 주소로 금액을 이전할 수 있습니다.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## 매틱 토큰 이전 {#transfer-matic-token}

매틱은 Polygon의 기본 토큰입니다. 그러므로 토큰 주소 없이도 매틱 토큰을 이전할 수 있도록 지원합니다.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
