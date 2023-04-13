---
id: transfer
title: transfer
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Bir kullanıcıdan diğerine token aktarır.'
---

`transfer` metodu, bir kullanıcıdan diğerine token aktarmak için kullanılabilir.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
