---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc721, withdrawExitFaster, polygon, sdk'
description: '`withdrawStart`tan gelen txHash''i kullanarak fon çekme işleminden çıkar'
---

`withdrawExitFaster` metodu, `withdrawStart` metodundan gelen txHash kullanarak fon çekme işleminden çıkmak için kullanılabilir.


Hızlıdır çünkü arka uçta kanıt üretir. [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)'yi yapılandırmanız gerekir.

**Not**- Fon çekme işleminden çıkmak için withdrawStart işleminde denetim noktası belirlenmelidir.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
