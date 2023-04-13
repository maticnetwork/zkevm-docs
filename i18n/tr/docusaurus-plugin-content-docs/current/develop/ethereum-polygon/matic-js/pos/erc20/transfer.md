---
id: transfer
title: transfer
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Bir adresten diğerine miktar aktarır.'
---

`transfer` metodu, bir adresten diğerine miktar aktarmak için kullanılabilir.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
