---
id: withdraw-confirm
title: challenge di prelievo
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# withdrawConfirm {#withdrawconfirm}

`withdrawConfirm` è la seconda fase nel processo di prelievo di plasma. In questa fase viene presentata prova della tua transazione burn (prima transazione) e viene creato un token erc721 di valore equivalente.

Una volta che il processo è riuscito, inizia il periodo di challenge, al termine del quale l'utente può recuperare l'importo prelevato sul proprio account nella root chain.

Il periodo di challenge per la mainnet è di 7 giorni.

**Nota**: per la transazione withdrawStart deve essere effettuato il checkpoint in modo tale da sfidare il prelievo.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Al termine del periodo di challenge, si può chiamare `withdrawExit` per uscire dal processo di prelievo e riottenere l'importo del prelievo.
