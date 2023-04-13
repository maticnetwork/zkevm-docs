---
id: heimdall-chain
title: Catena Heimdall
description: Strato di verificatore di puntata sulla rete Polygon
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Heimdall è lo strato di verificatore di posta di prova, che è responsabile per il [checkpointing](/docs/maintain/glossary.md#checkpoint-transaction) della rappresentazione dei blocchi di Plasma al mainnet di Ethereum. Heimdall è basato su [Tendermint](https://tendermint.com/).

Il contratto di staking sulla Ethereum mainnet funziona in combinazione con il nodo Heimdall per fungere da meccanismo di gestione dello stake trustless per il motore PoS, inclusa la selezione del set di [validatori](/docs/maintain/glossary.md#validator), l'aggiornamento dei validatori, ecc. Poiché lo staking viene effettuato nel contratto sulla Ethereum mainnet, Polygon non si basa solo sull'onestà del validatore ed eredita invece la sicurezza della Ethereum mainnet.

Il layer Heimdall gestisce l'aggregazione dei blocchi prodotti da [Bor](/docs/maintain/glossary.md#bor) in un albero di Merkle, pubblicando periodicamente la Merkle root sulla Ethereum mainnet. Questa pubblicazione periodica si chiama *checkpoint*.

Dopo un certo numero di blocchi su Bor, un validatore (sul layer Heimdall):

1. Convalida tutti i blocchi a partire dall'ultimo checkpoint.
2. Crea un albero di Merkle degli hash del blocco.
3. Pubblica la Merkle root sulla Ethereum mainnet.

I checkpoint sono importanti per due motivi:

1. Rendono definitiva la root chain.
2. Forniscono la proof-of-burn nel prelievo degli asset.

Una panoramica del processo:

* Un sottoinsieme di validatori attivi del pool viene selezionato per agire come [produttori di blocchi](/docs/maintain/glossary.md#block-producer) per uno [span](/docs/maintain/glossary.md#span). Questi produttori di blocchi sono responsabili della creazione e trasmissione dei blocchi creati sulla rete.
* Un checkpoint include il Merkle root hash di tutti i blocchi creati durante un dato intervallo. Tutti i nodi convalidano il Merkle root hash e vi appongono la propria firma.
* Un [proponente](/docs/maintain/glossary.md#proposer) selezionato dall'insieme di validatori ha la responsabilità di raccogliere tutte le firme per un determinato checkpoint e inviarlo alla Ethereum mainnet.
* La responsabilità di creare blocchi e proporre checkpoint varia in base al rapporto di staking di un validatore nel pool globale.

Vedere anche [architettura Heimdall](/docs/pos/heimdall/overview).
