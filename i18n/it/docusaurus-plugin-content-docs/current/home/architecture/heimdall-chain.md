---
id: heimdall-chain
title: Cos'è l'Heimdall Chain?
sidebar_label: Heimdall Chain
description: Costruisci la tua prossima app blockchain su Polygon.
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - checkpoint
  - pos
  - verifier
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Catena Heimdall {#heimdall-chain}

Heimdall è il livello verificatore della proof-of-stake di Polygon, responsabile della creazione di un checkpoint per la rappresentazione dei blocchi Plasma sulla catena principale della nostra architettura. Lo abbiamo implementato partendo dal motore di consenso Tendermint e modificando lo schema della firma e diverse strutture di dati.

Il contratto di Stake Manager funziona in combinazione con il nodo di Heimdall per fungere da meccanismo di gestione delle posizioni affidabili per il motore PoS, tra cui la selezione del set di validatore, l'aggiornamento dei validatori, ecc. Poiché il gioco è effettivamente fatto sullo smart contract di Ethereum, non ci basiamo solo sull'onestà del validatore e invece su questa parte chiave.

Il layer di Heimdall gestisce l'aggregazione dei blocchi prodotti da Bor in un albero di Merkle, pubblicando periodicamente la Merkle root sulla root chain. Questa pubblicazione periodica è chiamata **"checkpoint"**. Dopo un certo numero di blocchi su Bor, un validatore (sul layer Heimdall):

1. Convalida tutti i blocchi a partire dall'ultimo checkpoint
2. Crea un albero di Merkle degli hash dei blocchi
3. Pubblica la radice di Merkle sulla catena principale

I checkpoint sono importanti per due motivi:

1. Rendono definitiva la Catena root
2. Forniscono la proof-of-burn nel prelievo degli asset

Possiamo fornire la seguente panoramica del progetto:

- Viene selezionato un sottoinsieme di validatori attivi dalla pool per fungere da produttori di blocchi per un dato periodo di tempo. La selezione di ciascun periodo di tempo sarà concessa da almeno 2/3 in potenza. Questi produttori di blocco sono responsabili della creazione di blocchi e della trasmissione di loro alla rete rimanente.
- Un checkpoint include la radice di tutti i blocchi creati durante un dato intervallo. Tutti i nodi convalidano la stessa e collegano le loro firme.
- Un proponente selezionato del set di validatore è responsabile della raccolta di tutte le firme per un particolare checkpoint e di impegnarsi allo stesso modo sulla catena principale.
- La responsabilità di creare blocchi e proporre checkpoint varia in base alla rapporto di staking di un validatore nella pool globale.