---
id: withdraw-start
title: Auszahlung einleiten
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Initiiere den Auszahlungsprozess'
---

`withdrawStart`-Methode kann angewandt werden, um den Auszahlungsvorgang zu starten, wobei der angegebenen Betrag am Child-Token ausgeschieden wird.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Speichere txHash, das benötigt wird, um den Auszahlungsvorgang zu beeinspruchen.
