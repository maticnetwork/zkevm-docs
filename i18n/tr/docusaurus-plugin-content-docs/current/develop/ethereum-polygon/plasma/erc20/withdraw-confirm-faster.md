---
id: withdraw-confirm-faster
title: withdraw challenge faster
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

`withdrawConfirmFaster` metodu, plasma çekme işlemindeki ikinci adımdır. Bu adımda yakma işleminizin (ilk işlemin) kanıtı gönderilir ve denk değerde bir erc721 token'ı oluşturulur.

Bu işlem başarılı olduktan sonra, sorgulama (challenge) dönemi başlar ve sorgulama dönemi tamamlandıktan sonra kullanıcı çektiği miktarı kök zincir üzerindeki hesabına geri alabilir.

Sorgulama dönemi mainnet için 7 gündür.

<div class="highlight mb-20px mt-20px">
Hızlıdır çünkü kanıtı arka planda üretir. [setProofAPI] yapılandırmanız gerekir (/docs/develop/ethereum-polygon/matic-js/set-proof-api).
</div>

**Not**- Çekme işlemini sorgulamak için withdrawStart işlemi için denetim noktası belirlenmelidir.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Sorgulama dönemi tamamlandıktan sonra, çekme işleminden çıkmak ve çekilen miktarı geri almak için `withdrawExit` çağrılabilir.
