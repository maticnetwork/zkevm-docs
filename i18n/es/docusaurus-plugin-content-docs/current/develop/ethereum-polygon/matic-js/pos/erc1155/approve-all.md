---
id: approve-all
title: approveAll (Aprobar todo)
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'Aprueba los tokens ERC-1155.'
---

# approveAll (Aprobar todo) {#approveall}

El método `approveAll` puede utilizarse para aprobar todos los tokens en el token primario .

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
