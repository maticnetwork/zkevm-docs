---
id: approve
title: Freigeben
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# Freigeben {#approve}

Die `approve`-Methode kann angewandt werden, um den erforderlichen Betrag des Root-Tokens freizugeben.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
