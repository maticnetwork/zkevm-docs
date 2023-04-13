---
id: approve-all
title: Alle freigeben
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'ERC1155 Token freigeben.'
---

# Alle freigeben {#approveall}

Mit der Methode `approveAll` können alle Token auf dem Root-Token freigegeben werden.

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
