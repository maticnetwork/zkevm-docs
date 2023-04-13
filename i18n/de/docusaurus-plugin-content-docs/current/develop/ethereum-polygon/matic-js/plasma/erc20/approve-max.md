---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Maximalbeträge auf Root-Token genehmigen.'
---

Mit dieser `approveMax`-Methode kann der Maximalbetrag des root-Tokens freigegeben werden.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
