---
id: general-faq
title: Domande frequenti generali
description: Domande comuni sulla rete di Polygon.
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Cos'è la rete di Polygon? {#what-is-polygon-network}

La rete di Polygon è una soluzione di scalabilità layer 2 che raggiunge la scala utilizzando le sidechain per il calcolo della off-chain, garantendo al contempo la sicurezza e la decentralizzazione degli asset tramite i validatori di Proof-of-Stake (PoS).

Vedi anche [Cosa è Polygon](/docs/home/polygon-basics/what-is-polygon).

## Cosa significa Proof of Stake (PoS)? {#what-is-proof-of-stake-pos}

Il Proof-of-Stake è un sistema in cui la rete blockchain mira a ottenere un consensus distribuito. Chiunque abbia un importo sufficiente di token può bloccare le proprie criptovalute e l'incentivo economico risiede nel valore condiviso della rete decentralizzata. Chi mette in staking le proprie criptovalute convalida le transazioni votando sulle stesse mentre il consensus viene raggiunto quando una transazione o un insieme di transazioni in blocco o un insieme di blocchi in un checkpoint riceve abbastanza voti. La soglia utilizza il peso in termini di stake che viene fornito con ogni voto. Ad esempio, in Polygon si ottiene il consensus per l'invio di checkpoint dei blocchi di Polygon alla rete di Ethereum quando almeno i ⅔ +1 del potere di staking totale vota per questo.

Vedi anche [Cosa significa Proof of Stake](/docs/home/polygon-basics/what-is-proof-of-stake).

## Quale ruolo gioca il Proof-of-Stake nell'architettura Polygon? {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

Il layer Proof-of-Stake nell'architettura Polygon ha i seguenti 2 scopi:

* Agisce come layer di incentivazione per mantenere la vitalità della catena di Plasma, mitigando principalmente la spinosa questione dell'indisponibilità di dati.
* Implementa le garanzie di sicurezza Proof-of-Stake per le transizioni di stato non coperte da Plasma.

## In che modo Polygon pos è diverso da altri sistemi simili? {#how-is-polygon-pos-different-from-other-similar-systems}

È diverso nel senso che ha un duplice scopo: fornire garanzie di disponibilità di dati per la catena Plasma che copre le transizioni di stato tramite Plasma Predicates, nonché la convalida Proof-of-Stake per i contratti smart generici nell'EVM.

L'architettura Polygon separa anche il processo di produzione e convalida dei blocchi in 2 layer distinti. I validatori come produttori di blocchi creano blocchi, come suggerisce il nome, sulla catena di Polygon per conferme parziali più rapide (< 2 sec) mentre la conferma finale si ottiene una volta che viene eseguito il checkpoint sulla main-chain con un certo intervallo, il cui periodo può variare in base a molteplici fattori come la congestione di Ethereum o il numero di transazioni Polygon. In condizioni ideali, dovrebbe essere tra 15 minuti e 1 ora circa.

Un checkpoint è fondamentalmente la radice di Merkle di tutti i blocchi prodotti tra gli intervalli. I validatori svolgono più ruoli, creando dei blocchi al layer produttore del blocco, partecipando al consensus firmando tutti i checkpoint ed eseguendo il checkpoint quando agiscono come proponenti. La probabilità che un validatore diventi il produttore o il proponente del blocco si basa sul rapporto degli stake nel pool complessivo.

## Incoraggiare il proponente ad includere tutte le firme {#encouraging-the-proposer-to-include-all-signatures}

Per usufruire completamente del bonus del proponente, il proponente dovrebbe includere tutte le firme nel checkpoint.
 Poiché il protocollo richiede il peso dei 2/3+1 dello stake totale, il checkpoint verrà accettato anche con i voti dell'80%. Tuttavia, in questo caso, il proponente ottiene solo l'80% del bonus calcolato.

## Come posso inoltrare un ticket di supporto o contribuire alla documentazione di Polygon? {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
Se pensi che debba essere risolto qualcosa nella nostra documentazione o vuoi anche aggiungere nuove informazioni qui, puoi [sollevare un problema sul repository Github](https://github.com/maticnetwork/matic.js/issues). Il [file Readme](https://github.com/maticnetwork/matic-docs/blob/master/README.md) sul repository ti fornisce anche alcuni suggerimenti su come contribuire alla nostra documentazione.

Se hai ancora bisogno di aiuto, puoi sempre contattare il **nostro team di supporto**.
