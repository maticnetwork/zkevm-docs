---
id: deposit-ether
title:  déposez l'ether
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Déposez un nombre requis d''ether depuis l’Ethereum à Polygone.'
---

`depositEther`la méthode  peut être utilisée pour déposer le montant nécessaire **d'ether** depuis Ethereum à Polygone.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
