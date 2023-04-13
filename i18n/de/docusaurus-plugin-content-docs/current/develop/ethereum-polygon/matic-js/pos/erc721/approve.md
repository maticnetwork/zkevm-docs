---
id: approve
title: Freigeben
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: 'Den erforderlichen Betrag auf Root-Token freigeben'
---

Die `approve`-Methode kann zur Freigabe eines erforderlichen Betrags für den Root-Token angewandt werden.

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
