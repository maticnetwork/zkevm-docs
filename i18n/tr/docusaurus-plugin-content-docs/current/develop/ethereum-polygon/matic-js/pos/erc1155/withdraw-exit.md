---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'withdrawStart''tan txHash kullanarak fon çekme işleminden çıkar.'
---

`withdrawExit` metodu, `withdrawStart` metodundan txHash kullanarak fon çekme işleminden çıkmak için kullanılabilir.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
