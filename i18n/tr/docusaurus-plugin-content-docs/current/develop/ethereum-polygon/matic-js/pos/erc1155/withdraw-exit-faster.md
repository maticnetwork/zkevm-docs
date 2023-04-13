---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'withdrawStart''tan txHash kullanarak fon çekme işleminden çıkar.'
---

`withdrawExitFaster` metodu, `withdrawStart` metodundan txHash kullanarak fon çekme işleminden çıkmak için kullanılabilir.

Hızlıdır çünkü arka uçta kanıt üretir. [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)'yi yapılandırmanız gerekir.

**Not**- Fon çekme işleminden çıkmak için withdrawStart işleminde denetim noktası belirlenmelidir.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
