---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'Déposez plusieurs jetons de l''Ethereum à la chaîne de polygone.'
---

`depositMany` la méthode peut être utilisée pour déposer plusieurs jetons d'ethereum à la chaîne de polygone.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
