---
id: withdraw-exit-faster
title: withdraw exit faster
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'withdrawStart''tan gelen txHash''i kullanarak fon çekme işleminden daha hızlı çık.'
---

`withdrawExitFaster` metodu, `withdrawStart` metodundan gelen txHash'i kullanarak fon çekme işleminden daha hızlı çıkmak için kullanılabilir.

İşlem genelde hızlıdır çünkü kanıtı arka uçta üretir. [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)'yi yapılandırmanız gerekir.

**Not**- Fon çekme işleminden çıkmak için withdrawStart işleminde denetim noktası belirlenmelidir.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

İşlem tamamlandıktan ve denetim noktası atandıktan sonra miktar kök zincire yatırılacaktır.
