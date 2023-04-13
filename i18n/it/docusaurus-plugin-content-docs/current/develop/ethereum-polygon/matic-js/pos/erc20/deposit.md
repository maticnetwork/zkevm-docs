---
id: deposit
title: deposit
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Deposita l''importo richiesto dal token root al token figlio.'
---

Il metodo `deposit` può essere utilizzato per depositare l'importo richiesto dal token root al token figlio.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

La visualizzazione dell'importo depositato sulla catena di polygon potrebbe richiedere del tempo. Puoi utilizzare il metodo [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) per controllare lo stato.
