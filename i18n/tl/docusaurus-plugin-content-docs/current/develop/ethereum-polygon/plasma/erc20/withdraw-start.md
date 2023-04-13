---
id: withdraw-start
title: simula ng pag-withdraw
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# withdrawStart {#withdrawstart}

Ang `withdrawStart`method ay maaaring gamitin upang simulan ang proseso ng pag-withdraw na magsusunog ng tinukoy na halaga sa child token.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Itago ang txHash na gagamitin upang hamunin ang proseso ng pag-withdraw.
