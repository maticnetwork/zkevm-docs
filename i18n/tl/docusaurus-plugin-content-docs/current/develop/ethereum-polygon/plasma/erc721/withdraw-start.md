---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Pagsisimula sa maticjs'
---

# withdrawStart  {#withdrawstart}

Maaaring gamitin ang paraang `withdrawStart`upang pasimulan ang proseso ng pag-withdraw na siyang magbu-burn sa tinukoy na token sa polygon chain.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
