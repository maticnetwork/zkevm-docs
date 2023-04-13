---
id: polygon-architecture
title: L'architettura di Polygon
description: L'architettura di Polygon
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# L'architettura di Polygon {#the-architecture-of-polygon}

**Polygon** è una piattaforma di applicazione blockchain che fornisce una sidechain ibrida di Proof-of-Stake e una sidechain di Plasma.

Da un punto di vista strutturale, la bellezza di Polygon risiede nel suo elegante design, il quale presenta un generico livello di validazione separato da diversi ambienti di esecuzione come catene Plasma, sidechain EVM a pieno regime, e in futuro, altri approcci al layer 2 come ad esempio i rollup Optimistic.

La rete Polygon PoS ha un'architettura a tre layer:

* **Strato di** Ethereum — una serie di contratti sul mainnet di Ethereum.
* **Heimdall layer** — una serie di nodi di prova di punta che funzionano parallelamente al mainnet di Ethereum, monitorando la serie di contratti di staking distribuiti sulla mainnet di Ethereum e impegnando i checkpoint di Polygon Network nel mainnet di Ethereum. Heimdall è basato su Tendermint.
* **Strato** di bor: una serie di nodi Bor che producono in blocco sono stati mescolati dai nodi di Heimdall Bor è basato su Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

Attualmente, gli sviluppatori possono utilizzare **Plasma** per specifiche transizioni di stato per le quali i predicati di Plasma sono stati scritti, come ERC20, ERC721, asset swap o altri predicati personalizzati. Per transizioni di stato arbitrarie,
possono usare PoS. O entrambi! Questo è reso possibile dalla costruzione ibrida di Polygon.

Per abilitare il meccanismo PoS sulla nostra piattaforma, una serie di contratti di gestione di **staking** sono implementati su Ethereum, e un insieme di validatori incentivati che eseguono nodi **Heimdall** e **Bor**. Ethereum è
la prima base chain supportata da Polygon, ma Polygon intende offrire il supporto per altre basechain per abilitare una piattaforma blockchain interoperabile e decentralizzata di livello 2 basata sui suggerimenti e sul consenso della comunità.

<img src={useBaseUrl("img/matic/Architecture.png")} />

## Contratti di staking {#staking-contracts}

Per abilitare il meccanismo [Proof of Stake (PoS)](docs/home/polygon-basics/what-is-proof-of-stake) su Polygon,
il sistema utilizza una serie di contratti di gestione di [staking](/docs/maintain/glossary#staking) sulla mainnet Ethereum.

I contratti di staking implementano le seguenti caratteristiche:

* Chiunque può eseguire lo staking sui token MATIC sui contratti di staking sulla mainnet di Ethereum e aderire al sistema come [validatore](/docs/maintain/glossary#validator).
* Guadagna ricompense di staking convalidando le transizioni di stato sulla rete di Polygon.
* Salva i [checkpoint](/docs/maintain/glossary#checkpoint-transaction) sulla Ethereum mainnet.

Il meccanismo PoS funge anche da attenuante per il problema dell'indisponibilità dei dati per le sidechain di Polygon.

## Heimdall {#heimdall}

Heimdall è il livello di convalida della proof of stake che gestisce l'aggregazione dei blocchi prodotti da [Bor](/docs/maintain/glossary#bor) in un albero di Merkle e pubblica la root di Merkle periodicamente alla catena root. La pubblicazione periodica di istantanee della catena laterale Bor è chiamata [checkpoint](/docs/maintain/glossary#checkpoint-transaction).

1. Convalida tutti i blocchi a partire dall'ultimo checkpoint.
2. Crea un albero di Merkle degli hash del blocco.
3. Pubblica il Merkle root hash sulla Ethereum mainnet.

I checkpoint sono importanti per due motivi:

1. Rendono definitiva la root chain.
2. Forniscono la proof-of-burn nel prelievo degli asset.

Una panoramica del processo:

* Un sottoinsieme di validatori attivi del pool viene selezionato per agire come [produttori di blocchi](/docs/maintain/glossary#block-producer) per uno [span](/docs/maintain/glossary#span). Questi produttori di blocchi sono responsabili della creazione e trasmissione dei blocchi creati sulla rete.
* Un checkpoint include il Merkle root hash di tutti i blocchi creati durante un dato intervallo. Tutti i nodi convalidano il Merkle root hash e vi appongono la propria firma.
* Un [proponente](/docs/maintain/glossary#proposer) selezionato dall'insieme di validatori ha la responsabilità di raccogliere tutte le firme per un determinato checkpoint e inviarlo alla Ethereum mainnet.
* La responsabilità di creare blocchi e proporre checkpoint varia in base al rapporto di staking di un validatore nella pool globale.

Maggiori dettagli su Heimdall sono disponibili nella guida all'[architettura](/docs/pos/heimdall/overview) di Heimdall.

## Bor {#bor}

Bor è lo strato di produttore di sidechain di Polygon: l'entità responsabile dell'aggregazione delle transazioni in blocchi. Al momento, è un'implementazione Geth di livello base con un algoritmo di consenso modificato in modo specifico.

I produttori di blocco sono una subnet dei validatori e vengono periodicamente rimpiazzati tramite la selezione di comitato su [Heimdall](/docs/maintain/glossary#heimdall) in termini di durata come `span` in Polygon. I blocchi vengono prodotti nel nodo **Bor** e la VM della sidechain è compatibile con EVM.
I blocchi prodotti su Bor vengono anche convalidati periodicamente dai nodi Heimdall e un checkpoint composto
dall'hash dell'albero di Merkle di un insieme di blocchi su Bor viene impegnato periodicamente su Ethereum.

Maggiori dettagli sono disponibili nella guida all'[architettura di Bor](/docs/pos/bor/overview).

## Risorse {#resources}

* [Architettura Bor](https://wiki.polygon.technology/docs/pos/bor)
* [Architettura Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [Meccanismo del checkpoint](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
