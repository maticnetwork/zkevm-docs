---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
description: 'withdrawStartMany''den txHash kullanarak fon çekme işleminden çıkar.'
---

`withdrawExitFasterMany` metodu, `withdrawStartMany` metodundan txHash kullanarak fon çekme işleminden çıkmak için kullanılabilir.

Hızlıdır çünkü arka uçta kanıt üretir. [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)'yi yapılandırmanız gerekir.


**Not**- Fon çekme işleminden çıkmak için withdrawStart işleminde denetim noktası belirlenmelidir.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
