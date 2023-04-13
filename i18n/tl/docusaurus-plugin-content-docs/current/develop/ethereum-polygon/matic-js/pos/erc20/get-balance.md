---
id: get-balance
title: getBalance
keywords:
    - pos client
    - erc20
    - getBalance
    - polygon
    - sdk
description: "Kunin ang balanse ng isang user."
---

Maaaring gamitin ang paraang `getBalance` upang kunin ang balanse ng user. Available ito sa parehong child at parent token.

```
const erc20Token = posClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
