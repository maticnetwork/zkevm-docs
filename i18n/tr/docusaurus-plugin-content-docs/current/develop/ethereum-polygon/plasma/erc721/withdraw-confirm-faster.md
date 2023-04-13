---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

`withdrawConfirmFaster` metodu, plasma çekme işleminin ikinci adımıdır. Bu adımda yakma işleminizin (ilk işlemin) kanıtı gönderilir ve denk değerde bir erc721 token'ı oluşturulur.

Bu işlem başarılı olduktan sonra sorgulama dönemi başlar ve sorgulama dönemi tamamlandıktan sonra kullanıcı çektiği miktarı kök zincir üzerindeki hesabına geri alabilir.

Sorgulama dönemi mainnet için 7 gündür.

<div class="highlight mb-20px mt-20px">
Hızlıdır çünkü kanıtı arka planda üretir. [setProofAPI] yapılandırmanız gerekir (/docs/develop/ethereum-polygon/matic-js/set-proof-api).
</div>

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
