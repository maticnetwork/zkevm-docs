---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'Aprueba los tokens acuñables ERC-1155.'
---

# approveAllForMintable {#approveallformintable}

El método `approveAllForMintable` se puede utilizar para autorizar todos los tokens acuñables en el token primario.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
