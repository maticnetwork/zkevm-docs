---
id: withdraw-confirm
title: withdraw challenge
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawConfirm {#withdrawconfirm}

`withdrawConfirm` metodu, plasma çekme işleminin ikinci adımıdır. Bu adımda yakma işleminizin (ilk işlemin) kanıtı gönderilir ve denk değerde bir erc721 token'ı oluşturulur.

Bu işlem başarılı olduktan sonra sorgulama dönemi başlar ve sorgulama dönemi tamamlandıktan sonra kullanıcı çektiği miktarı kök zincir üzerindeki hesabına geri alabilir.

Sorgulama dönemi mainnet için 7 gündür.

**Not**- Çekme işlemini sorgulamak için withdrawStart işlemi için denetim noktası belirlenmelidir.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Sorgulama dönemi tamamlandıktan sonra, çekme işleminden çıkmak ve çekilen miktarı geri almak için `withdrawExit` çağrılabilir.
