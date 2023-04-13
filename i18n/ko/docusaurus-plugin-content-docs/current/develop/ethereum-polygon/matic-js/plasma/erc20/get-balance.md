---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: '사용자의 잔액을 가져옵니다.'
---

`getBalance` 메서드를 사용해 사용자의 잔액을 가져올 수 있습니다. 하위 토큰 및 상위 토큰 모두에 사용할 수 있습니다.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
