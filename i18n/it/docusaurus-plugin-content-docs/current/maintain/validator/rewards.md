---
id: rewards
title: Ricompense
sidebar_label: Rewards
description: Scopri gli incentivi per lo staking sulla rete di Polygon.
keywords:
  - docs
  - matic
  - polygon
  - rewards
  - staking
  - incentives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Per un'introduzione all'algoritmo di Polygon e all'algoritmo di prova di gioco, vedere [che cosa è la prova di gioco](/docs/home/polygon-basics/what-is-proof-of-stake)

In Polygon, i validatori mettono in staking i loro token MATIC come garanzia per lavorare alla sicurezza della rete e, in cambio del loro servizio, guadagnano ricompense.

Per sfruttare gli aspetti di Polygon, dovresti diventare un validatore o un delegatore.

Per rivestire il ruolo di [validatore](/docs/maintain/glossary.md#validator), devi **eseguire un nodo validatore completo** e mettere in staking MATIC. Vedi [convalidare](/docs/maintain/validate/validator-index).

Anche controlla la pagina [delle responsabilità di](/docs/maintain/validate/validator-responsibilities) Validatore.

Per rivestire il ruolo di [delegatore](/docs/maintain/glossary.md#delegator), devi solo **delegare MATIC a un validatore** Vedi [Delegare](/docs/maintain/delegate/delegate).

## Qual è l'incentivo? {#what-is-the-incentive}

Polygon stanzia il 12% della sua supply totale pari a 10 miliardi di token per finanziare le ricompense di staking. Questo per garantire che la rete abbia una struttura sufficientemente robusta fino al momento nel quale le commissioni di transazione abbiano raggiunto la necessaria popolarità. Queste ricompense hanno principalmente lo scopo di supportare l'avvio della rete, mentre sul lungo termine il protocollo dovrebbe sostenersi grazie alle commissioni derivanti dalle transazione.

**Ricompense per il Validatore = Ricompense per lo Staking + Commissioni delle transazioni**

Viene assegnato in modo da garantire il graduale disaccoppiamento delle ricompense di staking dall'essere la componente dominante delle ricompense del validatore.

| Anno | Stake target (30% della supply circolante) | Tasso di ricompensa per il 30% di Bonding | Pool di ricompense |
|---|---|---|---|
| Primo | 1.977.909.431 | 20% | 312.917.369 |
| Secondo | 2.556.580.023 | 12% | 275.625.675 |
| Terzo | 2.890.642.855 | 9% | 246.933.140 |
| Quarto | 2.951.934.048 | 7% | 204.303.976 |
| Quinto | 2.996.518.749 | 5% | 148.615.670 + **11.604.170** |

Di seguito è riportata uno snapshot di esempio delle ricompense annuali previste per i primi 5 anni considerando la supply in staking che va dal 5% al 40% con un intervallo del 5%

| % della supply circolante messa in staking | 5% | 10% | 15% | 20% | 25% | 30% | 35% | 40% |
|---|---|---|---|---|---|---|---|---|
| Ricompensa annuale per anno |
| Primo | 120% | 60% | 40% | 30% | 24% | 20% | 17,14% | 15% |
| Secondo | 72% | 36% | 24% | 18% | 14,4% | 12% | 10,29% | 9% |
| Terzo | 54% | 27% | 18% | 13,5% | 10,8% | 9% | 7,71% | 6,75% |
| Quarto | 42% | 21% | 14% | 10,5% | 8,4% | 7% | 6% | 5,25% |
| Quinto | 30% | 15% | 10% | 7,5% | 6% | 5% | 4,29% | 3,75% |

## Chi ottiene gli incentivi? {#who-gets-the-incentives}

Gli staker che eseguono nodi validatori e gli staker che delegano i loro token a un validatore per cui hanno una preferenza.

I validatori hanno la possibilità di addebitare una commissione sulla ricompensa guadagnata dai delegatori.

I fondi appartenenti a tutti gli staker sono bloccati in un contratto distribuito sulla Ethereum mainnet.

Nessun validatore detiene la custodia dei token dei delegatori.

## Ricompense per lo staking {#staking-rewards}

L'incentivo annuale è assoluto: indipendentemente dallo stake complessivo o dal tasso di target bonding nella rete, l'importo dell'incentivo viene distribuito periodicamente come ricompensa a tutti i firmatari.

In Polygon esiste un elemento aggiuntivo per l'invio periodico di [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) alla Ethereum mainnet. Questa è una parte importante delle responsabilità dei validatori e vengono incentivati a svolgere questa attività. Questo costituisce un costo per il validatore, un aspetto unico per una soluzione Layer 2 come Polygon. Ci impegniamo per inserire questo costo nel meccanismo di pagamento delle ricompense di staking del validatore come bonus da pagare al [proponente](/docs/maintain/glossary.md#proposer), che è responsabile dell'invio del checkpoint. Le ricompense, meno il bonus, devono essere ripartite proporzionalmente tra tutti gli staker, il proponente e i [firmatari.](/docs/maintain/glossary.md#signer-address)

## Incoraggiare il proponente a includere tutte le firme {#encouraging-the-proposer-to-include-all-signatures}

Per usufruire completamente del bonus, il [proponente](/docs/maintain/glossary.md#proposer) deve includere tutte le firme nel [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction). Poiché il protocollo richiede un valore pari ai ⅔ +1 dello stake totale, il checkpoint viene accettato anche con l'80% dei voti. Tuttavia, in questo caso, il proponente ottiene solo l'80% del bonus calcolato.

## Commissioni per le transazioni {#transaction-fees}

A ciascun produttore di blocchi di [Bor](/docs/maintain/glossary.md#bor) viene assegnata una certa percentuale delle commissioni di transazione raccolte in ciascun blocco. La selezione dei produttori per ciascuno span dipende anche dal rapporto tra lo stake del validatore e lo stake totale. Le rimanenti commissioni per le transazioni vengono trasferite attraverso lo stesso funnel come ricompense da condividere tra tutti i validatori che lavorano al layer [Heimdall](/docs/maintain/glossary.md#heimdall).
