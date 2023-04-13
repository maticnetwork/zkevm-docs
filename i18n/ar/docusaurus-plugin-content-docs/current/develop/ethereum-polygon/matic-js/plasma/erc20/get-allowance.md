---
id: get-allowance
title: getAllowance
keywords:
  - 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Get started with maticjs'
---

`getAllowance` method can be used to get the approved amount for user.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
