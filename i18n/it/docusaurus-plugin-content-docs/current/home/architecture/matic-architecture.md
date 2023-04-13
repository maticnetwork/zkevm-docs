---
id: polygon-architecture
title: Architettura PoS di Polygon
description: Polygon PoS Architecture comprese le catene di Heimdall e Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Architettura PoS di Polygon {#polygon-pos-architecture}

La rete di Polygon è una piattaforma di applicazioni blockchain che fornice sidechain ibride con Proof-of-Stake abilitate per Plasma.

Architettonicamente, la bellezza di Polygon è il suo elegante design, che presenta uno strato di convalida generico separato da diversi ambienti di esecuzione come le sidechains di EVM full-blown e altri approcci di livello 2 come i rollup a conoscenza zero.

Per abilitare il meccanismo di PoS sulla nostra piattaforma, abbiamo implementato una serie di contratti di gestione dello **staking** su Ethereum, nonché un insieme di validatori incentivati che operano i nodi **Heimdall**e **Bor**. Ethereum, è la prima basechain che Polygon supporta, ma Polygon ha intenzione di offrire supporto per ulteriori basechain in base ai suggerimenti e al consendo della community, così da permettere la realizzazione di una piattaforma blockchain decentralizzata e interoperabile di Layer 2.

Il PoS di Polygon presenta una struttura a tre strati:

1. Smart contract per lo staking su Ethereum
2. Heimdal (il layer della Proof-of-Stake)
3. Bor (il layer produttore di blocchi)

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Gli smart contract di Polygon (su Ethereum) {#polygon-smart-contracts-on-ethereum}

Polygon mantiene un insieme di smart contract su Ethereum, i quali si occupano:

- Della gestione dello staking per il layer della Proof-of-Stake.
- Della gestione della delegazione, incluse le quote dei validatori
- Dei checkpoint/snapshot dello stato della sidechain

### Heimdall (layer validatore della Proof-of-Stake) {#heimdall-proof-of-stake-validator-layer}

**Heimdall** è il nodo validatore PoS che lavora in consonanza con i contratti di staking su Ethereum per permettere il meccanismo della PoS su Polygon. Lo abbiamo implementato partendo dal motore di consenso Tendermint e modificando lo schema della firma e diverse strutture di dati. È responsabile della validazione del blocco, della selezione del comitato produttore del blocco, dell'eseguire un checkpoint della rappresentazione dei blocchi della sidechain su Ethereum nella nostra architettura e di vari altri compiti.

Il layer di Heimdall gestisce l'aggregazione dei blocchi prodotti da Bor in un albero di Merkle, pubblicando periodicamente la Merkle root sulla root chain. Queste periodiche pubblicazioni sono chiamate `checkpoints`. Dopo un certo numero di blocchi su Bor, un validatore (sul layer Heimdall):

1. Convalida tutti i blocchi a partire dall'ultimo checkpoint
2. Crea un albero di Merkle degli hash dei blocchi
3. Pubblica la radice di Merkle sulla catena principale

I checkpoint sono importanti per due motivi:

1. Rendono definitiva la Catena root
2. Forniscono la proof-of-burn nel prelievo degli asset

Possiamo fornire la seguente panoramica del progetto:

- Viene selezionato un sottoinsieme di validatori attivi dalla pool per fungere da produttori di blocchi per un dato periodo di tempo. La selezione di ciascun periodo di tempo sarà concessa da almeno 2/3 in potenza. Questi produttori di blocco sono responsabili della creazione di blocchi e della trasmissione alla rete rimanente.
- Un checkpoint include la radice di tutti i blocchi creati durante un dato intervallo. Tutti i nodi convalidano lo stesso blocco e vi appongono la propria firma.
- Un proponente selezionato del set di validatore è responsabile della raccolta di tutte le firme per un particolare checkpoint e di impegnarsi allo stesso modo sulla catena principale.
- La responsabilità di creare blocchi e proporre checkpoint varia in base alla rapporto di staking di un validatore nella pool globale.

### Bor (layer produttore del blocco) {#bor-block-producer-layer}

Bor è il livello produttore del blocco di Poluygon - l'entità responsabile di aggregare le transazioni in blocchi.

I produttori di blocchi vengono ridistribuiti periodicamente tramite la selezione di un comitato su Heimdall per lassi di tempo denominati `span` in Polygon. I blocchi vengono prodotti presso il nodo **Bor** e la VM della sidechain è compatibile con la EVM. I blocchi prodotti su Bor sono inoltre convalidati periodicamente dai nodi Heimdall, e un checkpoint che consiste dell'hash dell'albero di Merkle di una serie di blocchi su Bor viene periodicamente rimesso a Ethereum.

### Risorse {#resources}

- [Architettura Bor](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Architettura Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [Meccanismo del checkpoint](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
