---
id: derivatives
title: Derivati
description: Delegazione attraverso le azioni di validatore
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon supporta la [delegazione](/docs/maintain/glossary#delegator) mediante le quote del validatore. Usando questo design è più facile distribuire le ricompense e ridurre scalando i contratti sull'Ethereum mainnet senza che sia necessaria un'elaborazione elevata.

I delegatori delegano acquistando dai validatori le quote di un pool finito. Ciascun validatore detiene il proprio token di quota del validatore.

Chiamiamo VATIC i token fungibili che rappresentano la quota del validatore per il Validatore A. Quando un utente delega al Validatore A, vengono emessi all'utente dei VATIC al tasso di cambio della coppia MATIC-VATIC. Man a mano che gli utenti accumulano valore, il tasso di cambio indica che l'utente può prelevare più MATIC per ciascun VATIC. A seguito dello slashing dei validatori, gli utenti potranno prelevare meno MATIC per i loro VATIC.

Ricorda che MATIC è il token per lo staking. Un delegatore ha bisogno dei token MATIC per partecipare alla delegazione.

Inizialmente, il Delegatore D acquista i token dal pool specifico del Validatore A quando il tasso di cambio è 1 MATIC per 1 VATIC.

Quando un validatore viene ricompensato con più token MATIC, i nuovi token vengono aggiunti al pool.

Diciamo che al pool attuale di 100 token MATIC vengono aggiunti 10 MATIC di ricompense. Poiché la fornitura totale di token VATIC non è cambiata a causa delle ricompense il tasso di cambio diventa 1 MATIC per 0,9 VATIC. Ora il Delegatore D ottiene più MATIC per la stessa quantità se le condivisioni.

## Il flusso nel contratto {#the-flow-in-the-contract}

`buyVoucher`: Questa funzione viene attribuita quando si esegue un processo di delegazione verso un validatore. La delegazione `_amount` viene prima trasferita a `stakeManager`, che previa conferma crea quote di delegazione mediante `Mint` utilizzando il `exchangeRate` attuale.

Il tasso di cambio viene calcolato secondo la formula:

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`: Questa è la funzione che viene chiamata quando un delegatore si dissocia da un validatore. In pratica, questa funzione avvia il processo di vendita dei voucher acquistati durante la delegazione. Vi è un periodo di prelievo da prendere in considerazione prima che i delegatori possano `claim` i loro token.

`withdrawRewards`: Come delegatore, puoi riscuotere le tue ricompense invocando la funzione `withdrawRewards`.

`reStake`: Il restaking può funzionare in due modi: a) il delegatore può acquistare più quote utilizzando `buyVoucher` o le ricompense `reStake`. Puoi fare il restaking mediante lo staking di più token verso un validatore oppure puoi fare il restaking delle tue ricompense accumulate come delegatore. Lo scopo di `reStaking` è che, dal momento che il validatore del delegatore ha ora più stake attivo, guadagnerà più ricompense per questo e così anche il delegatore.

`unStakeClaimTokens`: Una volta terminato il periodo di prelievo, i delegatori che abbiano venduto le proprie quote possono riscuotere i rispettivi token MATIC.

`updateCommissionRate`: Aggiorna la % di commissione per il validatore. Vedi anche [Commissioni operative del validatore](/docs/maintain/validate/validator-commission-operations).

`updateRewards`: Quando un validatore ottiene le ricompense per l'invio di un [checkpoint](/docs/maintain/glossary#checkpoint-transaction), questa funzione viene chiamata per l'erogazione delle ricompense tra il validatore e i delegatori.
