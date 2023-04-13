---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Lumabas sa proseso ng pag-withdraw gamit ang txHash mula sa `withdrawStart`'
---

Maaaring gamitin ang paraang `withdrawExit` upang lumabas sa proseso ng pag-withdraw sa pamamagitan ng paggamit sa txHash mula sa paraang `withdrawStart`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Gumagawa ang paraang ito ng maraming RPC call upang mag-generate ng proof at paglabas sa proseso. Kaya inirerekomendang gamitin ang paraang withdrawExitFaster.
>
