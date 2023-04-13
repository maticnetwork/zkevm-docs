---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# getBalance {#getbalance}

`getBalance` metodu kullanıcının bakiyesini çağırmak için kullanılabilir. Bu hem alt hem üst token'larda kullanılabilir.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
