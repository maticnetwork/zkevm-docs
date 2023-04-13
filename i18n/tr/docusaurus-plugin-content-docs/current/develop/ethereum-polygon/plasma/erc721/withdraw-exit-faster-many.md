---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawExitFasterMany {#withdrawexitfastermany}

`withdrawExitFasterMany` metodu tüm token'ları onaylamak için kullanılabilir.

Hızlıdır çünkü kanıtı arka planda üretir. Arka plan (backend) özel atanmış rpc ile yapılandırılabilir.

**Not**- withdrawStart işlemine fon çekme işleminden çıkış için denetim noktası atanmalıdır.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
