---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawExitFaster {#withdrawexitfaster}

`withdrawExitFaster` metodu tüm token'ları onaylamak için kullanılabilir.

Hızlıdır çünkü kanıtı arka planda üretir. Arka plan (backend) özel atanmış rpc ile yapılandırılabilir.

**Not**- withdrawStart işlemine fon çekme işleminden çıkış için denetim noktası atanmalıdır.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
