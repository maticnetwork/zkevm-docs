---
id: checkpoint-mechanism
title: Meccanismo del checkpoint
sidebar_label: Checkpoints
description: Checkpointing lo stato di sistema per la mainnet Ethereum
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygon non è una piattaforma Layer 1

Polygon dipende dalla Mainnet di Ethereum come suo Layer 1. Tutte le meccaniche di staking devono essere sincronizzate con i contratti sulla Ethereum mainnet.

:::

[I proponenti](/docs/maintain/glossary.md#proposer) di un checkpoint vengono inizialmente selezionati tramite [l'algoritmo di Tendermint round-robin ponderato](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html). Viene implementato un ulteriore controllo personalizzato in base al successo dell'invio del checkpoint. Ciò consente al sistema Polygon di disaccoppiarsi con la selezione del proponente di Tendermint e permette a Polygon di selezionare un proponente solo quando la transazione del checkpoint sulla Ethereum mainnet abbia esito positivo o inviare una transazione del checkpoint per i blocchi appartenenti ai precedenti checkpoint non riusciti.

Inviare correttamente un checkpoint su Tendermint è un processo di invio in 2 fasi:

* Un proponente, selezionato tramite l'algoritmo round-robin, invia un checkpoint con l'indirizzo del proponente e il Merkle hash nel campo del proponente.
* Tutti gli altri proponenti convalidano i dati nel campo del proponente prima di aggiungere il Merkle hash nel loro stato.

Il successivo proponente invia quindi una transazione di conferma per dimostrare che la precedente [transazione di checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) è andata a buon fine sulla Ethereum mainnet. Ogni modifica del set di validatori viene inoltrata dai nodi validatori su [Heimdall](/docs/maintain/glossary.md#heimdall) che è incorporata nel nodo validatore. Questo consente a Heimdall di rimanere sempre sincronizzato con lo stato del contratto Polygon sulla Ethereum mainnet.

Il contratto Polygon distribuito sulla Ethereum mainnet è considerato la fonte di verità definitiva, e quindi tutta la convalida viene eseguita tramite query sul contratto della Ethereum mainnet.
