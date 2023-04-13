---
id: architecture
title: Architettura
description: Strati di Ethereum, Heimdall e Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

La rete di Polygon è suddivisa in tre layer:

* **Strato di** Ethereum — una serie di contratti sul mainnet di Ethereum.
* **Heimdall layer** — una serie di nodi di prova di punta che funzionano in parallelo al mainnet di Ethereum, monitorando la serie di contratti di stringatura implementati sul mainnet di Ethereum e impegnando i checkpoint di Polygon Network per il mainnet di Ethereum. Heimdall è basato su Tendermint.
* **Strato** di bor: una serie di nodi Bor che producono in blocco sono stati mescolati dai nodi di Heimdall Bor è basato su Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

## Gli smart contract di staking e Plasma su Ethereum {#staking-and-plasma-smart-contracts-on-ethereum}

Per abilitare il meccanismo di [Proof of Stake (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) su Polygon, il sistema utilizza una serie di contratti di gestione dello [staking](/docs/maintain/glossary.md#staking) sulla Ethereum mainnet.

I contratti di staking implementano le seguenti caratteristiche:

* La possibilità per chiunque di mettere in staking token MATIC in contratti di staking sulla Ethereum mainnet e unirsi al sistema come [validatore](/docs/maintain/glossary.md#validator).
* Guadagna ricompense di staking convalidando le transizioni di stato sulla rete di Polygon.
* Salva i [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) sulla Ethereum mainnet.

Il meccanismo PoS funge anche da attenuante per il problema dell'indisponibilità dei dati per le sidechain di Polygon.

## Heimdall (layer di validazione) {#heimdall-validation-layer}

Il layer di Heimdall gestisce l'aggregazione dei blocchi prodotti da [Bor](/docs/maintain/glossary.md#bor) in un albero di Merkle, pubblicando periodicamente la Merkle root sulla root chain. La pubblicazione periodica di snapshot della sidechain di Bor è chiamata [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction).

Dopo un certo numero blocchi su Bor, un validatore sul layer Heimdall:

1. Convalida tutti i blocchi a partire dall'ultimo checkpoint.
2. Crea un albero di Merkle degli hash del blocco.
3. Pubblica il Merkle root hash sulla Ethereum mainnet.

I checkpoint sono importanti per due motivi:

1. Rendono definitiva la root chain.
2. Forniscono la proof-of-burn nel prelievo degli asset.

Una panoramica del processo:

* Un sottoinsieme di validatori attivi del pool viene selezionato per agire come [produttori di blocchi](/docs/maintain/glossary.md#block-producer) per uno [span](/docs/maintain/glossary.md#span). Questi produttori di blocchi sono responsabili della creazione e trasmissione dei blocchi creati sulla rete.
* Un checkpoint include il Merkle root hash di tutti i blocchi creati durante un dato intervallo. Tutti i nodi convalidano il Merkle root hash e vi appongono la propria firma.
* Un [proponente](/docs/maintain/glossary.md#proposer) selezionato dall'insieme di validatori ha la responsabilità di raccogliere tutte le firme per un determinato checkpoint e inviarlo alla Ethereum mainnet.
* La responsabilità di creare blocchi e proporre checkpoint varia in base al rapporto di staking di un validatore nel pool globale.

Vedere anche [architettura Heimdall](/docs/pos/heimdall/overview).

## Bor (il layer produttore di blocchi) {#bor-block-producer-layer}

Bor è il produttore di blocchi della sidechain di Polygon, l'entità responsabile dell'aggregazione delle transazioni in blocchi.

I produttori di blocchi Bor sono un sottoinsieme dei validatori e vengono mescolati periodicamente dai validatori di [Heimdall](/docs/maintain/glossary.md#heimdall).

Vedi anche l'[architettura Bor](/docs/pos/bor/overview).
