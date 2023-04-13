---
id: glossary
title: Glossario
description: Termini di Polygon
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Produttore del blocco {#block-producer}

Un produttore di blocchi è un [validatore](#validator) attivo selezionato per fungere da produttore di blocchi durante uno [span](#span).

Un produttore di blocchi è responsabile per la creazione e trasmissione dei blocchi creati sulla rete.

## Bor {#bor}

Un nodo Bor è un nodo che produce blocchi sulla rete di Polygon.

Bor è basato su [Go Ethereum](https://geth.ethereum.org/).

## Transazione del checkpoint {#checkpoint-transaction}

Una transazione del checkpoint è una transazione contenente la root di Merkle dei blocchi del layer [Bor](#bor) tra i periodi del checkpoint.

La transazione è vincolata ai contratti di staking di Polygon sulla Ethereum mainnet da un nodo [Heimdall](#heimdall).

Vedi anche:

* [Architettura Heimdall: checkpoint](/docs/pos/heimdall/checkpoint)
* [Meccanismo del checkpoint](/docs/maintain/validator/core-components/checkpoint-mechanism)

## Commissione {#commission}

Una commissione è la percentuale delle ricompense ricevute dai [validatori](#validator) dai [delegatori](#delegator) che abbiano uno stake presso i validatori.

Vedi anche [Commissioni operative del validatore](/docs/maintain/validate/validator-commission-operations).

## Delegatore {#delegator}

Il delegatore mette in staking i token MATIC presso i [validatori](#validator) esistenti, al fine di proteggere la rete di Polygon senza eseguire personalmente i nodi.

Vedi anche [Chi è il delegatore](/docs/maintain/polygon-basics/who-is-delegator).

## Nodo completo {#full-node}

Un nodo completo è un [nodo sentinella](#sentry) completamente sincronizzato che esegue sia [Heimdall](#heimdall) che [Bor](#bor).

Vedi anche [Implementazione del nodo completo](/docs/develop/network-details/full-node-deployment).

## Heimdall {#heimdall}

Un nodo Heimdall è un nodo che funziona parallelamente alla Ethereum mainnet, monitorando il set di contratti distribuiti sulla Ethereum mainnet e inviando i [checkpoint](#checkpoint-transaction) della rete di Polygon alla Ethereum mainnet.

Heimdall è basato su [Tendermint](https://tendermint.com/).

## Indirizzo del proprietario {#owner-address}

L'indirizzo del proprietario è un indirizzo usato per le operazioni di staking, restaking e per modificare l'indirizzo del firmatario, prelevare le ricompense e gestire i parametri relativi alla delegazione sulla Ethereum mainnet.

Mentre la [chiave del firmatario](#signer-address) viene mantenuta sul nodo ed è considerata un **hot** wallet, la chiave del proprietario deve essere mantenuta al sicuro e usata di rado e viene considerata un **cold** wallet.

Vedi anche [Gestione delle chiavi](validator/core-components/key-management.md).

## Proponente {#proposer}

Un proponente è il [validatore](#validator) selezionato dall'algoritmo per proporre un nuovo blocco.

Un proponente è inoltre responsabile della raccolta di tutte le firme per un dato [checkpoint](#checkpoint-transaction) e delle attività di invio del checkpoint alla Ethereum mainnet.

## Sentinella {#sentry}

Il nodo sentinella è un nodo che opera sia sul nodo [Heimdall](#heimdall) che sul nodo [Bor](#bor) scaricando i dati dagli altri nodi sulla rete e propagando i dati del [validatore](#validator) sulla rete.

Un nodo sentinella è accessibile da tutti gli altri nodi sentinella sulla rete.

## Span {#span}

Un set di blocchi definito logicamente per il quale un set di validatori viene scelto tra tutti i [validatori](#validator) disponibili.

La selezione di ogni span viene decisa da almeno 2/3 validatori scelti in base alla "potenza" di staking.

Vedi anche [Consenso di Bor: span](/docs/pos/bor/consensus.md#span).

## Staking {#staking}

Lo staking è il processo di deposito e vincolo dei token al fine di guadagnare il diritto di validare e produrre blocchi su una blockchain. Tipicamente si fa il token nativo per la rete: il token MATIC è bloccato da validatori/stakers nella rete Polygon. Altri esempi includono ETH in Ethereum (post-merge), ATOM in Cosmo, ecc.

Vedi anche [Cosa significa Proof of Stake](polygon-basics/what-is-proof-of-stake.md).

## Indirizzo del firmatario {#signer-address}

Un indirizzo del firmatario è l'indirizzo di un account Ethereum sul nodo validatore [Heimdall](#heimdall). L'indirizzo del firmatario firma e invia le [transazioni del checkpoint](#checkpoint-transaction).

Mentre la chiave del firmatario viene mantenuta sul nodo ed è considerata un **hot** wallet, la [chiave del proprietario](#owner-address) deve essere mantenuta al sicuro e usata di rado e viene considerata un **cold** wallet.

Vedi anche [Gestione delle chiavi](validator/core-components/key-management.md).

## Validatore {#validator}

I validatori mettono in gioco i [propri token MATIC](/docs/maintain/validate/validator-staking-operations) tramite contratti di punta, distribuiti sulla mainnet di Ethereum e eseguono sia il nodo di [Heimdall](#heimdall) che il nodo di [Bor](#bor) per impegnare i checkpoint di rete nella mainnet di Ethereum e per produrre blocchi sulla rete.

Un nodo validatore è accessibile solo dal proprio nodo [sentinella](#sentry) e non è accessibile dal resto della rete.

Vedi anche [Cos'è un validatore](polygon-basics/who-is-validator.md).
