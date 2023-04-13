---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'ユーザーへの承認された量を取得します。'
---

`getAllowance`メソッドを使用して、ユーザの承認済み金額を取得できます。

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
