---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: '`withdrawStartMany`''den gelen txHash''i kullanarak fon çekme işleminden çıkar.'
---

`withdrawExitFasterMany` yöntemi, `withdrawStartMany` yönteminden txHash kullanarak fon çekme işleminden çıkmak için kullanılabilir.


Hızlıdır çünkü arka uçta kanıt üretir. [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)'yi yapılandırmanız gerekir.

**Not**- Fon çekme işleminden çıkmak için withdrawStart işleminde denetim noktası belirlenmelidir.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
