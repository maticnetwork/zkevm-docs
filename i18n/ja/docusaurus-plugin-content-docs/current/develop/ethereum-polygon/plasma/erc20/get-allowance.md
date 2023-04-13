---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# getAllowance {#getallowance}

`getAllowance`メソッドを使用して、ユーザの承認済み金額を取得できます。

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
