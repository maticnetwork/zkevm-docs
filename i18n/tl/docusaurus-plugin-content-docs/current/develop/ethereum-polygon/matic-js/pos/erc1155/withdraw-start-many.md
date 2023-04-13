---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'Pasimulan ang proseso ng pag-withdraw.'
---

Maaaring gamitin ang paraang `withdrawStartMany` upang pasimulan ang proseso ng pag-withdraw na siyang magbu-burn sa mga tinukoy na halaga ng maraming token ayon sa pagkakasunod-sunod sa polygon chain.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
