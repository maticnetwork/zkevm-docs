---
id: withdraw-confirm-faster
title: prelevare challenge più velocemente
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# Il metodo withdrawConfirmFaster {#withdrawconfirmfaster}

`withdrawConfirmFaster` è la seconda fase nel processo di prelievo di plasma. In questa fase viene presentata prova della tua transazione burn (prima transazione) e viene creato un token erc721 di valore equivalente.

Dopo la riuscita del processo, inizia il periodo di challenge, al termine del quale l'utente può riottenere l'importo prelevato sul proprio account nella root chain.

Il periodo di challenge sulla mainnet è di 7 giorni.

<div class="highlight mb-20px mt-20px">È veloce perché genera la prova nel backend. Devi configurare [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).</div>

**Nota**: per la transazione withdrawStart deve essere effettuato il checkpoint in modo tale da sfidare il prelievo.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Al termine del periodo di challenge, si può chiamare `withdrawExit` per uscire dal processo di prelievo e riottenere l'importo del prelievo.
