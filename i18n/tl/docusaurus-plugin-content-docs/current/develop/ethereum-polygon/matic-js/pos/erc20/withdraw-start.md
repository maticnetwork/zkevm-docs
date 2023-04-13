---
id: withdraw-start
title: withdraw start
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Pasimulan ang proseso ng pag-withdraw.'
---

Maaaring gamitin ang paraang `withdrawStart` upang pasimulan ang proseso ng pag-withdraw na siyang magbu-burn sa tinukoy na halaga sa polygon chain.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Gagamitin ang natanggap na hash ng transaksyon upang lumabas sa proseso ng pag-withdraw. Kaya inirerekomenda naming itago ito.

