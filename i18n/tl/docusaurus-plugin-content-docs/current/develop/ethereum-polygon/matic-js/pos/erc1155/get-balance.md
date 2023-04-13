---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Kunin ang balanse ng ERC1155 token gamit ang matic.js.'
---

Maaaring gamitin ang paraang `getBalance` upang kunin ang balanse ng user para sa isang token. Available ito sa parehong child at parent token.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
