---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: '`withdrawStart`tan gelen txHash''i kullanarak fon çekme işleminden çıkar'
---

`withdrawExit` metodu, `withdrawStart` metodundan gelen txHash'i kullanarak fon çekme işleminden çıkmak için kullanılabilir.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Bu metot, kanıtı üretmek ve çıkış işlemini yapmak için birden çok RPC çağrısı yapar. Bu nedenle, withdrawExitFaster metodunun kullanılması tavsiye edilir.
>
