---
id: withdraw-exit
title: i-withdraw ang pag-exit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Magsimula sa maticjs '
---

# withdrawExit {#withdrawexit}

Sa plasma, ang proseso ng pag-withdraw ay maaaring i-exit ng sinuman gamit ang `withdrawExit`method. Gagana lang ang proseso ng pag-exit pagkatapos makumpleto ang challenge period.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Maaari ka ring mag-exit para sa maraming token sa pamamagitan ng pagbibigay ng listahan ng mga token nang nakahanay.
