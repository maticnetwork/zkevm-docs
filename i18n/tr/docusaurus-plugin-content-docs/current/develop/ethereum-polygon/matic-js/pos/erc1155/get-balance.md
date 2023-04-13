---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Matic.js kullanarak ERC1155 token bakiyesini alır.'
---

`getBalance` metodu, bir token için kullanıcının bakiyesini almak için kullanılabilir. Bu hem alt hem üst token'larda kullanılabilir.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
