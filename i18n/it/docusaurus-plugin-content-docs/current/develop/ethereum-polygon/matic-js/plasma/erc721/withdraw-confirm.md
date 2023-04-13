---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'Conferma il prelievo.'
---

Il metodo `withdrawConfirm` è il secondo step del processo di prelievo in plasma. In questa fase viene presentata prova della tua transazione burn (prima transazione) e viene creato un token erc721 di valore equivalente.

Dopo la riuscita del processo, inizia il periodo di challenge, al termine del quale l'utente può riottenere l'importo prelevato sul proprio account nella root chain.

Il periodo di challenge per la mainnet è di 7 giorni.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
