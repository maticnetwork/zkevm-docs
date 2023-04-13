---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'withdrawStart''tan txHash kullanarak fon çekme işleminden çıkar.'
---

`withdrawExit` metodu, `withdrawStart` metodundan txHash kullanarak fon çekme işleminden çıkmak için kullanılabilir.

**Not**- Fon çekme işleminden çıkmak için withdrawStart işleminde denetim noktası belirlenmelidir.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Bu metot, kanıtı üretmek ve çıkış işlemini yapmak için birden çok RPC çağrısı yapar. Bu nedenle, withdrawExitFaster metodunun kullanılması tavsiye edilir.
>

