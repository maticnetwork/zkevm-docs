---
id: deposit
title: deposit
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Angeforderten Betrag vom Root-Token an den Child-Token einzahlen'
---

Mit dieser `deposit`-Methode kann der erforderliche Betrag vom Root-Token zum Child-Token eingezahlt werden.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Es kann einige Zeit dauern, bis der eingezahlte Betrag auf der Polygon-Chain wiedergegeben wird. Zur Statusüberprüfung kannst du die Methode [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) benutzen.
