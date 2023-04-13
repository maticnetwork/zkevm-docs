---
id: withdraw-start
title: retirerCommencer
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'Lancez le processus de retrait'
---

`withdrawStart`la méthode  peut être utilisée pour lancer le processus de retrait qui brûlera la quantité spécifiée de tokenId sur la chaîne Polygone.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
