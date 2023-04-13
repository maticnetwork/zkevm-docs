---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'Pasimulan ang proseso ng pag-withdraw.'
---

Maaaring gamitin ang paraang `withdrawStart` upang pasimulan ang proseso ng pag-withdraw na siyang magbu-burn sa tinukoy na halaga ng tokenId sa polygon chain.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
