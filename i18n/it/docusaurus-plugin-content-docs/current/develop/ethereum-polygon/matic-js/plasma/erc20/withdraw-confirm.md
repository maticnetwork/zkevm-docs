---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Conferma il prelievo.'
---

Il metodo `withdrawConfirm` è il secondo step del processo di prelievo in plasma. In questo passaggio viene inviata la prova della transazione burn (prima transazione) e viene creato un token erc20 di valore equivalente.

Una volta che il processo è riuscito, inizia il periodo di challenge, al termine del quale l'utente può recuperare l'importo prelevato sul proprio account nella catena di root.

Il periodo di challenge per la mainnet è di 7 giorni.

**Nota**: per la transazione withdrawStart deve essere effettuato il checkpoint in modo tale da sfidare il prelievo.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Al termine del periodo di challenge, si può chiamare `withdrawExit` per uscire dal processo di prelievo e riottenere l'importo del prelievo.
