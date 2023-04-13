---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawConfirm {#withdrawconfirm}

`withdrawConfirm` metodu, plasma çekme işleminin ikinci adımıdır. Bu adımda yakma işleminizin (ilk işlemin) kanıtı gönderilir ve denk değerde bir erc721 token'ı oluşturulur.

Bu işlem başarılı olduktan sonra sorgulama dönemi başlar ve sorgulama dönemi tamamlandıktan sonra kullanıcı çektiği miktarı kök zincir üzerindeki hesabına geri alabilir.

Sorgulama dönemi mainnet için 7 gündür.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
