---
id: transfer
title: transférez
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Transférez des jetons d''un utilisateur à un autre.'
---

`transfer`la méthode peut être utilisée pour transférer des jetons d'un utilisateur à un autre.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
