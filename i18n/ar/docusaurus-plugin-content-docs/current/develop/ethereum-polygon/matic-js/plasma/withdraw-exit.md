---
id: withdraw-exit
title: withdraw exit
keywords:
  - 'plasma client, withdrawExit, polygon, sdk'
description: 'Get started with maticjs'
---

In plasma withdaw process can be exited by anyone using `withdrawExit` method. The exit process will work only after challenge period has been completed.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

You can also exit for multiple tokens by providing tokens list in array.
