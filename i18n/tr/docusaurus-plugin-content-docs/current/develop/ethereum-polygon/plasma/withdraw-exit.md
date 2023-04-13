---
id: withdraw-exit
title: withdraw exit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawExit {#withdrawexit}

Plasma fon çekme işleminden `withdrawExit` metodunu kullanan herkes tarafından çıkış yapılabilir. Çıkış işlemi ancak sorgulama dönemi tamamlandıktan sonra çalışacaktır.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Ayrıca birden fazla token için, token listesini bir dizi halinde sunarak çıkış yapabilirsiniz.
