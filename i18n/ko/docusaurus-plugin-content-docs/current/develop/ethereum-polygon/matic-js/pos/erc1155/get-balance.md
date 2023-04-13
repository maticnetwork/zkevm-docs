---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Matic.js를 사용해 ERC1155 토큰의 잔액을 가져옵니다.'
---

`getBalance` 메서드를 사용해 사용자의 토큰 잔액을 가져올 수 있습니다. 하위 토큰 및 상위 토큰 모두에 사용할 수 있습니다.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
