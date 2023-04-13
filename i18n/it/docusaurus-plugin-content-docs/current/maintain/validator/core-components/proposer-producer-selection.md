---
id: proposers-producers-selection
title: Selezione dei proponenti e dei produttori
sidebar_label: Proposers & Producers
description: Selezione dei produttori proponente e blocco su Polygon
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

I produttori dei blocchi per il layer Bor sono un comitato selezionato a intervalli regolari dal pool di validatori sulla base del loro stake. Questi intervalli vengono decisi dalla governance del validatore alla luce della dinastia e della rete.

Il tasso di [stake](/docs/maintain/glossary.md#staking) specifica la probabilità di essere selezionato come membro del comitato dei [produttori del blocco](/docs/maintain/glossary.md#block-producer).

## Processo di selezione {#selection-process}

Supponiamo di avere 3 validatori in un pool - Alice, Bill e Clara:

* Alice ha uno stake di 100 token MATIC.
* Bill ha uno stake di 40 token MATIC.
* Clara ha uno stake di 40 token MATIC.

Ai validatori vengono fornite delle slot a seconda dello stake.

Poiché Alice ha uno stake di 100 token MATIC e il costo per slot è di 10 token MATIC, come definito dalla governance del validatore, Alice ottiene in totale 5 slot. Analogamente, Bill e Clara ricevono in totale 2 slot.

Ai validatori di Alice, Bill e Clara vengono fornite le seguenti slot:

* [A, A, A, A, A, B, B, C, C]

Quindi, Polygon ridistribuisce la disposizione delle slot di Alice, Bill e Clara utilizzando gli hash del blocco Ethereum come seed.

Il risultato della ridistribuzione è la seguente disposizione delle slot:

* [A, B, A, A, C, B, A, A, C]

Ora, a seconda del numero totale di produttori del blocco definito dalla governance del validatore, Polygon utilizzerà i validatori a partire dall'alto - ad esempio, per un insieme di 5 produttori, la disposizione delle slot è [A, B, A, A, A, C].

Il set del produttore per il prossimo span viene definito come [A: 3, B:1, C:1].

Utilizzando il set del validatore risultante e l'[algoritmo di Tendermint](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) per la selezione del proponente, Polygon selezionerà un produttore per ogni sprint su Bor.

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**Legenda:**

* Dinastia: tempo tra la fine dell'ultima asta e il momento d'inizio della successiva.
* Sprint: intervallo temporale per la selezione del comitato dei produttori del blocco.
* Span: numero di blocchi prodotti da un singolo produttore.
